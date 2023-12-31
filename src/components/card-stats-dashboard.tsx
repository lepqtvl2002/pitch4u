import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Icons } from "./icons";

type CardStatProps = {
  title: string;
  value?: string;
  description?: string;
  miniIcon: keyof typeof Icons;
};
export default function CardStatDashboard(props: CardStatProps) {
  const Icon = Icons[props.miniIcon];
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{props.title}</CardTitle>
        <Icon />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{props.value}</div>
        <p className="text-xs text-muted-foreground">{props.description}</p>
      </CardContent>
    </Card>
  );
}
