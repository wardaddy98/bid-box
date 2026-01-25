import Lottie, { Options } from 'react-lottie';

export interface Props {
  lottieJson: unknown;
  className?: string;
  options?: Options;
}

const LottieAnimation = (props: Props) => {
  const { className, lottieJson, options = {} } = props;

  const defaultOptions: Options = {
    loop: true,
    autoplay: true,
    animationData: lottieJson,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className={className}>
      <Lottie options={{ ...defaultOptions, ...options }} />
    </div>
  );
};

export default LottieAnimation;
