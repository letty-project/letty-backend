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

const sendResetPasswordEmail = async (email: string, nickname: string, password: string) => {
  return await transport.sendMail({
    from: 'letty <project@letty.day>',
    to: `${nickname} <${email}>`,
    subject: '[중요] 비밀번호가 초기화 되었습니다',
    text: `사용자의 비밀번호가 아래와 같이 초기화 되었습니다. ${password}`,
  });
};

export const EmailService = {
  sendResetPasswordEmail,
};
