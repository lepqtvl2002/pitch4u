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
import { format } from 'date-fns';


export type ReviewType = {
    review_id: number;
    pitch_id: number;
    user_id: number;
    booking_id: number;
    text: string;
    star: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: null | string; // Assuming deletedAt can be either null or a string timestamp
  };

const Review = ({review, className, ...props}: { review: ReviewType, className?: string }) => {
    return (
        <div className={cn("comment flex items-start space-x-2", className)} {...props}>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className={"flex flex-1 flex-col space-y-1 pb-6"}>
                <h2 className="commentAuthor text-sm font-semibold">
                    user id {review.user_id}
                </h2>
                <span className={"text-xs md:text-sm text-gray-500"}>{format(new Date(review.createdAt), "dd/MM/yyyy")}</span>
                <Stars rating={review.star}/>
                <span className={"text-sm"}>{review.text}</span>
                {/* <div className={"flex"}>
                    <Button className={"flex space-x-2 text-xs"} variant={"ghost"}>
                        <ThumbsUp/> <span>10</span>
                    </Button>
                    <Button className={"flex space-x-2"} variant={"ghost"}>
                        <ThumbsDown/> <span>2</span>
                    </Button>
                </div> */}
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button className={"p-0 md:p-2"} variant={"ghost"}>
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

export default Review;
