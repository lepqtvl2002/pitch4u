import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function SelectSimple({items, onChange, defaultValue = items[0], placeholder}: {
    items: any,
    onChange: any,
    defaultValue?: any,
    placeholder?: string
}) {
    return (
        <Select defaultValue={defaultValue} onValueChange={onChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={placeholder}/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {items.map((item: any, index: number) => (
                        <SelectItem key={item + index} value={item}>{item}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
