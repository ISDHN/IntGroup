import { IInterest } from "../interface";
import { CardsContainer } from "./CardsContainer";
import { useState } from "react";
import * as axios from "axios";
import { getCurrentUser } from "../CurrentUser";
import { PostCreation } from "./PostCreation";

export function InterestInfo(props: { intInfo: IInterest, id: number }) {
    const [followAndState, setFollowAndState] = useState({ followed: false, state: true });
    const [showNewPost, setShowNewPost] = useState(false);

    if (followAndState.state) {
        axios.default.post(`http://localhost:7001/api/user/intsinfo/${getCurrentUser()}/has/${props.id}`).then((res) => {
            setFollowAndState({ followed: res.data, state: false });
        });
    }


    return (
        <div className="absolute w-3/5 bottom-5 left-0 right-0 m-auto top-6 rounded-md border-2 bg-slate-200 dark:bg-stone-800 px-4 pt-5">
            <div className="absolute flex flex-col top-4 bottom-4 left-0 right-0 m-auto">
                <div className="relative p-2 mx-10 text-start flex">
                    <img src={props.intInfo.icon} className="rounded-full h-20 w-20 object-cover border-4 border-black dark:border-slate-100 overflow-hidden " />
                    <div className="flex flex-col mx-6 py-1">
                        <span className="text-5xl">{props.intInfo.name}</span>
                        <span className="">{props.intInfo.points}🔥</span>
                    </div>
                    <button className="absolute right-0 top-0 bottom-0 h-fit py-4 my-auto text-3xl mx-4 px-6 bg-slate-400 dark:bg-slate-700 rounded-md" onClick={() => {
                        axios.default.post(`http://localhost:7001/api/user/intsinfo/${getCurrentUser()}/${followAndState.followed ? 'remove' : 'add'}/${props.id}`);
                        setFollowAndState({ followed: !followAndState.followed, state: false });
                    }}
                    >{
                            followAndState.followed ? "Unfollow" : "Follow"
                        }</button>
                </div>
                <div className="relative w-full h-full px-20 my-4">
                    <div className="relative w-full h-full">
                        <div className="absolute left-0 right-0 bottom-0 top-0 m-auto">
                            {!showNewPost ? <CardsContainer type="post" domain="post" datakind={`ints/${props.id}`} singleCount={5} /> : <></>}
                            {showNewPost ? <CardsContainer type="post" domain="post" datakind={`ints/${props.id}`} singleCount={5} /> : <></>}
                        </div>
                    </div>
                </div>
                {
                    showNewPost ? <div className="relative bottom-0 w-full py-2 px-8">
                        <PostCreation hideCallBack={() => setShowNewPost(false)} url={`create?uid=${getCurrentUser()}&iid=${props.id}`} canUploadImage={true} />
                    </div> : <></>

                }
            </div>
            {
                followAndState.followed ? <button className="absolute bottom-4 right-2 m-2 px-4 py-1.5 font-mono text-white bg-indigo-600 hover:bg-indigo-900 text-4xl rounded-full" onClick={() => setShowNewPost(true)}>+</button> : <></>
            }

        </div>
    );
}