import React from 'react';

type CommentProps = {
    author: string;
    text: string;
}
const Comment = ({ comment } : {comment : CommentProps}) => {
    return (
        <div className="comment">
            <h2 className="commentAuthor">
                {comment.author}
            </h2>
            {comment.text}
        </div>
    );
};

export default Comment;
