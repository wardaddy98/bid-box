import { useGetCancelledAuctionsQuery } from '@/redux/api/auctions.api';
import Tray from '../Tray';

const CancelledAuctions = () => {
  const { data } = useGetCancelledAuctionsQuery({});

  return <Tray heading="Cancelled Auctions" auctions={data?.body?.data ?? []} />;
};

export default CancelledAuctions;
