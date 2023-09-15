import React from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Stars} from "@/components/ui/vote-stars";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {MoreVertical, ThumbsDown, ThumbsUp} from "lucide-react";

type CommentProps = {
    author: string;
    text: string;
}
const Comment = ({comment, className, ...props}: { comment: CommentProps, className?: string }) => {
    return (
        <div className={cn("comment flex items-start space-x-2", className)} {...props}>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className={"flex flex-1 flex-col space-y-1"}>
                <h2 className="commentAuthor font-semibold">
                    {comment.author}
                </h2>
                <span className={"text-gray-500"}>10/10/2023</span>
                <Stars rating={5}/>
                {comment.text}
                <div className={"flex"}>
                    <Button className={"flex space-x-2"} variant={"ghost"}>
                        <ThumbsUp/> <span>10</span>
                    </Button>
                    <Button className={"flex space-x-2"} variant={"ghost"}>
                        <ThumbsDown/> <span>2</span>
                    </Button>
                </div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant={"ghost"}>
                        <MoreVertical/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Báo cáo</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default Comment;
