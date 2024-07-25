import * as axios from "axios";
import { useState } from "react";
import { InterestInfo } from "./InterestInfo";
import { setMessageBox } from "../App";

export function InterestCard(props: { id: number }) {
    const [intInfo, setIntInfo] = useState({ int: { name: "", icon: "", points: 0 }, state: true })
    if (intInfo.state) {
        axios.default.post(`http://localhost:7001/api/ints/info/${props.id}`).then((res) => {
            setIntInfo({ int: res.data, state: false })
        })
    }
    return (
        <>
            <div className="w-full">
                <div className="relative rounded-md bg-slate-200 dark:bg-gray-800 m-2 p-4 text-start">
                    <img src={
                        intInfo.int.icon
                    } className="rounded-full h-12 w-12 object-cover inline border-4 border-black dark:border-slate-100" />
                    <span className="text-2xl m-2 text-center">{intInfo.int.name}</span>
                    <button className="absolute right-0  bg-transparent" onClick={() => setMessageBox(<InterestInfo intInfo={intInfo.int} id={props.id} />, true)}><span className="font-bold text-4xl m-4 pr-4 text-center">&gt;</span></button>
                </div></div>
        </>
    )
}