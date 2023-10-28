import { cn } from "@/lib/utils";

export function Timeline({ timeFrames }: { timeFrames: any[] }) {
    return (
        <div className="flex flex-col space-y-2 w-full">
            {timeFrames.map((timeFrame, index) => (
                <TimeFrame key={index} timeFrame={timeFrame} />
            ))}
        </div>
    );
}

export function TimeFrame({ timeFrame }: { timeFrame: any }) {
    return (
        <div className="flex justify-between w-full">
            <span>{timeFrame?.frame[0]}:00</span>
            <div
                className={cn(
                    "rounded border w-5/6 h-10",
                    timeFrame?.free && "bg-emerald-400"
                )}
            ></div>
        </div>
    );
}