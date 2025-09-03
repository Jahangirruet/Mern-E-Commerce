import ndoemailer from "nodemailer";

export const EmailSend = async (EmailTo, EmailText, EmailSubject) => {
  let transporter = ndoemailer.createTransport({
    host: "mail.teamrabbil.com",
    port: 25,
    secure: false,
    auth: {
      user: "info@teamrabbil.com",
      pass: "~sR4[bhaCQs",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let mailOptions = {
    from: "MERNEcommerce <info@teamrabbil.com>",
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };
  try {
    let info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    return error;
  }
};
