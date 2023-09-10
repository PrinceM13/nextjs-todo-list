export const verificationEmailTemplate = (name: string, token: string) => {
  return `
    <div>
    <h3>Hello ${name},</h3>

    <p>
      Thank you for registering with Todo List! We're excited to have you on board. Before you can
      start enjoying all the benefits our platform offers, we need to verify your email address.
      Verification is easy! Simply click the link below to confirm your email:
    </p>

    <a href="http://localhost:3000/verify-email?token=${token}">Click here verify your email</a>

    <p>If you did not register for an account on Todo List, please disregard this email.</p>

    <p>
      If you encounter any issues during the verification process, don't hesitate to contact our
      support team at ${"princem13.test@gmail.com"}.
    </p>

    <p>
      Thank you for choosing Todo List. We can't wait to have you as an active member of our
      community!
    </p>

    <h4>
      Best regards,
      <br />
      The Todo List Team
    </h4>
  </div>
      `;
};
