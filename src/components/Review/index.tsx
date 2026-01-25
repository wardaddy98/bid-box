import { CheckBadgeIcon, CubeIcon, DocumentTextIcon, TruckIcon } from '@heroicons/react/24/solid';
import Avatar from '../Avatar';
import Badge from '../Badge';
import Rating from '../Rating';

interface Props {
  test?: string;
}

const Review = (props: Props) => {
  return (
    <div className="flex items-start gap-4 border-gray-200 p-4 rounded-none lg:rounded-2xl border-t-2 lg:border-2 last:border-b-2">
      <Avatar
        imageUrl="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&amp;fit=crop&amp;q=80&amp;"
        checkBadge
        size={12}
      />

      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900 text-md">Name</h3>
          <Rating score={3} />
        </div>
        <h3 className="font-medium text-gray-400 text-sm">Title goes here</h3>

        <p className="mt-2 text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates voluptas distinctio
          nesciunt quas non animi.
        </p>

        <div className="flex flex-wrap justify-start items-start gap-2 mt-3">
          <Badge
            icon={<TruckIcon className="h4 w-4 text-blue-500" />}
            bgColor="bg-[#eaf1f5]"
            text="Shipping - 5"
          />
          <Badge
            icon={<CheckBadgeIcon className="h4 w-4 text-blue-500" />}
            bgColor="bg-[#eaf1f5]"
            text="Product Quality - 2"
          />
          <Badge
            icon={<CubeIcon className="h4 w-4 text-blue-500" />}
            bgColor="bg-[#eaf1f5]"
            text="Packaging - 1"
          />
          <Badge
            icon={<DocumentTextIcon className="h4 w-4 text-blue-500" />}
            bgColor="bg-[#eaf1f5]"
            text="As Described - 4"
          />
        </div>
      </div>
    </div>
  );
};

export default Review;
