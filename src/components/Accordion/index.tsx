import { ReactNode } from 'react';

interface AccordionProps {
  children: ReactNode;
  heading: string;
  headingIcon?: ReactNode;
}

const Accordion = (props: AccordionProps) => {
  const { children, heading, headingIcon } = props;
  return (
    <details className="group   [&_summary::-webkit-details-marker]:hidden rounded-lg border-2 border-gray-200 bg-white overflow-hidden">
      <summary className="flex cursor-pointer group-open:border-b group-open:border-gray-200 items-center justify-between px-4 py-2 font-medium">
        <div className="flex items-center justify-start gap-2">
          {headingIcon && headingIcon}
          <span className="text-sm font-semibold">{heading}</span>
        </div>

        <svg
          className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>

      <div className="px-4 py-2">
        <p className="text-gray-700">{children}</p>
      </div>
    </details>
  );
};

export default Accordion;
