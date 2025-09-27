import nodemailer from "nodemailer";
import pool from "../db.js";

const sendEmail = async (to, subject, html) => {

    try {
    const [rows] = await pool.query("SELECT email FROM tb_user WHERE id = 1");
    const adminEmail = rows[0]?.email || "example@gmail.com";

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: adminEmail,
            pass: process.env.EMAIL_PASS, 
        },
    });

    await transporter.sendMail({
        from: `"Admin Order" <${adminEmail}>`,
        to,
        subject,
        html,
    });

    console.log("✅ Email terkirim ke:", to);
  } catch (err) {
    console.error("❌ Gagal kirim email:", err.message);
  }
};

export default sendEmail;