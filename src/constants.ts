interface IConstants {
  API_URL: string | undefined;
  NEXT_PUBLIC_RAZORPAY_KEY_ID: string | undefined;
  NEXT_PUBLIC_COMPANY_LOGO: string | undefined;
  NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID: string;
}

const constants: IConstants = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  NEXT_PUBLIC_COMPANY_LOGO: process.env.NEXT_PUBLIC_COMPANY_LOGO,
  NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID ?? '',
};

export default constants;
