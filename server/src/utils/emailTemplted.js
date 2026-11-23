export const VERIFICATION_EMAIL_TEMPLATE = (email, verificationCode) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Account Verification</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f7; color: #333333;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f7; padding: 40px 20px;">
        <tr>
          <td align="center">
            <!-- Main Container -->
            <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
              
              <!-- Header -->
              <tr>
                <td align="center" style="background-color: #111827; padding: 30px 20px;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 24px; letter-spacing: 1.5px; text-transform: uppercase;">
                    💪 GYM WEBSITE
                  </h1>
                </td>
              </tr>

              <!-- Body Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="margin-top: 0; color: #111827; font-size: 20px;">Verify Your Account</h2>
                  <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
                    Welcome to <strong>GYM Website</strong>! Your account has been successfully created using the email address: <br>
                    <strong style="color: #111827;">${email}</strong>
                  </p>
                  <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
                    Please use the One-Time Password (OTP) below to complete your verification:
                  </p>

                  <!-- OTP Box -->
                  <div style="margin: 30px 0; text-align: center;">
                    <span style="display: inline-block; background-color: #fef2f2; color: #dc2626; font-size: 32px; font-weight: bold; letter-spacing: 8px; padding: 16px 32px; border: 2px dashed #dc2626; border-radius: 8px;">
                      ${verificationCode}
                    </span>
                  </div>

                  <p style="font-size: 14px; line-height: 1.5; color: #6b7280;">
                    This code is valid for a limited time. For your security, please do not share this OTP with anyone.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td align="center" style="background-color: #f9fafb; padding: 20px 30px; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                    If you didn't request this email, you can safely ignore it.<br>
                    &copy; ${new Date().getFullYear()} GYM Website. All rights reserved.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
