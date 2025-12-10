import nodemailer from "nodemailer";
import ContactMessage from "../models/contact.model.js";

// Create reusable transporter using Gmail
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS // Use App Password for Gmail
    }
  });
};

/**
 * POST /api/contact
 * Send a contact form message via email and save to database
 */
export const sendContactMessage = async (req, res, next) => {
  try {
    const { name, subject, message } = req.body;

    // Validation
    if (!name || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (name, subject, message)"
      });
    }

    // Always save to database first
    const contactMessage = await ContactMessage.create({
      name,
      subject,
      message,
      emailSent: false
    });

    console.log(`📝 Contact message saved to database from ${name}`);

    let emailSent = false;

    // Try to send email if credentials are configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_PASS !== 'your_gmail_app_password_here') {
      try {
        const transporter = createTransporter();

        // Email to admin
        const adminMailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.CONTACT_EMAIL || "pramod2pandit@gmail.com",
          subject: `[Trackify Contact] ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #775fab 0%, #32284a 100%); padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">New Contact Message</h1>
              </div>
              <div style="background: #f8f9fa; padding: 30px;">
                <h2 style="color: #32284a; margin-top: 0;">Message Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #ddd; font-weight: bold; width: 100px;">Name:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #ddd;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #ddd; font-weight: bold;">Subject:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #ddd;">${subject}</td>
                  </tr>
                </table>
                <div style="margin-top: 20px;">
                  <h3 style="color: #32284a;">Message:</h3>
                  <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #775fab;">
                    ${message.replace(/\n/g, '<br>')}
                  </div>
                </div>
              </div>
              <div style="background: #32284a; padding: 15px; text-align: center;">
                <p style="color: #999; margin: 0; font-size: 12px;">
                  This message was sent from the Trackify contact form
                </p>
              </div>
            </div>
          `
        };

        // Send admin email
        await transporter.sendMail(adminMailOptions);
        console.log(`✉️ Contact email sent to admin from ${name}`);

        // Update database record
        contactMessage.emailSent = true;
        await contactMessage.save();

        emailSent = true;
      } catch (emailErr) {
        console.error("Email sending failed:", emailErr.message);
        // Continue - message is already saved to database
      }
    } else {
      console.log("📧 Email credentials not configured - message saved to database only");
    }

    res.status(200).json({
      success: true,
      message: emailSent 
        ? "Your message has been sent successfully! We'll get back to you soon."
        : "Your message has been received! We'll get back to you within 24-48 hours.",
      emailSent
    });

  } catch (err) {
    console.error("Contact form error:", err);
    next(err);
  }
};

/**
 * GET /api/contact/messages
 * Get all contact messages (admin only)
 */
export const getContactMessages = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    
    const filter = {};
    if (status) filter.status = status;

    const [messages, total] = await Promise.all([
      ContactMessage.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      ContactMessage.countDocuments(filter)
    ]);

    res.json({
      success: true,
      messages,
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/contact/messages/:id
 * Update message status (admin only)
 */
export const updateMessageStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be: pending, read, or replied"
      });
    }

    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found"
      });
    }

    res.json({
      success: true,
      message: "Status updated",
      data: message
    });
  } catch (err) {
    next(err);
  }
};
