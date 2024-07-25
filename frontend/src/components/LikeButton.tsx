import { useState } from "react";
import * as axios from "axios";
import { getCurrentUser } from "../CurrentUser";



export function LikeButton(props: { id: number }) {
    const [likedAndState, setLikedAndState] = useState({ liked: false, state: true });
    const [likesAndState, setLikesAndState] = useState({ likes: 0, state: true });

    if (likedAndState.state) {
        axios.default.post(`http://localhost:7001/api/user/likesinfo/${getCurrentUser()}/has/${props.id}`).then((res) => {
            setLikedAndState({ liked: res.data, state: false });
        });
    }
    if (likesAndState.state) {
        axios.default.post(`http://localhost:7001/api/post/getLikes/${props.id}`).then((res) => {
            setLikesAndState({ likes: res.data, state: false });
        });
    }
    return (
        <button className="mx-2 bg-zinc-400 text-sm dark:bg-sky-950 rounded px-4 py-2" onClick={() => {
            axios.default.post(`http://localhost:7001/api/user/likesinfo/${getCurrentUser()}/${likedAndState.liked ? 'remove' : 'add'}/${props.id}`).then(() => {
                setLikedAndState({ liked: !likedAndState.liked, state: true });
                setLikesAndState({ likes: likesAndState.likes, state: true });
            })
        }}>
            {likedAndState.liked ? 'Unlike' : 'Like'}{likesAndState.likes > 0 ? ` (${likesAndState.likes})` : ''}
        </button>
    )
}