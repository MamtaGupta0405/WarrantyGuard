import nodemailer from "nodemailer";
import dotevn from 'dotenv';
dotevn.config()
const transporter = nodemailer.createTransport({//transporter email bbhejne wala postman like email,password,konsa serve
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

//import transporter from "../Config/mail.js";

const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            text: text
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.log("Email not sent", error);
    }
};

export default sendEmail;