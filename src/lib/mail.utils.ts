import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.NODE_ENV === 'production',
    auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
    },

} as SMTPTransport.Options);

type sendEmailDto = {
    sender: Mail.Address,
    receipients: Mail.Address[],
    subject: string,
    message: string,
}

export const sendEmail = async ({sender,receipients,subject,message}: sendEmailDto) => {
    return await transporter.sendMail({
        from: sender,
        to: receipients,
        subject: subject,
        text: message,
        html: message,
    })
}
