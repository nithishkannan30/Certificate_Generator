const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/send-certificate", upload.single("certificate"), async (req, res) => {
  const email = req.body.email;
  const fileBuffer = req.file.buffer;
  const filename = req.file.originalname;

  try {
    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use another provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Certificate",
      text: "Please find your certificate attached.",
      attachments: [
        {
          filename,
          content: fileBuffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email.");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));