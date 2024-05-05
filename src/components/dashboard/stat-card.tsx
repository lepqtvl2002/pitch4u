import { cn } from "@/lib/utils";
import assert from "assert";
import React from "react";
import { Icons } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";

type Props = React.HtmlHTMLAttributes<HTMLDivElement> & {
  title: string;
  value: string | number;
  icon: keyof typeof Icons;
  description?: string;
  trending?: "up" | "down";
  trendingValue?: string | number;
};

function StatCard({
  className,
  icon,
  value,
  title,
  description,
  trending,
  trendingValue,
  children,
  ...props
}: Props) {
  const Icon = Icons[icon];
  assert(Icon, `Icon ${icon} not found`);
  assert(
    trending === undefined || trendingValue,
    "trendingValue is required when trending is provided"
  );
  assert(
    trendingValue === undefined || trending,
    "trending is required when trendingValue is provided"
  );
  return (
    <div
      {...props}
      className={cn(
        "col-span-1 flex h-24 min-h-fit items-center justify-center gap-2 rounded-md border-[0.02rem] border-border bg-background px-1.5 shadow-sm sm:px-3 md:gap-4 md:px-3",
        className
      )}
    >
      <div className="hidden h-fit w-fit rounded-full border border-popover bg-muted p-2 md:inline-block">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="ml-2 flex-1 space-y-1 md:ml-0">
        <section className="">
          <p className="md:text-md text-xs font-medium text-muted-foreground sm:text-sm">
            {title}
          </p>
          <div className={"flex items-end md:block"}>
            <h1 className="line-clamp-1 text-2xl font-bold">{value}</h1>
          </div>
          <div className="mt-1 flex items-center gap-2 text-xs">
            {trending &&
              trendingValue &&
              (trending === "up" ? (
                <div className="flex items-center text-green-500">
                  <Icons.trendingDown className="mr-1 h-4 w-4" />
                  <span className={"font-medium"}>{trendingValue}</span>
                </div>
              ) : (
                <div className="flex items-center text-red-500">
                  <Icons.trendingUp className="mr-1 h-4 w-4" />
                  <span className={"font-medium"}>{trendingValue}</span>
                </div>
              ))}
            <p className="text-muted-foreground">{description}</p>
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCardLoading({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "col-span-1 flex h-24 min-h-fit items-center justify-center gap-2 rounded-md border-[0.02rem] border-border bg-background px-1.5 shadow-sm sm:px-3 md:gap-4 md:px-3",
        className
      )}
    >
      <div className="hidden h-fit w-fit rounded-full border border-popover bg-muted p-2 md:inline-block">
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>

      <div className="ml-2 flex-1 space-y-2 md:ml-0">
        <Skeleton className="h-4 w-2/6" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-2 w-1/4" />
      </div>
    </div>
  );
}

StatCard.Loading = StatCardLoading;

export default StatCard;
