import { useState } from 'react'
import './output.css'
import { PublicSquarePage } from './pages/PublicSquarePage.tsx'
import { InterestsPage } from './pages/InterestsPage.tsx'
import { UserPage } from './pages/UserPage.tsx'
import { getCurrentUser, getCurrentUserInfo, setCurrentUserInfo } from "./CurrentUser";
import defaultAvatar from "./assets/User.svg"
import * as axios from "axios";
import { PageType } from './enum.ts'
import { Navigator } from './components/Navigator.tsx'

let showFunction: (props: { content: JSX.Element, visible: boolean }) => void = (_: { content: JSX.Element, visible: boolean }) => { };

export function setMessageBox(content: JSX.Element, visible: boolean) {
    showFunction({ content: content, visible: visible });
}

function MessageBox() {
    const [props, setProps] = useState({ content: <></>, visible: false });
    showFunction = setProps;
    return (
        <div style={{ opacity: props.visible ? 1 : 0, zIndex: props.visible ? 50 : 0 }} className="fixed top-0 left-0 w-full bottom-0 h-auto p-4 bg-black/50 dark:bg-slate-700/50">
            <button className="absolute right-5 top-5 bg-red-500 dark:bg-red-900 px-[0.75rem] pb-0.5 font-mono rounded-full text-5xl border-2 align-top" onClick={() => setProps({ content: <></>, visible: false })}>
                ×
            </button>
            {props.content}
        </div>
    )

}

export default () => {
    const [avatar, setAvatar] = useState(defaultAvatar)

    if (getCurrentUser() != -1) {
        axios.default.post(`http://localhost:7001/api/user/info/${getCurrentUser().toString()}`).then((res) => {
            if (res.data.avatar != '') {
                setCurrentUserInfo(res.data)
            } else {
                setCurrentUserInfo({ name: res.data.name, avatar: defaultAvatar })
            }
            setAvatar(getCurrentUserInfo().avatar)
        })
    }
    const [curPage, setCurPage] = useState(PageType.PubSqr);
    return (
        <>
            <MessageBox />
            <div className="fixed top-0 left-0 right-0 max-h-16 bg-slate-50 dark:bg-neutral-800 z-40">
                <div className='flex items-center'>
                    <label className="mx-6  font-bold text-2xl">Cytus iM</label>
                    <Navigator namesAndCallback={[
                        {
                            name: 'Public Square',
                            callback: () => { setCurPage(PageType.PubSqr) }
                        },
                        {
                            name: 'Interests',
                            callback: () => {
                                if (getCurrentUser() == -1) {
                                    alert('Please login first.')
                                    setCurPage(PageType.User)
                                } else {
                                    setCurPage(PageType.Ints)
                                }
                            }
                        }
                    ]} />
                </div>
                <button className='absolute bg-transparent right-0 top-0 bottom-0 p-1 m-1 ' onClick={() => {
                    setCurPage(PageType.User)
                }}>
                    <img src={avatar} className='h-12 w-12 rounded-full object-cover border-4 border-black dark:border-white' />
                </button>
            </div>
            {
                (() => {
                    switch (curPage) {
                        case PageType.PubSqr:
                            return <PublicSquarePage />
                        case PageType.Ints:
                            return <InterestsPage />
                        case PageType.User:
                            return <UserPage />
                    }
                })()
            }
        </>
    )
}