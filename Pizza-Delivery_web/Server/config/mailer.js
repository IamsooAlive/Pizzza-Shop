const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const sendPasswordResetEmail = async (toEmail, resetToken) => {
    const resetUrl = `${process.env.CLIENT_URL}/forgot_password?token=${resetToken}`;
    await resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: toEmail,
        subject: "Reset your PizzaLand password",
        html: `
            <div style="font-family:sans-serif;max-width:480px;margin:auto">
                <h2>Reset your password</h2>
                <p>Click the button below to reset your PizzaLand password. This link expires in <strong>15 minutes</strong>.</p>
                <a href="${resetUrl}" style="display:inline-block;padding:.75rem 1.5rem;background:#D2411E;color:#fff;text-decoration:none;border-radius:.4rem;font-weight:600">
                    Reset Password
                </a>
                <p style="margin-top:1.5rem;font-size:.85rem;color:#666">If you didn't request this, you can safely ignore this email.</p>
            </div>
        `,
    });
};

module.exports = { sendPasswordResetEmail };
