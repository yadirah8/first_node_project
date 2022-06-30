import nodemailer from "nodemailer";
import logger from "@/utils/logger";

async function createTestCred() {
  const cred = await nodemailer.createTestAccount();
  console.log({ cred });
}

// createTestCred().then((r) => {});
const { SMTP_USER, SMTP_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: { user: `${SMTP_USER}`, pass: `${SMTP_PASS}` },
});

async function sendEmail(name: string, email: string) {
  const mailOptions = {
    from: "test@example.com",
    to: email,
    subject: "Just wanted to test",
    text: `Hello ${name}!`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      logger.error("Error sending email");
      return;
    }

    logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  });
}

export default sendEmail;
