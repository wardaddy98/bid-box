import { SelectOption } from '../components/Select/index';

export const generateSelectOptionsFromEnum = (e: Record<string, string>): SelectOption[] => {
  return Object.entries(e).map(([label, value]) => ({
    label,
    value,
  }));
};

export const formatAmount = (amount: unknown): string =>
  '₹ ' + Number(amount || 0).toLocaleString('en-IN');
