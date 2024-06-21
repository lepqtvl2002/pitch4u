import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

interface FilterSelectorProps {
  trigger: React.ReactNode;
  items: { title: string; value: string }[];
  specialItems?: React.ReactNode[];
  className?: string;
  onChange: (value: string) => void;
}

export default function FilterSelector({
  trigger,
  items,
  specialItems,
  className,
  onChange,
}: FilterSelectorProps) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className={className}>{trigger}</SelectTrigger>
      <SelectContent>
        {specialItems?.map((item, i) => (
          <SelectItem key={i} value={""}>
            {item}
          </SelectItem>
        ))}
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
