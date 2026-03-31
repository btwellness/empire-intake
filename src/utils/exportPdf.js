import { jsPDF } from "jspdf";

const GOLD = [183, 149, 80];
const DARK = [18, 18, 24];
const GRAY = [120, 120, 135];
const LIGHT_GRAY = [240, 240, 245];
const WHITE = [255, 255, 255];
const RED_FLAG = [180, 50, 50];

function addPageBackground(doc) {
  doc.setFillColor(...DARK);
  doc.rect(0, 0, 210, 297, "F");
}

function addHeader(doc, pageNum, totalPages) {
  // Gold top bar
  doc.setFillColor(...GOLD);
  doc.rect(0, 0, 210, 2, "F");

  // Dark header band
  doc.setFillColor(28, 28, 36);
  doc.rect(0, 2, 210, 28, "F");

  // Company name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...GOLD);
  doc.text("EMPIRE INVESTIGATION LLC", 15, 14);

  // Tagline
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...GRAY);
  doc.text("LICENSED PRIVATE INVESTIGATION SERVICES  |  CONFIDENTIAL", 15, 20);

  // CONFIDENTIAL stamp top right
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...RED_FLAG);
  doc.text("CONFIDENTIAL", 210 - 15, 12, { align: "right" });
  doc.setFontSize(6);
  doc.setTextColor(...GRAY);
  doc.text("PROTECTED — DO NOT DISTRIBUTE", 210 - 15, 18, { align: "right" });

  // Page number
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...GRAY);
  doc.text(`Page ${pageNum} of ${totalPages}`, 210 - 15, 26, { align: "right" });

  // Separator line
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.3);
  doc.line(15, 30, 195, 30);
}

function addFooter(doc) {
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.2);
  doc.line(15, 285, 195, 285);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6);
  doc.setTextColor(...GRAY);
  doc.text("Empire Investigation LLC  |  This document is strictly confidential and intended solely for authorized personnel.", 105, 290, { align: "center" });
  doc.text("Unauthorized disclosure, copying, or distribution is prohibited.", 105, 294, { align: "center" });
}

function sectionHeader(doc, title, y) {
  doc.setFillColor(30, 30, 40);
  doc.roundedRect(15, y - 5, 180, 10, 1, 1, "F");
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.5);
  doc.line(15, y - 5, 15, y + 5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...GOLD);
  doc.text(title.toUpperCase(), 20, y + 1);
  return y + 12;
}

function fieldRow(doc, label, value, y, fullWidth = false) {
  if (!value || value === "N/A" || value === "") return y;

  const labelW = fullWidth ? 60 : 55;
  const valueX = 15 + labelW + 2;
  const valueW = 210 - 15 - labelW - 2 - 15;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...GRAY);
  doc.text(label, 15, y);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...WHITE);

  const lines = doc.splitTextToSize(String(value), valueW);
  doc.text(lines, valueX, y);

  return y + (lines.length * 4.5) + 1;
}

function twoCol(doc, items, y) {
  // items: [{label, value}, ...]
  let col = 0;
  let rowY = y;
  items.forEach((item) => {
    if (!item.value || item.value === "") return;
    const x = col === 0 ? 15 : 110;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...GRAY);
    doc.text(item.label, x, rowY);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...WHITE);
    const lines = doc.splitTextToSize(String(item.value), 80);
    doc.text(lines, x, rowY + 4);

    if (col === 1 || items.indexOf(item) === items.length - 1) {
      rowY += Math.max(1, lines.length) * 4 + 7;
      col = 0;
    } else {
      col = 1;
    }
  });
  return rowY + 2;
}

export function exportSubmissionPDF(sub) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const createdDate = sub.created_date ? new Date(sub.created_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "Unknown";

  // --- PAGE 1 ---
  addPageBackground(doc);
  addHeader(doc, 1, 3);

  // Title block
  doc.setFillColor(22, 22, 30);
  doc.roundedRect(15, 35, 180, 22, 2, 2, "F");
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.3);
  doc.roundedRect(15, 35, 180, 22, 2, 2, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...GOLD);
  doc.text("CLIENT INTAKE REPORT", 105, 44, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...GRAY);
  doc.text(`Generated: ${date}  |  Submitted: ${createdDate}  |  Status: ${(sub.status || "").toUpperCase()}`, 105, 52, { align: "center" });

  // Urgency badge
  const urgencyColors = { emergency: [180, 50, 50], urgent: [200, 140, 40], standard: [60, 140, 80] };
  const urgencyColor = urgencyColors[sub.urgency] || urgencyColors.standard;
  doc.setFillColor(...urgencyColor);
  doc.roundedRect(15, 60, 40, 8, 1, 1, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...WHITE);
  doc.text((sub.urgency || "standard").toUpperCase(), 35, 65.5, { align: "center" });

  doc.setFillColor(40, 40, 55);
  doc.roundedRect(58, 60, 60, 8, 1, 1, "F");
  doc.setTextColor(...GOLD);
  doc.text((sub.case_type || "Unspecified").toUpperCase().replace(/_/g, " "), 88, 65.5, { align: "center" });

  let y = 76;

  // Section: Client Information
  y = sectionHeader(doc, "Client Information", y);
  y = twoCol(doc, [
    { label: "Full Name", value: sub.client_name },
    { label: "Phone", value: sub.client_phone },
    { label: "Email", value: sub.client_email },
    { label: "Relationship to Subject", value: sub.client_relationship },
    { label: "Preferred Contact", value: sub.preferred_contact },
    { label: "Safe Contact Times", value: sub.safe_contact_times },
    { label: "Address", value: [sub.client_address, sub.client_city, sub.client_state, sub.client_zip].filter(Boolean).join(", ") },
    { label: "", value: "" },
  ], y);

  y += 4;
  y = sectionHeader(doc, "Subject — Basic Information", y);
  y = twoCol(doc, [
    { label: "Full Name", value: sub.subject_name },
    { label: "Nicknames/Aliases", value: sub.subject_nicknames },
    { label: "Phone", value: sub.subject_phone },
    { label: "Date of Birth", value: sub.subject_dob },
    { label: "Age", value: sub.subject_age },
    { label: "Gender", value: sub.subject_gender },
    { label: "Height", value: sub.subject_height },
    { label: "Weight", value: sub.subject_weight },
    { label: "Hair Color", value: sub.subject_hair_color },
    { label: "Skin Tone", value: sub.subject_skin_tone },
    { label: "Facial Hair", value: sub.subject_facial_hair },
    { label: "Wears Glasses", value: sub.subject_glasses },
  ], y);

  if (sub.subject_identifying_features) {
    y = fieldRow(doc, "Identifying Features", sub.subject_identifying_features, y, true);
    y += 3;
  }

  y += 2;
  y = sectionHeader(doc, "Subject — Home Address", y);
  y = twoCol(doc, [
    { label: "Address", value: sub.subject_address },
    { label: "City / State / ZIP", value: [sub.subject_city, sub.subject_state, sub.subject_zip].filter(Boolean).join(", ") },
    { label: "Lights on Timer", value: sub.lights_on_timer },
    { label: "Dog on Premises", value: sub.dog_at_location === "yes" ? `Yes — ${sub.dog_details || ""}` : sub.dog_at_location },
    { label: "Other Residents", value: sub.other_residents },
    { label: "", value: "" },
  ], y);

  addFooter(doc);

  // --- PAGE 2 ---
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, 3);
  y = 38;

  y = sectionHeader(doc, "Subject — Vehicle", y);
  y = twoCol(doc, [
    { label: "Make & Model", value: sub.vehicle_make_model },
    { label: "Color", value: sub.vehicle_color },
    { label: "Year", value: sub.vehicle_year },
    { label: "License Plate", value: sub.vehicle_plate },
    { label: "Unique Identifiers", value: sub.vehicle_identifiers },
    { label: "Co-Owned", value: sub.vehicle_co_own },
  ], y);

  y += 4;
  y = sectionHeader(doc, "Employment & Lifestyle", y);
  y = twoCol(doc, [
    { label: "Employer", value: sub.work_name },
    { label: "Job Title", value: sub.work_job_title },
    { label: "Work Address", value: [sub.work_address, sub.work_city, sub.work_state].filter(Boolean).join(", ") },
    { label: "Work Phone", value: sub.work_phone },
    { label: "Work Days", value: sub.work_days },
    { label: "Work Hours", value: sub.work_hours },
    { label: "Parking", value: sub.subject_parking },
    { label: "Lunch Location", value: sub.subject_lunch },
    { label: "Hobbies", value: sub.subject_hobbies },
    { label: "Recreational Vehicles", value: sub.subject_rec_vehicles },
    { label: "Time Away from Home", value: sub.subject_time_away },
    { label: "", value: "" },
  ], y);

  if (sub.subject_weekend_routine) {
    y = fieldRow(doc, "Weekend Routine", sub.subject_weekend_routine, y, true);
    y += 3;
  }
  if (sub.subject_frequented_places) {
    y = fieldRow(doc, "Frequented Places", sub.subject_frequented_places, y, true);
    y += 3;
  }

  y += 4;
  y = sectionHeader(doc, "Relationships & Associates", y);
  if (sub.subject_friends?.length) {
    y = fieldRow(doc, "Friends / Colleagues", sub.subject_friends.join("; "), y, true);
    y += 2;
  }
  if (sub.subject_children?.length) {
    y = fieldRow(doc, "Children", sub.subject_children.join("; "), y, true);
    y += 2;
  }
  if (sub.opposite_sex_relatives) {
    y = fieldRow(doc, "Persons of Concern", sub.opposite_sex_relatives, y, true);
    y += 2;
  }

  y += 4;
  y = sectionHeader(doc, "Behavioral Indicators", y);
  const redFlags = [];
  if (sub.hiding_phone_bills === "yes") redFlags.push("Hiding phone/credit card bills");
  if (sub.staying_late_work === "yes") redFlags.push("Staying late at work");
  if (sub.secretive_devices === "yes") redFlags.push("Secretive with devices");
  if (sub.suspicious_behavior === "yes") redFlags.push("Suspicious behavior reported");

  if (redFlags.length) {
    doc.setFillColor(60, 20, 20);
    doc.roundedRect(15, y - 2, 180, redFlags.length * 5 + 6, 1, 1, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(220, 80, 80);
    doc.text("⚑ RED FLAGS IDENTIFIED:", 20, y + 3);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...WHITE);
    redFlags.forEach((flag) => {
      doc.text(`• ${flag}`, 22, y);
      y += 5;
    });
    y += 3;
  }

  if (sub.subject_seeing_someone) {
    y = fieldRow(doc, "Suspected Contacts", sub.subject_seeing_someone, y, true);
    y += 2;
  }
  if (sub.suspicious_times_where) {
    y = fieldRow(doc, "Suspicious Incidents", sub.suspicious_times_where, y, true);
    y += 2;
  }
  if (sub.prior_surveillance === "yes") {
    y = fieldRow(doc, "Prior Surveillance", `Yes — ${sub.prior_surveillance_when || ""}`, y, true);
    if (sub.prior_surveillance_results) {
      y = fieldRow(doc, "Prior Results", sub.prior_surveillance_results, y, true);
    }
    y += 2;
  }

  addFooter(doc);

  // --- PAGE 3 ---
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 3, 3);
  y = 38;

  y = sectionHeader(doc, "Social Events & Travel", y);
  y = twoCol(doc, [
    { label: "HS Reunion", value: sub.hs_reunion === "yes" ? `Yes — ${sub.hs_reunion_date || "TBD"}` : null },
    { label: "College Reunion", value: sub.college_reunion === "yes" ? `Yes — ${sub.college_reunion_date || "TBD"}` : null },
    { label: "Outings Frequency", value: sub.outings_frequency },
    { label: "Outing Details", value: sub.outings_details },
    { label: "", value: "" },
    { label: "", value: "" },
  ], y);
  if (sub.upcoming_events) {
    y = fieldRow(doc, "Upcoming Events", sub.upcoming_events, y, true);
    y += 2;
  }
  if (sub.travel_plans) {
    y = fieldRow(doc, "Travel Plans", sub.travel_plans, y, true);
    y += 2;
  }

  y += 6;
  y = sectionHeader(doc, "Investigation Goals", y);
  if (sub.info_to_find) {
    y = fieldRow(doc, "Information Sought", sub.info_to_find, y, true);
    y += 3;
  }
  if (sub.plan_for_info) {
    y = fieldRow(doc, "Intended Use of Info", sub.plan_for_info, y, true);
    y += 3;
  }
  if (sub.additional_notes) {
    y = fieldRow(doc, "Additional Notes", sub.additional_notes, y, true);
    y += 3;
  }

  // Evidence
  if (sub.evidence_files?.length) {
    y += 4;
    y = sectionHeader(doc, "Evidence & Attachments", y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...GRAY);
    doc.text(`${sub.evidence_files.length} file(s) uploaded and stored securely.`, 20, y);
    y += 8;
  }

  // Internal Summary box
  if (sub.internal_summary) {
    y += 4;
    y = sectionHeader(doc, "Internal Case Summary", y);
    doc.setFillColor(22, 22, 30);
    const summaryLines = doc.splitTextToSize(sub.internal_summary, 170);
    const boxH = summaryLines.length * 4.5 + 8;
    doc.roundedRect(15, y - 2, 180, boxH, 1, 1, "F");
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.2);
    doc.line(18, y - 2, 18, y - 2 + boxH);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(200, 200, 210);
    doc.text(summaryLines, 22, y + 4);
    y += boxH + 6;
  }

  // Signature / acknowledgment block
  y += 6;
  doc.setFillColor(28, 28, 36);
  doc.roundedRect(15, y, 180, 28, 2, 2, "F");
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.3);
  doc.roundedRect(15, y, 180, 28, 2, 2, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...GOLD);
  doc.text("CONFIDENTIALITY ACKNOWLEDGMENT", 105, y + 8, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(...GRAY);
  const ackText = "Client has acknowledged that all information provided is treated as strictly confidential and used solely for the purpose of the investigation. Empire Investigation LLC operates within all applicable laws and regulations.";
  const ackLines = doc.splitTextToSize(ackText, 165);
  doc.text(ackLines, 105, y + 14, { align: "center" });
  doc.setTextColor(100, 180, 100);
  doc.text(sub.consent_acknowledged ? "✓ Acknowledged" : "Not acknowledged", 105, y + 24, { align: "center" });

  addFooter(doc);

  const clientSlug = (sub.client_name || "unknown").replace(/\s+/g, "_").toLowerCase();
  const dateSlug = new Date().toISOString().split("T")[0];
  doc.save(`EmpireInvestigation_${clientSlug}_${dateSlug}.pdf`);
}