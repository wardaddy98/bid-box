import Spinner from '../Spinner';

const PageLoader = () => {
  return (
    <div className="fixed w-screen h-screen inset-0  bg-black/10 z-999 flex items-center justify-center">
      <Spinner textClassName="text-white" size="medium" />
    </div>
  );
};

export default PageLoader;
