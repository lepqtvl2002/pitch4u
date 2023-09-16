import React from "react";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {SelectSimple} from "@/app/(general)/[id]/components/select-custom";
import {DatePickerDemo} from "@/components/ui/date-picker";
import {Stars} from "@/components/ui/vote-stars";
import Link from "next/link";
import {Heart, MessageCircle} from "lucide-react";

export default function OrderSelections({pitch}: { pitch: any }) {
    const [price, setPrices] = React.useState(0);
    const [type, setType] = React.useState(pitch.types[0]);
    const [date, setDate] = React.useState<Date>(new Date());
    const [subPitch, setSubPitch] = React.useState(pitch.subPitches.at(0).name);

    function handlePrice(time: string) {
        return setPrices(pitch.prices[time]);
    }

    return (<div className={"relative flex flex-col space-y-2"}>
        <Button variant={"ghost"} className={"absolute top-0 right-0"}>Tố cáo</Button>
        <h2 className="text-bold text-xl md:text-4xl">{pitch.name}</h2>
        <h3 className="text-sm md:text-lg">{pitch.address}</h3>
        <div className={"flex space-x-2 items-center"}>
            <Link href={"#voting"} className={"flex space-x-2 items-center"}>
                <Label className={""}>5/5</Label>
                <Stars rating={4.2} className={"text-yellow-400 text-xl"}/>
            </Link>
            <Label>|</Label>
            <Link href={"#comment"}>2 Đánh Giá</Link>
        </div>
        <div className="flex flex-col space-y-2">
            <div className={"flex items-center space-x-2"}>
                <Label className={"text-gray-500 w-1/4"}>Chọn ngày</Label>
                <DatePickerDemo date={date} setDate={setDate}/>
            </div>
            <div className={"flex space-x-2 items-center"}>
                <Label className={"text-gray-500 w-1/4"}>Loại Sân</Label>
                {pitch.types.map((typePitch: string) => <Button variant={typePitch === type ? "default" : "outline"}
                                                                key={typePitch} onClick={() => {
                    setType(typePitch)
                }}>
                    {typePitch}
                </Button>)}
            </div>
            <div className={"flex space-x-2 items-center"}>
                <Label className={"text-gray-500 w-1/4"}>Chọn thời gian</Label>
                <SelectSimple items={Object.keys(pitch.prices)} onChange={handlePrice}/>
            </div>
            <div className={"flex space-x-2 items-center"}>
                <Label className={"text-gray-500 w-1/4"}>Chọn sân</Label>
                <SelectSimple items={pitch.subPitches.map((subPitch: any) => subPitch.name)}
                              onChange={(subPitchName: string) => setSubPitch(subPitchName)}
                              defaultValue={subPitch}/>
            </div>
        </div>
        {price ? <div className={"text-primary text-3xl space-x-2 p-4 text-end md:text-start"}>
            <Label>Giá</Label>
            <span>{price}</span>
        </div> : null}
        <div className={"fixed bottom-0 right-0 left-0 md:relative flex md:space-x-2 md:pt-20 bg-white z-10"}>
            <Button className={"hidden md:flex"} variant={"outline"}>
                <Heart className={"mr-2"}/>
                <span className={"text-sm"}>Thêm vào danh sách yêu thích</span>
            </Button>
            <Button className={"w-1/4 md:hidden rounded-none flex-col p-0 m-0"} variant={"outline"}>
                <Heart/>
                <span className={"text-xs"}>Yêu thích</span>
            </Button>
            <Button className={"w-1/4 md:hidden rounded-none flex-col p-0 m-0"} variant={"outline"}>
                <MessageCircle/>
                <span className={"text-xs"}>Chat ngay</span>
            </Button>
            <Button className={"w-1/2 md:w-auto rounded-none md:rounded-md bg-[#28cb8e] hover:bg-main-foreground"} disabled={!price}>Đặt sân ngay</Button>
        </div>
    </div>)
}