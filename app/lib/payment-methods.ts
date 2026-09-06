export const PAYMENT_GROUPS = [
  {id: 'cards', label: 'Credit & Debit Cards', icon: '💳', formType: 'card', methods: ['Visa', 'Mastercard', 'UnionPay', 'American Express', 'Discover', 'JCB', 'Cartes Bancaires', 'RuPay', 'Elo', 'Dankort', 'Girocard', 'Interac', 'Plus', 'Cirrus', 'Accel', 'Shazam', 'PULSE', 'STAR', 'Jeanie', 'Interlink', 'Bancontact', 'Bancomat', 'Multibanco']},
  {id: 'wallets', label: 'Digital Wallets & Neobanks', icon: '📱', formType: 'wallet', methods: ['Apple Pay', 'Google Pay', 'Samsung Pay', 'PayPal', 'Venmo', 'Amazon Pay', 'WeChat Pay', 'Alipay', 'Mercado Pago', 'GrabPay', 'GoPay', 'Paytm', 'PhonePe', 'GCash', 'DANA', 'OVO', "Touch 'n Go eWallet", 'PayNow', 'M-Pesa', 'Cash App', 'Revolut', 'Wise', 'N26', 'Monzo', 'Bunq', 'Curve', 'Zelle']},
  {id: 'processors', label: 'Payment Processors & Gateways', icon: '🔐', formType: 'processor', methods: ['Braintree', 'Stripe', 'Adyen', 'Square', 'Worldpay', 'FIS', 'Global Payments', 'Authorize.Net', 'PayU', 'Dodo Payments', 'Paddle', 'Lemon Squeezy', 'Checkout.com', '2Checkout', 'Airtm', 'SafetyPay']},
  {id: 'bank', label: 'Bank Transfers & Instant Payments', icon: '🏦', formType: 'bank', methods: ['ACH', 'Bacs', 'CHAPS', 'Wire Transfer', 'SWIFT', 'SPFS', 'CIPS', 'Fedwire', 'CHIPS', 'UPI', 'PIX', 'iDEAL', 'SEPA', 'SEPA Instant', 'BLIK', 'Swish', 'Vipps', 'MobilePay', 'Eps', 'Giropay', 'Przelewy24', 'Trustly', 'Sofort', 'FPX', 'PromptPay', 'DuitNow', 'PayID', 'NPP', 'Faster Payments', 'Open Banking', 'Boleto', 'Spei', 'RTP', 'FedNow', 'Interac e-Transfer', 'Transferencia 3.0', 'QR BCB', 'Transfer365', 'ACH Pronto', 'Immediate Interbank Transfers', 'ACH Transferencias Inmediatas', 'RFT', 'Bakong', 'RTGS', 'IBPS', 'CNAPS2', 'FPS', 'BI-FAST', 'Zengin System', 'ISMT', 'IBFT', 'InstaPay', 'FAST', 'CD/ATM', 'EBS', 'KFTC', 'Financial XML', 'NAPAS', 'SCT Inst', 'Borica Instant Payments', 'NKSInst', 'CERTIS Instant Payments', 'Straksclearing', 'Nets', 'Siirto', 'IRIS', 'AFR', 'Azonnali fizetési rendszer', 'CBI', 'EKS Zibmaksajums', 'CENTROlink', 'BILnet', 'Express Elixir', 'BlueCash', 'Straksbetalinger', 'Instant', 'Transfond Instant Payments', 'Flik', 'Bizum', 'BIR', 'TWINT', 'SIC', 'RPS', 'Fawri+', 'IPN', 'EATS', 'GhIPSS Instant Pay', 'PesaLink', 'IPSL', 'Cliq', 'Zaky', 'NETC', 'National Payment Switch', 'NIP', 'MPCSS', 'QMP', 'Raast', 'Sarie', 'RTC', 'PayShap', 'CEFTS', 'LankPay', 'TIPS', 'IPI', 'Aani', 'OSKO', 'Wave', 'Chipper Cash']},
  {id: 'bnpl', label: 'Buy Now, Pay Later', icon: '📅', formType: 'bnpl', methods: ['Klarna', 'Afterpay', 'Affirm', 'Zip', 'Sezzle', 'Clearpay', 'Laybuy', 'Splitit', 'PayPal Pay in 4', 'Shop Pay Installments', 'Humm', 'LatitudePay', 'Openpay', 'Payl8r', 'Zilch', 'Kueski', 'Credova', 'CareCredit', 'Acima', 'Progressive Leasing', 'Uplift', 'Billie', 'Flava', 'DivideBuy']},
  {id: 'cash', label: 'Cash & Voucher', icon: '💵', formType: 'cash', methods: ['Cash on Delivery', 'OXXO', '7-Eleven Bill Payment', 'Konbini', 'Paysafecard', 'Boleto Bancário', 'Multibanco Referências']},
];

export function getMethodGroup(methodName: string) {
  for (const group of PAYMENT_GROUPS) {
    if (group.methods.includes(methodName)) return group;
  }
  return null;
}

export function getMethodFormType(methodName: string) {
  const group = getMethodGroup(methodName);
  return group ? group.formType : null;
}

export const ALL_METHODS = PAYMENT_GROUPS.flatMap(g => g.methods);
