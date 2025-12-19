import nodemailer from 'nodemailer';

export async function sendEmail({ to, subject, text, html }) {
  // Basic validation
  if (!to) {
    throw new Error('sendEmail: "to" address is required');
  }

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const service = process.env.EMAIL_SERVICE || 'gmail';

  if (!user || !pass) {
    throw new Error('Email credentials not configured. Set EMAIL_USER and EMAIL_PASS in environment');
  }

  const transporter = nodemailer.createTransport({
    service,
    auth: { user, pass }
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM || user,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}: ${info.messageId || JSON.stringify(info)}`);
    return info;
  } catch (err) {
    console.error('Failed to send email', { to, subject, err: err.message || err });
    throw err;
  }
}
