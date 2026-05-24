import { SelectOption } from '../components/Select/index';

export const generateSelectOptionsFromEnum = (e: Record<string, string>): SelectOption[] => {
  return Object.entries(e).map(([label, value]) => ({
    label,
    value,
  }));
};

export const formatAmount = (amount: unknown, includeCurrencySymbol: boolean = true): string =>
  (includeCurrencySymbol ? '₹' : '') + Number(amount || 0).toLocaleString('en-IN');

export const isoDateToReadableFormat = (isoString: string) =>
  new Date(isoString).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export const isoDateToHMSFormat = (isoString?: string) =>
  isoString
    ? new Date(isoString).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })
    : '';
