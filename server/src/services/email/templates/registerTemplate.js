const FRONTEND_URL = process.env.FRONTEND_URL;

const registerTemplate = ({
  userName,
  orderLink,
  year = new Date().getFullYear(),
}) => {
  const supportEmail = `support@${"TableOrbit"
    .replace(/\s+/g, "")
    .toLowerCase()}.com`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />

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
    Enjoy 30% off on your first order.
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
                  <td style="padding-bottom:16px;">
                    <p style="margin:0; font-size:16px; font-weight:700; color:#e5e7eb;">
                      TableOrbit
                    </p>
                  </td>
                </tr>

                <tr>
                  <td>
                    <h1 style="margin:0 0 10px 0; font-size:24px; font-weight:700; color:#f8fafc;">
                      Welcome, ${userName || "there"}
                    </h1>

                    <p style="margin:0 0 18px 0; font-size:14px; line-height:1.6; color:#cbd5f5;">
                      Thank you for joining <strong>TableOrbit</strong>.
                      We're excited to serve you delicious food, delivered fresh to your doorstep.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Offer -->
              <table role="presentation" width="100%" style="margin:22px 0;">
                <tr>
                  <td style="
                    background-color:#020617;
                    border:1px dashed rgba(99,102,241,0.6);
                    border-radius:12px;
                    padding:18px;
                    text-align:center;
                  ">
                    <p style="margin:0; font-size:13px; color:#a5b4fc; font-weight:600;">
                      WELCOME OFFER
                    </p>
                    <p style="margin:10px 0; font-size:22px; color:#f8fafc; font-weight:700;">
                      Use Code: FIRST30
                    </p>
                    <p style="margin:0; font-size:14px; color:#cbd5f5;">
                      Get <strong>30% OFF</strong> on your first order
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table role="presentation" width="100%" style="margin:26px 0;">
                <tr>
                  <td align="center">
                    <a href="${orderLink || FRONTEND_URL}" target="_blank" rel="noopener noreferrer"
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
                      Order Now
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Footer text -->
              <table role="presentation" width="100%">
                <tr>
                  <td style="font-size:13px; color:#9ca3af; line-height:1.6;">
                    <p style="margin:0;">
                      This offer is valid for a limited time and applicable on your first order only.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Support -->
              <table role="presentation" width="100%" style="margin-top:24px; border-top:1px solid rgba(255,255,255,0.05);">
                <tr>
                  <td style="padding-top:16px; font-size:12px; color:#7c8db0;">
                    <p style="margin:0;">
                      Need help? Contact us at
                      <a href="mailto:${supportEmail}" style="color:#93c5fd; text-decoration:none;">
                        ${supportEmail}
                      </a>
                    </p>
                    <p style="margin:6px 0 0 0;">
                      © ${year} TableOrbit. All rights reserved.
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

export default registerTemplate;
