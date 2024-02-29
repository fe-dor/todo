import nodemailer from 'nodemailer';

// Создайте транспорт для отправки электронной почты через SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'parashchenko.fedor@gmail.com',
        pass: 'bgtq rako dznl ftcd' // Используйте пароль приложения, созданный в Google
    }
});

export default transporter