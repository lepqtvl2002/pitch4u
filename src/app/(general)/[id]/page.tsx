import React from 'react';
import PitchOrder from '@/components/landing/order';
import Comment from '@/components/landing/comment';

const CommentList = [
    {id: 1, author: "Nguyen Van A", text: "This is one comment"},
    {id: 2, author: "Nguyen Van B", text: "This is *another* comment"}
]

const PitchDetail = () => {
    return (
        <>
            <PitchOrder/>
            {CommentList.map((comment) => (
                <Comment key={comment.id} comment={comment}/>
            ))}
        </>
    );
}

export default PitchDetail;
