'use client';

import { useParams } from 'next/navigation';

const Bid = () => {
  const id = useParams();
  console.log(id, 'LKK');
  return <div>bid route</div>;
};
export default Bid;
