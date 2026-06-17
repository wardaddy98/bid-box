import { IPopulatedReview } from '@/types/review.type';
import { CheckBadgeIcon, CubeIcon, DocumentTextIcon, TruckIcon } from '@heroicons/react/24/solid';
import Avatar from '../Avatar';
import Badge from '../Badge';
import Rating from '../Rating';

interface Props {
  review: IPopulatedReview;
}

const Review = (props: Props) => {
  const { review } = props;
  return (
    <div className="flex items-start gap-4 border-gray-200 p-4 rounded-none lg:rounded-2xl border-t-2 lg:border-2 last:border-b-2">
      <Avatar
        imageUrl={review?.user?.profileImage}
        checkBadge
        size={12}
        userName={review?.user?.name ?? ''}
      />

      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900 text-md">{review?.user?.name}</h3>
          <Rating score={review?.overallRating} />
        </div>
        <h3 className="font-medium text-gray-400 text-sm">{review?.title}</h3>

        <p className="mt-2 text-gray-700">{review?.comment}</p>

        <div className="flex flex-wrap justify-start items-start gap-2 mt-3">
          <Badge
            icon={<TruckIcon className="h4 w-4 text-blue-500" />}
            bgColor="bg-[#eaf1f5]"
            text={`Shipping - ${review?.details?.shipping}`}
          />
          <Badge
            icon={<CheckBadgeIcon className="h4 w-4 text-blue-500" />}
            bgColor="bg-[#eaf1f5]"
            text={`Product Quality - ${review?.details?.productQuality}`}
          />
          <Badge
            icon={<CubeIcon className="h4 w-4 text-blue-500" />}
            bgColor="bg-[#eaf1f5]"
            text={`Packaging - ${review?.details?.packaging}`}
          />
          <Badge
            icon={<DocumentTextIcon className="h4 w-4 text-blue-500" />}
            bgColor="bg-[#eaf1f5]"
            text={`As Described - ${review?.details?.asDescribed}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Review;
