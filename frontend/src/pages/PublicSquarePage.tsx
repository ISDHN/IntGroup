import { useState } from "react";
import { CardsContainer } from "../components/CardsContainer"
import RefreshIcon from "../assets/Refresh.svg"

const client = new WebSocket("ws://localhost:7001/ws/notify");

export function PublicSquarePage() {

    const [hasNew, setHasNew] = useState(false);

    client.onmessage = (message) => {
        if (message.data == 'NEWPOST') {
            setHasNew(true);
        }
    }

    return (
        <>
            <div className="left-0 right-0 m-auto h-auto bottom-0 w-3/5 pb-8 absolute top-20">
                <div className="relative h-full">
                    <CardsContainer type="post" domain="post" datakind="all" singleCount={12} />
                </div>
            </div>
            {
                hasNew ?
                    <button className="absolute bottom-5 left-5 m-4 p-4 font-mono text-white bg-red-600 hover:bg-pink-900 text-4xl rounded-full" onClick={() => {
                        window.location.reload();
                    }}><img src={RefreshIcon} className="h-8 w-8" /></button> : <></>
            }

        </>
    )

}