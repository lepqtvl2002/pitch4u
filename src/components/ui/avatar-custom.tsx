import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FALLBACK_IMAGE_URL } from "@/lib/constants";

export function AvatarCustom({
  name,
  avatarUrl,
  className,
  ...props
}: {
  className?: string;
  name?: string;
  avatarUrl?: string | null;
}) {
  return (
    <Avatar className={className} {...props}>
      <AvatarImage src={avatarUrl ?? FALLBACK_IMAGE_URL} alt={name} />
      <AvatarFallback>
        {name?.at(0) ? name.at(0)?.toUpperCase() : "?"}
      </AvatarFallback>
    </Avatar>
  );
}
