'use client';

import clsx from 'clsx';
import DatePicker from 'react-datepicker';

interface Props {
  disabled?: boolean;
  date: Date | null;
  onChange: (date: Date | null) => void;
  containerClassName?: string;
  label?: string;
}

const DateTimePicker = (props: Props) => {
  const { disabled, date, onChange, containerClassName, label } = props;

  const now = new Date();

  const isToday = date && date.toDateString() === now.toDateString();

  const maxTime = new Date();
  maxTime.setHours(23, 59);

  return (
    <div className={`${containerClassName} w-full`}>
      {label && <label className="mb-1 block text-sm font-semibold text-gray-500">{label}</label>}

      <DatePicker
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        // timeFormat="HH:mm"
        timeIntervals={15}
        disabled={disabled}
        className={clsx(
          'cursor-default block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2 text-gray-700 focus:border-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-40',
          disabled && 'pointer-events-none cursor-none opacity-40',
        )}
        selected={date}
        onChange={onChange}
        placeholderText="Select Date & Time"
        wrapperClassName="w-full"
        minDate={new Date()}
        minTime={isToday ? now : new Date(0, 0, 0, 0, 0)}
        maxTime={maxTime}
      />
    </div>
  );
};

export default DateTimePicker;
