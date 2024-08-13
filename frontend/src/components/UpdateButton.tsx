import { useState } from "react";
import RefreshIcon from "../assets/Refresh.svg"

const client = new WebSocket("ws://localhost:7001/ws/notify");

export function UpdateButton(props: { msg: string }) {

    const [hasNew, setHasNew] = useState(false);

    client.onmessage = (message) => {
        if (message.data == props.msg) {
            setHasNew(true);
        }
    }

    return (
        hasNew ?
            <button className="absolute bottom-5 right-5 m-4 p-4 font-mono text-white bg-red-600 hover:bg-pink-900 text-4xl rounded-full" onClick={() => {
                window.location.reload();
            }}><img src={RefreshIcon} className="h-8 w-8" /></button> : <></>
    )

}