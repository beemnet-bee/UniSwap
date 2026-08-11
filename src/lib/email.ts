import nodemailer from 'nodemailer'

/**
 * Send an email from the UniSWAP team Gmail account.
 * Requires SMTP env vars in .env:
 *   SMTP_HOST=smtp.gmail.com
 *   SMTP_PORT=587
 *   SMTP_USER=uniswap.app.team@gmail.com
 *   SMTP_PASSWORD= (Gmail App Password, 16 chars)
 */
function getTransporter() {
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASSWORD

  if (!host || !port || !user || !pass) {
    console.warn('[email] SMTP env vars not set. Email sending is disabled.')
    return null
  }

  return nodemailer.createTransport({
    host,
    port: parseInt(port, 10),
    secure: parseInt(port, 10) === 465,
    auth: { user, pass },
  })
}

export async function sendReplyEmail({
  to,
  name,
  replyText,
  adminUsername,
}: {
  to: string
  name: string
  replyText: string
  adminUsername: string
}): Promise<{ sent: boolean; error?: string }> {
  const transporter = getTransporter()
  if (!transporter) {
    return { sent: false, error: 'SMTP not configured' }
  }

  const fromEmail = process.env.SMTP_USER || 'uniswap.app.team@gmail.com'

  try {
    await transporter.sendMail({
      from: `"UniSWAP Team" <${fromEmail}>`,
      to,
      subject: 'Re: Your UniSWAP inquiry',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #2B8FB9; margin: 0;">UniSWAP</h1>
            <p style="color: #666; margin: 4px 0 0;">Keep your goods in the loop</p>
          </div>
          <div style="background: #f8f9fa; border-radius: 12px; padding: 24px; margin-bottom: 16px;">
            <p style="margin: 0 0 12px; color: #333;">Hi ${name},</p>
            <p style="margin: 0 0 12px; color: #333; white-space: pre-wrap;">${replyText}</p>
          </div>
          <div style="border-top: 1px solid #eee; padding-top: 16px; margin-top: 24px;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              This reply was sent by ${adminUsername} from the UniSWAP team.
              If you have further questions, just reply to this email.
            </p>
          </div>
        </div>
      `,
      text: `Hi ${name},\n\n${replyText}\n\nThis reply was sent by ${adminUsername} from the UniSWAP team.\nIf you have further questions, just reply to this email.`,
    })
    return { sent: true }
  } catch (err) {
    console.error('[email] sendMail error:', err)
    return {
      sent: false,
      error: err instanceof Error ? err.message : 'Unknown email error',
    }
  }
}
