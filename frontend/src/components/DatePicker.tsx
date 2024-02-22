import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns/format";

const formatDate = (dateString: string) => {
  const formattedDate = format(new Date(dateString), "yyyy-MM-dd");
  return formattedDate;
};

export default function BasicDatePicker({
  label,
  date,
  onDateChange,
  dateLimit,
}: {
  label: string;
  date: string;
  onDateChange: (date: string) => void;
  dateLimit: string;
}) {
  const handleDateChange = (newDate: string | null) => {
    if (newDate) {
      onDateChange(formatDate(newDate));
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={date}
        onChange={handleDateChange}
        minDate={dateLimit}
      />
    </LocalizationProvider>
  );
}
