import { useGetUpcomingAuctionsQuery } from '@/redux/api/auctions.api';
import Tray from '../Tray';

const UpcomingAuctions = () => {
  const { data } = useGetUpcomingAuctionsQuery({});

  return <Tray heading="Upcoming Auctions" auctions={data?.body?.data ?? []} />;
};

export default UpcomingAuctions;
