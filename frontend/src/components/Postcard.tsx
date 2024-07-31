import * as axios from "axios"
import { useState } from "react"
import { setMessageBox } from "../App"
import { PostCreation } from "./PostCreation"
import { getCurrentUser } from "../CurrentUser"
import { PostInfoBox } from "./PostInfoBox"
import { IPost } from "../interface"
import { CardsContainer } from "./CardsContainer"
import { LikeButton } from "./LikeButton"

enum CreationType {
    None,
    Comment,
    Forward
}

export const PostCard = (props: { id: number, quote: boolean }) => {
    const [postInfo, setPostInfo] = useState<{ post: IPost, state: boolean }>({
        post: {
            uid: -1,
            iid: -1,
            content: '',
            quote: -1,
            imgs: [],
            date: '',
            likes: 0,
            comments: []
        }, state: true
    })

    if (postInfo.state) {
        axios.default.post(`http://localhost:7001/api/post/info/${props.id}`).then((res) => {
            setPostInfo({ post: res.data, state: false })
        })
    }

    const [creationType, setCreationType] = useState(CreationType.None)

    return (
        <>
            <div className="rounded-md bg-slate-200 dark:bg-gray-800 my-2 p-4 w-full h-fit flex flex-col" >
                <PostInfoBox id={postInfo.post.uid} date={postInfo.post.date} />
                <div className="text-2xl my-3">
                    {postInfo.post.content}
                    {postInfo.post.quote == -1 ? <></> :
                        <div className="border-2 rounded-md mt-6 mx-4 dark:border-indigo-900 border-violet-400">
                            <PostCard id={postInfo.post.quote} quote={true} />
                        </div>
                    }
                </div>
                <div className="overflow-auto">
                    <div className="flex justify-center ">
                        {postInfo.post.imgs.map((image, index) => {
                            return (
                                <div key={index} className="relative w-20 h-20 m-2">
                                    <img src={image} className="absolute h-full w-full object-cover" onClick={() => setMessageBox(
                                        <img src={image} className="h-full w-full object-contain" />, true
                                    )} />
                                </div>
                            )
                        })}
                    </div>
                </div>
                {props.quote || getCurrentUser() == -1 ? <></> : <>
                    <div className='flex justify-end mt-2'>
                        <LikeButton id={props.id} />
                        <button className="mx-2 bg-zinc-400 text-sm dark:bg-sky-950 rounded px-4 py-2" onClick={() => setCreationType(CreationType.Comment)}>Comment</button>
                        <button className="mx-2 bg-zinc-400 text-sm dark:bg-sky-950 rounded px-4 py-2" onClick={() => setCreationType(CreationType.Forward)}>Forward</button>
                    </div>
                    <div className="relative h-fit">
                        {creationType ? <></> : <CardsContainer type="comment" domain="post" datakind={`comments/${props.id}`} singleCount={3} />}
                        {!creationType ? <></> : <CardsContainer type="comment" domain="post" datakind={`comments/${props.id}`} singleCount={3} />}
                    </div>
                    {
                        creationType == CreationType.None ? <></> : <div className="relative bottom-0 my-2 w-full py-2 px-8">
                            <PostCreation hideCallBack={() => setCreationType(CreationType.None)}
                                url={creationType == CreationType.Comment ? `comment?uid=${getCurrentUser()}&pid=${props.id}` :
                                    creationType == CreationType.Forward ? `forward?uid=${getCurrentUser()}&pid=${props.id}` : ''
                                }
                                canUploadImage={false} />
                        </div>
                    }
                </>}
            </div>
        </>
    )
}