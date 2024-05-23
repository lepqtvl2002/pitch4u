import { cn } from "@/lib/utils";

export function NotificationBadge({
  number = 0,
  className,
}: {
  number: number;
  className?: string;
}) {
  return (
    <div className={cn(!number && "hidden")}>
      <span
        className={cn(
          "absolute top-0 right-0 inline-flex rounded-full h-4 w-4 bg-sky-500 justify-center text-xs text-white font-semibold",
          className
        )}
      >
        {number > 9 ? "+9" : number}
      </span>
      <span
        className={cn(
          "absolute top-0 right-0 animate-ping inline-flex h-4 w-4 rounded-full bg-sky-400 opacity-75",
          className
        )}
      ></span>
    </div>
  );
}
