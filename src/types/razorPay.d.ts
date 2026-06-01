export {};

export interface IRazorPayErrorResponse {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: {
      order_id: string;
      payment_id: string;
    };
  };
}

export interface IRazorPaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  image?: string;
  order_id: string;

  handler: (response: IRazorPaySuccessResponse) => void;

  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };

  notes?: Record<string, string>;

  theme?: {
    color?: string;
  };

  modal?: {
    ondismiss?: () => void;
    escape?: boolean;
    backdropclose?: boolean;
    confirm_close?: boolean;
    animation?: boolean;
    handleback?: boolean;
  };
}

declare global {
  interface Window {
    // This defines Razorpay as a constructable object
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      on: (event: string, callback: (error: IRazorPayErrorResponse) => void) => void;
    };
  }
}
