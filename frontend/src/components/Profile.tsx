import { getCurrentUser, getCurrentUserInfo, setCurrentUserInfo } from "../CurrentUser";
import cookie from 'react-cookies'
import { CardsContainer } from "./CardsContainer";
import * as axios from "axios";
import { PostType } from "../enum";
import { useState } from "react";
import { Navigator } from "./Navigator";

export function Profile() {

    const [postType, setPostType] = useState<PostType>(PostType.Written)
    const [avatar, setAvatar] = useState<string>(getCurrentUserInfo().avatar)

    return (
        <>
            <div className="left-0 right-0 absolute top-16 flex bottom-4 h-auto w-full">
                <div className="w-5/12 h-full px-10 relative">
                    <div className="relative  h-full w-full">
                        <div className="rounded-2xl border-2 w-full absolute bottom-4 top-6 bg-slate-100 dark:bg-zinc-800">
                            <div className="w-full h-2/3 text-center relative">
                                <div className="relative w-full h-full">
                                    <img className="max-h-full w-full object-contain p-4 absolute left-0 right-0 bottom-0 top-0 m-auto" src={avatar} />
                                </div>
                            </div>
                            <div className="  text-center my-6 text-2xl">
                                <label htmlFor="uploadAvatar" className="rounded bg-slate-200 dark:bg-slate-700 px-4 py-2">Change Avatar</label>
                                <input id="uploadAvatar" type="file" className="hidden" accept="image/apng,image/gif,image/png, image/jpeg, image/svg+xml,image/webp" onChange={(event) => {
                                    if (event.target.files && event.target.files.length > 0) {
                                        const formdata = new FormData()
                                        formdata.append('file', event.target.files![0])
                                        axios.default.post(`http://localhost:7001/api/user/setAvatar/${getCurrentUser()}`, formdata, {
                                            headers: {
                                                'Content-Type': 'x-www-form-urlencoded',
                                            },
                                        }).then((res) => {
                                            setAvatar(res.data)
                                            setCurrentUserInfo({ ...getCurrentUserInfo(), avatar: res.data })
                                        })
                                    }
                                    event.target.value = ''
                                    event.target.files = null

                                }
                                } />
                            </div>
                            <div className="  text-center my-8 text-2xl" >
                                <button className="rounded bg-red-500 dark:bg-red-900 px-4 py-2" onClick={() => {
                                    cookie.remove("currentUser")
                                    window.location.reload()
                                }}>Log Out</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 w-full h-full flex flex-col">
                    <Navigator namesAndCallback={[
                        {
                            name: 'Written Post',
                            callback: () => setPostType(PostType.Written)
                        },
                        {
                            name: 'Liked Post',
                            callback: () => setPostType(PostType.Liked)
                        }
                    ]} />
                    <div className="relative w-full h-full">
                        <div className="absolute bottom-2 left-0 top-3 right-4">
                            {(() => {
                                switch (postType) {
                                    case PostType.Written:
                                        return <CardsContainer key={PostType.Written} type="post" domain="post" datakind={`user/${getCurrentUser()}`} singleCount={12} />
                                    case PostType.Liked:
                                        return <CardsContainer key={PostType.Liked} type="post" domain="user" datakind={`likes/${getCurrentUser()}`} singleCount={12} />
                                }
                            })()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}