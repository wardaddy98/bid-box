import Button from '../Button';

interface Props {
  className?: string;
}

const Pagination = (props: Props) => {
  const { className } = props;
  return (
    <div className={`flex gap-2 ${className}`}>
      <Button variant="secondary">Previous</Button>
      <Button variant="secondary">1</Button>
      <Button variant="secondary">2</Button>
      <Button variant="secondary">3</Button>
      <Button variant="secondary">Next</Button>
    </div>
  );
};

export default Pagination;
