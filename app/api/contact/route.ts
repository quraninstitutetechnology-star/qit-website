import { NextResponse } from "next/server";
import { whatsappLink } from "@/lib/whatsapp";
import { courses } from "@/lib/courses";

const REQUIRED = ["studentName", "age", "gender", "course", "country", "whatsapp", "preferredTimes", "teacherPreference"] as const;

/**
 * Trial/contact form endpoint (spec §1 #12, §8).
 * Validates the submission and returns a WhatsApp deep link with the details
 * prefilled, so the enquiry lands on QIT's WhatsApp. No email service in v1.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, errorCode: "INVALID_BODY", error: "Invalid request body." }, { status: 400 });
  }

  for (const field of REQUIRED) {
    const value = body[field];
    if (typeof value !== "string" || value.trim() === "") {
      return NextResponse.json({ ok: false, errorCode: "MISSING_FIELD", error: `Missing required field: ${field}` }, { status: 400 });
    }
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, errorCode: "INVALID_EMAIL", error: "Please enter a valid email address." }, { status: 400 });
  }

  const courseTitle =
    courses.find((c) => c.slug === body.course)?.title ?? String(body.course);

  const lines = [
    "Assalamu Alaikum! New Free Trial Class request from the QIT website:",
    `Student name: ${body.studentName}`,
    `Age: ${body.age}`,
    `Gender: ${body.gender}`,
    `Course: ${courseTitle}`,
    `Country / time zone: ${body.country}`,
    `WhatsApp: ${body.whatsapp}`,
    ...(email ? [`Email: ${email}`] : []),
    `Preferred days/times: ${body.preferredTimes}`,
    `Teacher preference: ${body.teacherPreference}`,
  ];

  return NextResponse.json({
    ok: true,
    message: "Thank you! Your details are ready — tap the WhatsApp button to send them to us and confirm your free trial class.",
    whatsappUrl: whatsappLink(lines.join("\n")),
  });
}
