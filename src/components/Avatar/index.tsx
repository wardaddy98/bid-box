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

const textSizeMap: Record<AvatarSize, string> = {
  6: 'text-xs',
  8: 'text-sm',
  10: 'text-base',
  12: 'text-lg',
  16: 'text-2xl',
  20: 'text-3xl',
  24: 'text-4xl',
};

interface Props {
  imageUrl: string | undefined;
  size?: AvatarSize;
  checkBadge?: boolean;
  userName?: string;
}

const Avatar = (props: Props) => {
  const { imageUrl, size = 8, checkBadge = false, userName = 'User' } = props;

  const initials = userName
    .trim()
    .split(' ')
    .slice(0, 2)
    .map(word => word[0]?.toUpperCase())
    .join('');

  return (
    <div className={`relative rounded-full w-${size} ${sizeMap[size]} flex-none`}>
      {imageUrl ? (
        <Image alt="User" src={imageUrl} className=" object-cover rounded-full" fill />
      ) : (
        <div
          className={clsx(
            'w-full h-full rounded-full bg-primary text-white font-semibold flex items-center justify-center',
            textSizeMap[size],
          )}
        >
          {initials}
        </div>
      )}
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
