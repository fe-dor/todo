import nodemailer from 'nodemailer';
const pass = Bun.env.GMAIL_PASS
const user = Bun.env.GMAIL_USER

// Создайте транспорт для отправки электронной почты через SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user,
        pass: pass // Используйте пароль приложения, созданный в Google
    }
});

export default transporter