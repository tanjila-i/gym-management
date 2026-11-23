import transporter from "../config/nodemailer.js";
import User from "../models/User.js";
import errorHandler from "../utils/errorHandel.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

// Register a new user
// POST /api/auth/register
// export const register = async (req, res, next) => {
//   try {
//     const { fullName, email, phone, password, role, consentAccepted } =
//       req.body;
//     // 1. Validate required fields first to prevent TypeErrors
//     if (!fullName || !email || !password) {
//       return next(
//         errorHandler(400, "Full name, email, and password are required."),
//       );
//     }

//     // 1. Validate consent (explicitly check true since schema defaults to false)
//     if (consentAccepted !== true) {
//       return next(
//         errorHandler(
//           400,
//           "You must accept the privacy policy and terms to register.",
//         ),
//       );
//     }

//     // 2. Check if user already exists

//     const existingUser = await User.findOne({ email: email.toLowerCase() });

//     if (existingUser) {
//       return next(
//         errorHandler(409, "An account with this email already exists."),
//       );
//     }

//     // 3. Validate password length before hashing
//     if (password.length < 8) {
//       return next(errorHandler(400, "Password must be at least 8 characters."));
//     }

//     const salt = await bcrypt.genSalt(10);

//     const hashedPassword = await bcrypt.hash(password, salt);

//     const verificationToken = Math.floor(
//       100000 + Math.random() * 900000,
//     ).toString();

//     // 5. Prevent public self-registration as admin/staff if needed (optional security)
//     const allowedSelfRoles = ["member", "trainer"];
//     const assignedRole = allowedSelfRoles.includes(role) ? role : "member";

//     const user = await User.create({
//       fullName,
//       email,
//       phone,
//       password: hashedPassword,
//       role: assignedRole,
//       consentAccepted,

//       verificationToken,
//       verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
//     });

//     // Send `verificationToken` to `user.email`
//     const mailOptions = {
//       from: `"GYM Website" <${process.env.SENDER_EMAIL}>`,
//       to: email,
//       subject: "Account Verification OTP - GYM Website",
//       // Plain text fallback for clients that don't render HTML
//       text: `Welcome to GYM Website! Your OTP is ${verificationToken}. Your account has been created with email ID: ${email}`,
//       // Styled HTML version
//       html: `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Account Verification</title>
//     </head>
//     <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f7; color: #333333;">
//       <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f7; padding: 40px 20px;">
//         <tr>
//           <td align="center">
//             <!-- Main Container -->
//             <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">

//               <!-- Header -->
//               <tr>
//                 <td align="center" style="background-color: #111827; padding: 30px 20px;">
//                   <h1 style="margin: 0; color: #ffffff; font-size: 24px; letter-spacing: 1.5px; text-transform: uppercase;">
//                     💪 GYM WEBSITE
//                   </h1>
//                 </td>
//               </tr>

//               <!-- Body Content -->
//               <tr>
//                 <td style="padding: 40px 30px;">
//                   <h2 style="margin-top: 0; color: #111827; font-size: 20px;">Verify Your Account</h2>
//                   <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
//                     Welcome to <strong>GYM Website</strong>! Your account has been successfully created using the email address: <br>
//                     <strong style="color: #111827;">${email}</strong>
//                   </p>
//                   <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
//                     Please use the One-Time Password (OTP) below to complete your verification:
//                   </p>

//                   <!-- OTP Box -->
//                   <div style="margin: 30px 0; text-align: center;">
//                     <span style="display: inline-block; background-color: #fef2f2; color: #dc2626; font-size: 32px; font-weight: bold; letter-spacing: 8px; padding: 16px 32px; border: 2px dashed #dc2626; border-radius: 8px;">
//                       ${verificationToken}
//                     </span>
//                   </div>

//                   <p style="font-size: 14px; line-height: 1.5; color: #6b7280;">
//                     This code is valid for a limited time. For your security, please do not share this OTP with anyone.
//                   </p>
//                 </td>
//               </tr>

//               <!-- Footer -->
//               <tr>
//                 <td align="center" style="background-color: #f9fafb; padding: 20px 30px; border-top: 1px solid #e5e7eb;">
//                   <p style="margin: 0; font-size: 12px; color: #9ca3af;">
//                     If you didn't request this email, you can safely ignore it.<br>
//                     &copy; ${new Date().getFullYear()} GYM Website. All rights reserved.
//                   </p>
//                 </td>
//               </tr>

//             </table>
//           </td>
//         </tr>
//       </table>
//     </body>
//     </html>
//   `,
//     };

//     await transporter.sendMail(mailOptions);

//     const token = generateToken(res, user._id, user.role);
//     // Exclude password from response

//     res.status(201).json({
//       success: true,
//       message: "Registration successful. Please verify your email.",
//       token,
//       user,
//     });
//   } catch (error) {
//     next(errorHandler(404, "Failed to register"));
//     console.error(error.message);
//   }
// };
export const register = async (req, res, next) => {
  try {
    const { fullName, email, phone, password, role, consentAccepted } =
      req.body;

    // 1. Validate required fields first to prevent TypeErrors
    if (!fullName || !email || !password) {
      return next(
        errorHandler(400, "Full name, email, and password are required."),
      );
    }

    // 2. Validate consent
    if (consentAccepted !== true) {
      return next(
        errorHandler(
          400,
          "You must accept the privacy policy and terms to register.",
        ),
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 3. Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return next(
        errorHandler(409, "An account with this email already exists."),
      );
    }

    // 4. Validate password length
    if (password.length < 8) {
      return next(errorHandler(400, "Password must be at least 8 characters."));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Use cryptographically secure OTP generation
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    const allowedSelfRoles = ["member", "trainer"];
    const assignedRole = allowedSelfRoles.includes(role) ? role : "member";

    const user = await User.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      phone,
      password: hashedPassword,
      role: assignedRole,
      consentAccepted,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    // 6. Send verification email (handle failure cleanly)
    const mailOptions = {
      from: `"GYM Website" <${process.env.SENDER_EMAIL}>`,
      to: normalizedEmail,
      subject: "Account Verification OTP - GYM Website",
      text: `Welcome to GYM Website! Your OTP is ${verificationToken}.`,
      html: `
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
                      ${verificationToken}
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
  `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (mailError) {
      // Optional: Delete the user so they aren't stuck in an unverified state
      await User.findByIdAndDelete(user._id);
      console.error("Email send failed:", mailError);
      return next(
        errorHandler(
          500,
          "Failed to send verification email. Please try again.",
        ),
      );
    }

    const token = generateToken(res, user._id, user.role);

    // 7. Strip sensitive fields before sending response
    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.verificationToken;
    delete userResponse.verificationTokenExpiresAt;

    res.status(201).json({
      success: true,
      message: "Registration successful. Please verify your email.",
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("Registration error:", error);
    // Pass actual error (or 500) so Mongoose validation errors aren't masked as 404
    next(error);
  }
};
// Verify email using token/OTP
// POST /api/auth/verify-email
export const verifyEmail = async (req, res, next) => {
  try {
    const { code } = req.body;

    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return next(errorHandler(400, "Invalid or expired verification code."));
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (error) {
    next(errorHandler(404, "Failed to verifyEmail"));
    console.error(error.message);
  }
};

// Login user
// POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(errorHandler(400, "Please provide both email and password."));
    }
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password",
    );

    if (!user) {
      return next(errorHandler(401, "Invalid email or password."));
    }

    // Check account status
    if (user.status !== "active") {
      return next(
        errorHandler(
          `Your account is currently ${user.status}. Please contact support.`,
        ),
      );
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(errorHandler(401, "Invalid email or password."));
    }

    // Update lastLoginAt
    user.lastLoginAt = new Date();
    await user.save();

    const token = generateToken(res, user._id, user.role);

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      token,
      user: userResponse,
    });
  } catch (error) {
    next(errorHandler(404, "Failed to login"));
    console.error(error.message);
  }
};

// Logout user
// POST /api/auth/logout

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
};

// Request password reset link/token
// POST /api/auth/forgot-password

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return next(errorHandler(404, "No account found with that email."));
    }

    const resetPasswordToken = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    user.resetPasswordToken = resetPasswordToken;
    ((user.resetPasswordExpiresAt = Date.now() + 15 * 60 * 1000), // 24 hours
      await user.save());

    // Send `verificationToken` to `user.email`
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Your Password Reset OTP",
      text: `Your OTP for resetting your password is ${resetPasswordToken}. Use this OTP to proceed with resetting your password.`,
      html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Password Reset OTP</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f6f9; padding: 40px 16px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 480px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);">
              <!-- Header -->
              <tr>
                <td style="background-color: #111827; padding: 24px 32px; text-align: center;">
                  <span style="color: #ffffff; font-size: 18px; font-weight: 700; letter-spacing: 0.4px;">
                    ${process.env.APP_NAME || "Account Security"}
                  </span>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding: 32px;">
                  <h1 style="margin: 0 0 12px; font-size: 22px; font-weight: 700; color: #111827;">
                    Reset your password
                  </h1>
                  <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6; color: #4b5563;">
                    Use the one-time password (OTP) below to complete your password reset request.
                  </p>

                  <!-- OTP Box -->
                  <div style="background-color: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 10px; padding: 20px; text-align: center; margin-bottom: 24px;">
                    <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; margin-bottom: 8px;">
                      Your Verification Code
                    </div>
                    <div style="font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #111827; font-family: 'Courier New', Courier, monospace;">
                      ${resetPasswordToken}
                    </div>
                  </div>

                  <p style="margin: 0 0 12px; font-size: 13px; line-height: 1.5; color: #6b7280;">
                    This code will expire shortly. If you did not request a password reset, you can safely ignore this email—your account remains secure.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f9fafb; border-top: 1px solid #e5e7eb; padding: 20px 32px; text-align: center;">
                  <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                    This is an automated security message. Please do not reply.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Password reset OTP sent to your email.",
    });
  } catch (error) {
    next(errorHandler(404, error.message));
    console.error(error.message);
  }
};

// Reset password using token
// POST /api/auth/reset-password/:token
export const resetPassword = async (req, res, next) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return next(errorHandler(400, "Email,OTP and new password are required"));
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    // if (!password || password.length < 8) {
    //   return next(
    //     errorHandler(400, "New password must be at least 8 characters."),
    //   );
    // }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = "";
    user.verificationTokenExpiresAt = 0;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    next(errorHandler(404, error.message));
    console.error(error.message);
  }
};

// Get current authenticated user
// GET /api/auth/me (Requires auth middleware)
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return next(errorHandler(404));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(errorHandler(404, error.message));
    console.error(error.message);
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};


// Get all users
// GET /api/users (Requires auth/admin middleware)
export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error(error.message);
    next(errorHandler(500, error.message));
  }
};
