import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Button from '../Button';

interface Props {
  className?: string;
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void;
}

const Pagination = (props: Props) => {
  const { className, currentPage, totalPages, setPage } = props;

  const handlePrevious = () => {
    setPage(currentPage - 1);
  };

  const handleNext = () => {
    setPage(currentPage + 1);
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <Button
        disabled={!(currentPage > 1)}
        variant="secondary"
        onClick={handlePrevious}
        startIcon={<ChevronLeftIcon className="h-4 w-4" />}
      >
        Previous
      </Button>

      {Array.from({ length: totalPages }).map((_, idx) => {
        const isCurrent = idx + 1 === currentPage;

        return (
          <Button
            key={idx}
            onClick={() => setPage(idx + 1)}
            variant={isCurrent ? 'primary' : 'secondary'}
            disabled={isCurrent}
          >
            {idx + 1}
          </Button>
        );
      })}

      <Button
        disabled={currentPage >= totalPages}
        variant="secondary"
        onClick={handleNext}
        endIcon={<ChevronRightIcon className="h-4 w-4" />}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
