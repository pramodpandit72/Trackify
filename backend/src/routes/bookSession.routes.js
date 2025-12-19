import express from 'express';
import Trainer from '../models/trainer.model.js';
import { sendEmail } from '../utils/sendEmail.js';

const router = express.Router();

// POST /api/trainers/:id/book-session
router.post('/:id/book-session', async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    // You can extend this to include user info, session time, etc.
    const { userName, userEmail, sessionTime, note } = req.body;

    // Compose admin email
    const adminRecipient = process.env.ADMIN_EMAIL || process.env.EMAIL_FROM || process.env.EMAIL_USER;
    if (!adminRecipient) {
      console.error('BOOKING: No admin recipient configured. Set ADMIN_EMAIL or EMAIL_FROM/EMAIL_USER in env.');
      return res.status(500).json({ message: 'Server misconfigured: admin email not set' });
    }

    const subject = `New Booking Application: ${trainer.name}`;
    const plainText = `User ${userName} (${userEmail}) has applied for trainer ${trainer.name}.${sessionTime ? ' Requested time: ' + sessionTime + '.' : ''}${note ? ' Note: ' + note : ''}`;
    const htmlBody = `<p>User <strong>${userName}</strong> (<a href="mailto:${userEmail}">${userEmail}</a>) has applied for trainer <strong>${trainer.name}</strong>.</p>` +
      (sessionTime ? `<p>Requested time: <strong>${sessionTime}</strong></p>` : '') +
      (note ? `<p>Note from user: <em>${note}</em></p>` : '');

    try {
      const info = await sendEmail({
        to: adminRecipient,
        subject,
        text: plainText,
        html: htmlBody
      });
      console.log('BOOKING: email send result', { adminRecipient, info: info.messageId || info });
      return res.json({ message: 'Booking request sent to admin.' });
    } catch (err) {
      console.error('BOOKING: Failed to send booking email to admin', { err: err.message || err });
      return res.status(500).json({ message: 'Failed to send booking email' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send booking email.' });
  }
});

export default router;
