export const formatEuro = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);

export const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');
