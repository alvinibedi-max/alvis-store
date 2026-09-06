const CURRENCY_MAP: Record<string, {code: string; symbol: string; name: string}> = {
  
  GB: {code: 'GBP', symbol: '£', name: 'British Pound'},
  US: {code: 'USD', symbol: '$', name: 'US Dollar'},
  CA: {code: 'CAD', symbol: 'C$', name: 'Canadian Dollar'},
  AU: {code: 'AUD', symbol: 'A$', name: 'Australian Dollar'},
  NZ: {code: 'NZD', symbol: 'NZ$', name: 'NZ Dollar'},
  IE: {code: 'EUR', symbol: '€', name: 'Euro'},
  DE: {code: 'EUR', symbol: '€', name: 'Euro'},
  FR: {code: 'EUR', symbol: '€', name: 'Euro'},
  ES: {code: 'EUR', symbol: '€', name: 'Euro'},
  IT: {code: 'EUR', symbol: '€', name: 'Euro'},
  NL: {code: 'EUR', symbol: '€', name: 'Euro'},
  BE: {code: 'EUR', symbol: '€', name: 'Euro'},
  PT: {code: 'EUR', symbol: '€', name: 'Euro'},
  AT: {code: 'EUR', symbol: '€', name: 'Euro'},
  FI: {code: 'EUR', symbol: '€', name: 'Euro'},
  GR: {code: 'EUR', symbol: '€', name: 'Euro'},
  JP: {code: 'JPY', symbol: '¥', name: 'Japanese Yen'},
  CN: {code: 'CNY', symbol: '¥', name: 'Chinese Yuan'},
  IN: {code: 'INR', symbol: '₹', name: 'Indian Rupee'},
  BR: {code: 'BRL', symbol: 'R$', name: 'Brazilian Real'},
  KR: {code: 'KRW', symbol: '₩', name: 'Korean Won'},
  SG: {code: 'SGD', symbol: 'S$', name: 'Singapore Dollar'},
  HK: {code: 'HKD', symbol: 'HK$', name: 'HK Dollar'},
  SE: {code: 'SEK', symbol: 'kr', name: 'Swedish Krona'},
  NO: {code: 'NOK', symbol: 'kr', name: 'Norwegian Krone'},
  DK: {code: 'DKK', symbol: 'kr', name: 'Danish Krrone'},
  CH: {code: 'CHF', symbol: 'CHF', name: 'Swiss Franc'},
  PL: {code: 'PLN', symbol: 'zł', name: 'Polish Złoty'},
  CZ: {code: 'CZK', symbol: 'Kč', name: 'Czech Koruna'},
  MX: {code: 'MXN', symbol: '$', name: 'Mexican Peso'},
  ZA: {code: 'ZAR', symbol: 'R', name: 'South African Rand'},
  AE: {code: 'AED', symbol: 'AED', name: 'UAE Dirham'},
  SA: {code: 'SAR', symbol: 'SAR', name: 'Saudi Riyal'},
  TH: {code: 'THB', symbol: '฿', name: 'Thai Baht'},
  MY: {code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit'},
  PH: {code: 'PHP', symbol: '₱', name: 'Philippine Peso'},
  ID: {code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah'},
  VN: {code: 'VND', symbol: '₫', name: 'Vietnamese Đồng'},
  TR: {code: 'TRY', symbol: '₺', name: 'Turkish Lira'},
  IL: {code: 'ILS', symbol: '₪', name: 'Israeli Shekel'},
  RU: {code: 'RUB', symbol: '₽', name: 'Russian Ruble'},
  NG: {code: 'NGN', symbol: '₦', name: 'Nigerian Naira'},
  KE: {code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling'},
};

const DEFAULT_CURRENCY = {code: 'GBP', symbol: '£', name: 'British Pound'};

export function detectCurrency() {
  try {
    const stored = localStorage.getItem('alvis_currency');
    if (stored) return JSON.parse(stored);
  } catch {}
  const locale = navigator.language || (navigator.languages?.[0] as string) || 'en-GB';
  const parts = locale.split('-');
  const region = parts[1]?.toUpperCase() || 'GB';
  return CURRENCY_MAP[region] || DEFAULT_CURRENCY;
}

export function setCurrency(code: string) {
  const entry = Object.values(CURRENCY_MAP).find(c => c.code === code);
  if (entry) localStorage.setItem('alvis_currency', JSON.stringify(entry));
  return entry;
}

export function setCurrencyByCountry(countryCode: string) {
  const currency = CURRENCY_MAP[countryCode.toUpperCase()] || DEFAULT_CURRENCY;
  localStorage.setItem('alvis_currency', JSON.stringify(currency));
  return currency;
}

export function formatPrice(amount: number, currency?: any) {
  const c = currency || detectCurrency();
  if (c.code === 'JPY' || c.code === 'KRW' || c.code === 'VND' || c.code === 'IDR') {
    return `${c.symbol}${Math.round(amount)}`;
  }
  return `${c.symbol}${amount.toFixed(2)}`;
}
