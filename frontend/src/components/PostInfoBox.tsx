import { useState } from "react"
import defaultAvatar from "../assets/User.svg"
import * as axios from "axios"

export function PostInfoBox(props: { id: number, date: string }) {
    const [userInfo, setUserInfo] = useState({
        username: '',
        avatar: ''
    })

    if (props.id != -1 && userInfo.username == '') {
        axios.default.post(`http://localhost:7001/api/user/info/${props.id}`).then((res) => {
            setUserInfo(res.data)
        })
    }
    return (
        <div className="h-auto text-left relative flex">
            <img src={userInfo.avatar == '' ? defaultAvatar : userInfo.avatar} className="rounded-full left-0 h-12 w-12 object-cover border-4 border-stone-900 dark:border-slate-200 overflow-hidden " />
            <span className="mx-4 align-middle text-xl left-4">{userInfo.username}</span>
            <span className="absolute right-0 text-xs mr-4">{props.date}</span>
        </div>
    )
}
