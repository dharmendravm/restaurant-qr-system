const resetPasswordTemplate = ({ userName, resetLink, appName }) => {
  const supportEmail = `support@${(appName || "TableOrbit").toLowerCase()}.com`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Reset your password</title>

  <style>
    .preheader {
      display:none !important;
      visibility:hidden;
      opacity:0;
      color:transparent;
      height:0;
      width:0;
    }

    @media only screen and (max-width:600px) {
      .container { width:100% !important; }
      .content { padding:20px !important; }
      .cta { width:100% !important; }
    }

    * {
      -webkit-text-size-adjust:100%;
      -ms-text-size-adjust:100%;
    }
  </style>
</head>

<body style="margin:0; padding:0; background-color:#0b1220; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

  <div class="preheader">
    Password reset requested for your ${appName || 'TableOrbit'} account. This link expires in 15 minutes.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0b1220;">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <!-- Card -->
        <table role="presentation" class="container" width="520" cellpadding="0" cellspacing="0"
          style="max-width:520px; background-color:#020617; border-radius:14px; border:1px solid rgba(255,255,255,0.05); box-shadow:0 12px 32px rgba(2,6,23,0.7);">
          <tr>
            <td class="content" style="padding:28px;">

              <!-- Header -->
              <table role="presentation" width="100%">
                <tr>
                  <td style="padding-bottom:20px;">
                    <p style="margin:0; font-size:16px; font-weight:700; color:#e5e7eb;">
                      ${appName || 'TableOrbit'}
                    </p>
                  </td>
                </tr>

                <tr>
                  <td>
                    <h1 style="margin:0 0 10px 0; font-size:24px; font-weight:700; color:#f8fafc;">
                      Reset your password
                    </h1>

                    <p style="margin:0 0 18px 0; font-size:14px; line-height:1.6; color:#cbd5f5;">
                      Hello ${userName || "there"},
                      <br /><br />
                      We received a request to reset the password for your <strong>${appName || 'TableOrbit'}</strong> account.
                      Click the button below to set a new password.
                      This link will expire in <strong>15 minutes</strong>.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table role="presentation" width="100%" style="margin:24px 0;">
                <tr>
                  <td align="center">
                    <a href="${resetLink}" target="_blank" rel="noopener noreferrer"
                      class="cta"
                      style="
                        display:inline-block;
                        padding:14px 28px;
                        background-color:#6366f1;
                        color:#ffffff;
                        font-size:15px;
                        font-weight:600;
                        border-radius:10px;
                        text-decoration:none;
                      ">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Fallback link -->
              <table role="presentation" width="100%">
                <tr>
                  <td style="font-size:13px; color:#94a3b8; line-height:1.6;">
                    <p style="margin:0 0 6px 0;">
                      If the button doesn't work, copy and paste this link into your browser:
                    </p>
                    <p style="margin:0; word-break:break-all;">
                      <a href="${resetLink}" target="_blank" style="color:#93c5fd;">
                        ${resetLink}
                      </a>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Security notice -->
              <table role="presentation" width="100%" style="margin-top:18px;">
                <tr>
                  <td style="font-size:13px; color:#9ca3af; line-height:1.6;">
                    <p style="margin:0;">
                      If you did not request a password reset, no action is required.
                      Your account remains secure.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Footer -->
              <table role="presentation" width="100%" style="margin-top:24px; border-top:1px solid rgba(255,255,255,0.05);">
                <tr>
                  <td style="padding-top:16px; font-size:12px; color:#7c8db0;">
                    <p style="margin:0;">
                      Need help? Contact our support team at
                      <a href="mailto:${supportEmail}" style="color:#93c5fd; text-decoration:none;">
                        ${supportEmail}
                      </a>
                    </p>
                    <p style="margin:6px 0 0 0;">
                      — The ${appName || 'TableOrbit'} Team
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
};

export default resetPasswordTemplate;
