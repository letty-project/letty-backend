import {
  createTransport,
} from "nodemailer";

const transport = createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "465", 10),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendWriterEmail = async () => {
  return await transport.sendMail({
    text: 'i hope this works',
    from: 'letty <project@letty.day>',
    to: 'letty <project@letty.day>',
    subject: 'testing emailjs',
  });
};
