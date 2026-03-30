import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, FileText, Image, File } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { cn } from "@/lib/utils";

export default function FileUpload({
  label,
  files = [],
  onChange,
  helper,
  maxFiles = 10,
  accept = "*/*",
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;

    if (files.length + selectedFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const uploadedUrls = [];
      for (const file of selectedFiles) {
        const result = await base44.integrations.Core.UploadFile({ file });
        uploadedUrls.push({
          url: result.file_url,
          name: file.name,
          type: file.type,
        });
      }
      onChange([...files, ...uploadedUrls]);
    } catch (err) {
      setError("Failed to upload file. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleRemove = (index) => {
    onChange(files.filter((_, i) => i !== index));
  };

  const getFileIcon = (type) => {
    if (type?.startsWith("image/")) return Image;
    if (type?.includes("pdf")) return FileText;
    return File;
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}

      {/* Upload Area */}
      <div
        className={cn(
          "border-2 border-dashed border-border rounded-xl p-6 text-center transition-colors cursor-pointer hover:border-primary/50 hover:bg-secondary/30",
          uploading && "pointer-events-none opacity-50"
        )}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />
        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
        <p className="text-sm text-foreground font-medium">
          {uploading ? "Uploading..." : "Click or drag files to upload"}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Supports images, PDFs, and documents
        </p>
      </div>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => {
            const Icon = getFileIcon(file.type);
            return (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-secondary/50 border border-border rounded-lg group"
              >
                <Icon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <span className="flex-1 text-sm text-foreground truncate">
                  {file.name}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-50 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(index);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {helper && !error && (
        <p className="text-xs text-muted-foreground">{helper}</p>
      )}

      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}