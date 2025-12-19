import express from 'express';
import { sendEmail } from '../utils/sendEmail.js';

const router = express.Router();

// GET /debug/send-test-email
router.get('/send-test-email', async (req, res) => {
  const adminRecipient = process.env.ADMIN_EMAIL || process.env.EMAIL_FROM || process.env.EMAIL_USER;
  if (!adminRecipient) {
    console.error('DEBUG: No admin recipient configured.');
    return res.status(500).json({ ok: false, message: 'Admin email not configured on server' });
  }

  try {
    const info = await sendEmail({
      to: adminRecipient,
      subject: 'Trackify Test Email',
      text: 'This is a test email from Trackify to verify SMTP configuration.',
      html: '<p>This is a <strong>test email</strong> from Trackify to verify SMTP configuration.</p>'
    });
    return res.json({ ok: true, message: 'Test email sent', info: info.messageId || info });
  } catch (err) {
    console.error('DEBUG: send-test-email failed', err.message || err);
    return res.status(500).json({ ok: false, message: 'Failed to send test email', error: err.message || err });
  }
});

export default router;
