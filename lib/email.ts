import nodemailer from 'nodemailer'

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

interface EmailOptions {
  to: string
  subject: string
  html: string
  locale?: 'en' | 'es'
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: `"QR-Chat Platform" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    })
    console.log('Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}

// Email templates
export function getNewChatEmailTemplate(
  locale: 'en' | 'es',
  ownerName: string,
  itemName: string,
  chatLink: string,
  message: string
): string {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  const fullChatLink = `${baseUrl}${chatLink}`

  if (locale === 'es') {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .button { display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>¡Nuevo Mensaje en tu QR!</h1>
          </div>
          <div class="content">
            <p>Hola ${ownerName},</p>
            <p>Alguien encontró tu objeto <strong>${itemName}</strong> y te ha enviado un mensaje:</p>
            <div style="background-color: white; padding: 15px; border-left: 4px solid #4F46E5; margin: 20px 0;">
              <p style="margin: 0;">"${message}"</p>
            </div>
            <p>Puedes responder haciendo clic en el siguiente enlace:</p>
            <a href="${fullChatLink}" class="button">Ver Chat y Responder</a>
            <p style="margin-top: 20px; font-size: 14px; color: #666;">
              <strong>Nota:</strong> Este chat expirará en 24 horas después de tu primera respuesta.
            </p>
          </div>
          <div class="footer">
            <p>QR-Chat Platform - Mensajería Efímera</p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  // English template
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .button { display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Message on Your QR!</h1>
        </div>
        <div class="content">
          <p>Hello ${ownerName},</p>
          <p>Someone found your item <strong>${itemName}</strong> and sent you a message:</p>
          <div style="background-color: white; padding: 15px; border-left: 4px solid #4F46E5; margin: 20px 0;">
            <p style="margin: 0;">"${message}"</p>
          </div>
          <p>You can reply by clicking the link below:</p>
          <a href="${fullChatLink}" class="button">View Chat & Reply</a>
          <p style="margin-top: 20px; font-size: 14px; color: #666;">
            <strong>Note:</strong> This chat will expire 24 hours after your first reply.
          </p>
        </div>
        <div class="footer">
          <p>QR-Chat Platform - Ephemeral Messaging</p>
        </div>
      </div>
    </body>
    </html>
  `
}

