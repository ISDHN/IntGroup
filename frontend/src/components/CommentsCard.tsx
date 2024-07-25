import { useState } from "react";
import { PostInfoBox } from "./PostInfoBox";
import { IComment } from "../interface";
import * as axios from "axios";

export function CommentsCard(props: { id: number }) {

    const [commentAndState, setCommentAndState] = useState<{ comment: IComment, state: boolean }>({
        comment: {
            uid: -1,
            content: '',
            date: ''
        }, state: true
    })

    if (commentAndState.state) {
        axios.default.post(`http://localhost:7001/api/post/getComment/${props.id}`).then((res) => {
            setCommentAndState({ comment: res.data, state: false })
        })
    }

    return (
        <div className="my-2 p-4 w-full rounded-md dark:border-indigo-900 border-violet-400 border-2">
            <PostInfoBox id={commentAndState.comment.uid} date={commentAndState.comment.date} />
            <div className="text-2xl my-3">
                {commentAndState.comment.content}
            </div>
        </div>
    )
}