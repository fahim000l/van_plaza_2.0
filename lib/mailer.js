import nodemailer from "nodemailer";

export async function sendMail(sub, toMail, otpText) {
  try {
    var transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      secure: false,
      auth: {
        user: process.env.NEXT_PUBLIC_NODE_MAILER_USER,
        pass: process.env.NEXT_PUBLIC_NODE_MAILER_PASS,
      },
    });

    const mailOption = {
      from: process.env.NEXT_PUBLIC_NODE_MAILER_FROM,
      to: toMail,
      subject: sub,
      html: otpText,
    };

    const mailResponce = await transporter.sendMail(mailOption);

    console.log(mailResponce);

    return mailResponce;
  } catch (error) {
    console.log(error);
  }
}
