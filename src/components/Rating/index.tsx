import { StarIcon } from '@heroicons/react/24/solid';

interface Props {
  score: number;
}

const Rating = ({ score }: Props) => {
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: 5 }, (_, idx) => {
        const fill = Math.min(Math.max(score - idx, 0), 1);
        return <Star key={idx} percentage={fill * 100} />;
      })}
    </div>
  );
};

const Star = ({ percentage }: { percentage: number }) => (
  <div className="relative w-5 h-5">
    <StarIcon className="h-4 w-4 absolute inset-0 text-gray-300" />

    <div className="absolute inset-0 overflow-hidden" style={{ width: `${percentage}%` }}>
      <StarIcon className="h-4 w-4 text-yellow-300" />
    </div>
  </div>
);

export default Rating;
