import Spinner from '../Spinner';

const Loader = () => {
  return (
    <div className="fixed w-screen inset-0 h-screen  z-999 flex items-center justify-center">
      <Spinner />
    </div>
  );
};

export default Loader;
