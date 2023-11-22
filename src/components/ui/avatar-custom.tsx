import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarCustom({
  name,
  avatarUrl,
  className,
  ...props
}: {
  className?: string;
  name?: string;
  avatarUrl: string;
}) {
  return (
    <Avatar className={className} {...props}>
      <AvatarImage src={avatarUrl} alt={name} />
      <AvatarFallback>
        {name?.at(0) ? name.at(0)?.toUpperCase() : "?"}
      </AvatarFallback>
    </Avatar>
  );
}
