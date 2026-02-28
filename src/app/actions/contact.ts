"use server"

import nodemailer from "nodemailer"

export async function sendEmailAction(prevState: unknown, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string
  
  if (!name || !email || !message) {
    return { error: "All fields are required.", success: false }
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })
    
    // Send email to the configured receiving address, with replyTo set as the sender's email
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.FROM_EMAIL, 
      replyTo: email,
      subject: `New Freelance Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })
    
    return { success: true, error: "" }
  } catch (error) {
    console.error("Email send error:", error)
    return { success: false, error: "Failed to send message. Please try again." }
  }
}
