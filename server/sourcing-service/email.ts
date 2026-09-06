import {ProductSourcingEvaluation, FinalDecision} from './types';

const ADMIN_EMAIL = 'alvinibedi@gmail.com';

export async function sendHumanReviewEmail(
  evaluation: ProductSourcingEvaluation,
  decision: FinalDecision,
): Promise<void> {
  try {
    const emailContent = generateHumanReviewEmailContent(evaluation, decision);

    // Send email using a simple fetch to a mail service
    // For production, use nodemailer or SendGrid
    await fetch('http://localhost:8080/email/send', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        to: ADMIN_EMAIL,
        subject: `[HUMAN REVIEW REQUIRED] Order ${evaluation.request.customerOrderId}`,
        html: emailContent,
      }),
    }).catch(err => {
      console.error('Email send failed (non-blocking):', err.message);
      // Don't throw — email failure shouldn't block order processing
    });
  } catch (error) {
    console.error('Error sending human review email:', error);
  }
}

function generateHumanReviewEmailContent(
  evaluation: ProductSourcingEvaluation,
  decision: FinalDecision,
): string {
  const issues = decision.notes || [];
  const productName = evaluation.identity.result?.productName || evaluation.request.productQuery || 'Unknown Product';
  const risk = calculateOverallRisk(evaluation);

  return `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2 style="color: #c026d3; border-bottom: 3px solid #c026d3; padding-bottom: 10px;">
          🟡 Human Review Required
        </h2>
        
        <div style="background: #f9f5ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <p><strong>Order ID:</strong> <code>${evaluation.request.customerOrderId}</code></p>
          <p><strong>Product Name:</strong> <code>${productName}</code></p>
          <p><strong>Quantity Requested:</strong> ${evaluation.request.quantity} unit(s)</p>
          <p><strong>Overall Risk Level:</strong> <span style="color: ${getRiskColor(risk)}; font-weight: bold;">${risk.level.toUpperCase()}</span></p>
          <p><strong>Risk Score:</strong> ${risk.score}/100</p>
        </div>
        
        <h3 style="color: #c026d3;">Why Human Review is Needed:</h3>
        <p><strong>Reason:</strong> ${decision.reason}</p>
        
        <h3 style="color: #c026d3;">Issues & Risks Found:</h3>
        <ul style="background: #fff3cd; padding: 15px 30px; border-radius: 4px;">
          ${issues.map(issue => `<li style="margin-bottom: 8px;">${issue}</li>`).join('')}
        </ul>
        
        <h3 style="color: #c026d3;">Risk Breakdown:</h3>
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
          <tr style="background: #f0f0f0;">
            <th style="text-align: left; padding: 10px; border: 1px solid #ddd;">Risk Factor</th>
            <th style="text-align: center; padding: 10px; border: 1px solid #ddd;">Score</th>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Counterfeiting Risk</td>
            <td style="text-align: center; padding: 10px; border: 1px solid #ddd;">${evaluation.risk.result.counterfeitRisk}/10</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Authenticity Confidence</td>
            <td style="text-align: center; padding: 10px; border: 1px solid #ddd;">${evaluation.authenticity.result.authenticityConfidence}%</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Seller Risk</td>
            <td style="text-align: center; padding: 10px; border: 1px solid #ddd;">${evaluation.risk.result.supplierRisk}/10</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Compatibility Risk</td>
            <td style="text-align: center; padding: 10px; border: 1px solid #ddd;">${evaluation.risk.result.compatibilityRisk}/10</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Legal/Compliance Risk</td>
            <td style="text-align: center; padding: 10px; border: 1px solid #ddd;">${evaluation.risk.result.legalRisk}/10</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Product Quality Risk</td>
            <td style="text-align: center; padding: 10px; border: 1px solid #ddd;">${evaluation.risk.result.productQualityRisk}/10</td>
          </tr>
        </table>
        
        <h3 style="color: #c026d3;">Product Verification Summary:</h3>
        <ul>
          <li><strong>Product Identity:</strong> ${JSON.stringify(evaluation.identity.result, null, 2).substring(0, 100)}...</li>
          <li><strong>Profit Status:</strong> ${evaluation.profit.result.profitStatus}</li>
          <li><strong>Expected Profit:</strong> £${evaluation.profit.result.expectedProfit || 'Unknown'}</li>
          <li><strong>Seller Verification:</strong> ${evaluation.seller.result.trustScore}/100</li>
          <li><strong>Warranty Status:</strong> ${evaluation.warranty.result.warrantyAvailable ? 'Available' : 'Not Available'}</li>
        </ul>
        
        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #2196F3;">
          <p style="margin: 0;"><strong>Recommended Action:</strong></p>
          <p style="margin: 5px 0;">Please review the issues above and confirm whether this order should proceed. Consider:</p>
          <ul style="margin: 5px 0;">
            <li>Is the product correctly identified?</li>
            <li>Is the seller trustworthy?</li>
            <li>Is the profit margin acceptable given the risks?</li>
            <li>Have all critical conflicts been resolved?</li>
          </ul>
        </div>
        
        <p style="margin-top: 25px; color: #666; font-size: 12px; border-top: 1px solid #ddd; padding-top: 15px;">
          This is an automated alert from the <strong>Alvis Store AI Sourcing System</strong>.<br/>
          Customer: ${evaluation.request.customerOrderId}<br/>
          Timestamp: ${new Date().toISOString()}<br/>
          <em>Do not reply to this email — approve or reject through your admin dashboard.</em>
        </p>
      </body>
    </html>
  `;
}

function calculateOverallRisk(evaluation: ProductSourcingEvaluation): {level: string; score: number} {
  const risk = evaluation.risk.result;
  const avgRisk = (
    (risk.counterfeitRisk || 0) +
    (risk.supplierRisk || 0) +
    (risk.compatibilityRisk || 0) +
    (risk.legalRisk || 0) +
    (risk.productQualityRisk || 0)
  ) / 5;

  const authRisk = 100 - (evaluation.authenticity.result.authenticityConfidence || 0);
  const totalScore = (avgRisk * 0.6 + authRisk * 0.4);

  let level = 'low';
  if (totalScore > 70) level = 'high';
  else if (totalScore > 40) level = 'medium';

  return {level, score: Math.round(totalScore)};
}

function getRiskColor(risk: {level: string; score: number}): string {
  if (risk.level === 'high') return '#d32f2f';
  if (risk.level === 'medium') return '#f57c00';
  return '#388e3c';
}
