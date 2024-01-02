import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const YearPicker = ({ selectedYear, setSelectedYear }: any) => {
  const years = [
    { key: 2024, title: "Năm 2024" },
    { key: 2023, title: "Năm 2023" },
    { key: 2022, title: "Năm 2022" },
    { key: 2021, title: "Năm 2021" },
    { key: 2020, title: "Năm 2020" },
  ];

  return (
    <Select onValueChange={setSelectedYear}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={`Năm ${Number(selectedYear)}`} />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year.key} value={year.key.toString()}>
            {year.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default YearPicker;
