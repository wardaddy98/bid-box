import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Image from 'next/image';
type AvatarSize = 6 | 8 | 10 | 12 | 16 | 20 | 24;

const sizeMap: Record<AvatarSize, string> = {
  6: 'w-6 h-6',
  8: 'w-8 h-8',
  10: 'w-10 h-10',
  12: 'w-12 h-12',
  16: 'w-16 h-16',
  20: 'w-20 h-20',
  24: 'w-24 h-24',
};

interface Props {
  imageUrl: string;
  size?: AvatarSize;
  checkBadge?: boolean;
}

const Avatar = (props: Props) => {
  const { imageUrl, size = 8, checkBadge = false } = props;
  return (
    <div className={`relative rounded-full w-${size} ${sizeMap[size]} flex-none`}>
      <Image alt="User" src={imageUrl} className=" object-cover rounded-full" fill />
      {checkBadge && (
        <CheckBadgeIcon
          className={clsx(
            'text-green-400 absolute -bottom-1 -right-2',
            size === 6 && 'h-4 w-4',
            size === 8 && 'h-4.5 w-4.5',
            size === 10 && 'h-5 w-5',
            size === 12 && 'h-5.5 w-5.5',
            size === 16 && 'h-7 w-7',
            size === 20 && 'h-8 w-8',
            size === 24 && 'h-9 w-9',
          )}
        />
      )}
    </div>
  );
};

export default Avatar;
