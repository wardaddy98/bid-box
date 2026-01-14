import { StarIcon } from '@heroicons/react/24/solid';

interface Props {
  score: number; // 0–5
}

const Rating = ({ score }: Props) => {
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: 5 }, (_, idx) => {
        const fill = Math.min(Math.max(score - idx, 0), 1);
        return <Star key={idx} percentage={fill * 100} id={idx} />;
      })}
    </div>
  );
};

const Star = ({ percentage, id }: { percentage: number; id: number }) => {
  const clipId = `star-fill-${id}`;

  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <defs>
        <clipPath id={clipId}>
          <rect width={`${percentage}%`} height="24" />
        </clipPath>
      </defs>

      {/* Empty */}
      <StarIcon className="text-gray-300" />

      {/* Filled */}
      <StarIcon className="text-yellow-300" clipPath={`url(#${clipId})`} />
    </svg>
  );
};

export default Rating;
