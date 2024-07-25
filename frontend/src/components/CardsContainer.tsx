import { useState } from 'react'
import { PostCard } from './Postcard'
import * as axios from "axios"
import { InterestCard } from './InterestCard'
import { CommentsCard } from './CommentsCard'

export function CardsContainer(props: { type: string, domain: string, datakind: string, singleCount: number }) {
    const [infos, setInfos] = useState([])
    const [needLoad, setNeedLoad] = useState(true)
    const [start, setStart] = useState(0)
    const [canNext, setCanNext] = useState(true)


    if (needLoad) {
        axios.default.post(`http://localhost:7001/api/${props.domain}/${props.datakind}?start=${start}&end=${start + props.singleCount}`).then((res) => {
            setCanNext(res.data.length >= props.singleCount)
            setNeedLoad(false)
            setInfos(res.data)
        })
    }


    return (
        <>
            <div className='relative overflow-auto w-full h-full'>
                <div className=" text-center " >
                    {
                        infos.map((info) => {
                            switch (props.type) {
                                case 'post':
                                    return <PostCard key={-info} id={info} />
                                case 'ints':
                                    return <InterestCard key={info} id={info} />
                                case 'comment':
                                    return <CommentsCard key={info} id={info} />
                            }

                        })
                    }
                </div>
                {
                    infos.length > 0 ?
                        <>
                            <div className="  left-0 right-0 mx-auto my-4 w-fit z-0">
                                <button className="text-4xl rounded-md px-3 py-2 border-4 text-center mr-2" onClick={
                                    () => {
                                        if (start > 0) {
                                            setStart(start - props.singleCount)
                                            setNeedLoad(true)
                                        }

                                    }
                                }>&lt;</button>
                                <button className="text-4xl rounded-md px-3 py-2 border-4 text-center ml-2" onClick={
                                    () => {
                                        if (canNext) {
                                            setStart(start + props.singleCount)
                                            setNeedLoad(true)
                                        }
                                    }
                                }>&gt;</button>
                            </div>
                            <br />
                        </> : <></>
                }

            </div>
        </>
    )

}