import constants from '@/constants';
import { getUser } from '@/redux/slices/auth.slice';
import {
  IRazorPayErrorResponse,
  IRazorPaySuccessResponse,
  RazorpayOptions,
} from '@/types/razorPay';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useRazorPay = () => {
  const user = useSelector(getUser);

  const initializePayment = (
    amount: number,
    orderId: string,
    handleSuccess: (response: IRazorPaySuccessResponse) => Promise<void>,
    handleFailure?: (response: IRazorPayErrorResponse) => Promise<void>,
    handleDismiss?: () => void,
    description: string = '',
  ) => {
    if (!window.Razorpay) {
      toast.error('Unexpected error has occurred! Try again.');
    }

    const options: RazorpayOptions = {
      key: constants.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
      amount,
      currency: 'INR',
      name: 'Bid Box',
      description,
      image: constants.NEXT_PUBLIC_COMPANY_LOGO,
      order_id: orderId,
      handler: handleSuccess,
      prefill: {
        name: user?.name ?? '',
        email: user?.email ?? '',
        // contact: '+919876543210',
      },
      notes: {
        address: 'Bid box Corporate Office',
      },
      theme: {
        color: '#0187e6',
      },
      modal: {
        escape: false,
        ondismiss() {
          if (handleDismiss) handleDismiss();
        },
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();

    razorpay.on('payment.failed', async function (response) {
      if (handleFailure) handleFailure(response);
    });
  };

  return {
    initializePayment,
  };
};

export default useRazorPay;
