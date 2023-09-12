import { config } from "@/utils-backend";

export const resetPasswordEmailTemplate = (name: string, token: string) => {
  return `
  <div>
    <h3>Hello ${name},</h3>

    <p>
      We received a request to reset your password for your Todo List account. To proceed with
      resetting your password, please follow the instructions below:
    </p>

    <p>** Password Reset Instructions: **</p>

    <p>1. Click the following link to access the password reset page:</p>

    <a href="${config.url.webUrl}/reset-password/${token}">Click here to reset your email</a>

    <p>
      2. Once on the password reset page, enter your new password. Be sure to choose a strong and
      secure password.
    </p>

    <p>3. After you've set your new password, click the "Reset Password" button.</p>

    <p>If you did not initiate this password reset request, please disregard this email.</p>

    <p>Thank you for using Todo List!</p>

    <h4>
      Best regards,
      <br />
      The Todo List Team
    </h4>
  </div>
      `;
};
