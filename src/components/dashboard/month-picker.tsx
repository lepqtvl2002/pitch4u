import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const MonthPicker = ({ selectedMonth, setSelectedMonth }: any) => {
  const months = [
    { key: 0, title: "Tháng 1" },
    { key: 1, title: "Tháng 2" },
    { key: 2, title: "Tháng 3" },
    { key: 3, title: "Tháng 4" },
    { key: 4, title: "Tháng 5" },
    { key: 5, title: "Tháng 6" },
    { key: 6, title: "Tháng 7" },
    { key: 7, title: "Tháng 8" },
    { key: 8, title: "Tháng 9" },
    { key: 9, title: "Tháng 10" },
    { key: 10, title: "Tháng 11" },
    { key: 11, title: "Tháng 12" },
  ];

  return (
    <Select onValueChange={setSelectedMonth}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={`Tháng ${selectedMonth + 1}`} />
      </SelectTrigger>
      <SelectContent>
        {months.map((month) => (
          <SelectItem key={month.key} value={month.key.toString()}>
            {month.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MonthPicker;
