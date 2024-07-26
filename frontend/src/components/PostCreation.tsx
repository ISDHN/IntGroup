import * as axios from "axios";
import { useState } from "react";
import { UniqueConcat } from "../helper";

export function PostCreation(props: { hideCallBack: () => void, url: string, canUploadImage: boolean }) {
    const [images, setImages] = useState<File[]>([]);

    return (
        <>
            <div className="rounded-md border-2  dark:border-slate-100 border-gray-700 w-full h-32 flex overflow-hidden">
                <textarea id="postContent" className="w-full h-full p-2 resize-none dark:bg-slate-700 bg-gray-300 dark:border-slate-100 border-gray-700 border-r-2 text-wrap" />
                {props.canUploadImage ? <>
                    <label htmlFor="uploadPostImage" className="w-1/6 text-6xl text-center pt-2">
                        <p>+</p>
                        <p className="text-center opacity-50 text-sm mt-2 ">Upload Image</p>
                    </label>
                    <input id="uploadPostImage" className="hidden" multiple type="file" accept="image/apng,image/gif,image/png, image/jpeg, image/svg+xml,image/webp" onChange={(event) => {
                        if (event.target.files) {
                            setImages(UniqueConcat(images, Array.from(event.target.files)));
                        }
                    }} />
                </> : <></>}

            </div>
            <div className="overflow-auto">
                <div className="flex">
                    {images.map((image, index) => {
                        return (
                            <div key={index} className="w-12 h-12 m-2 relative">
                                <button className="absolute right-0 top-0 text-red-600 font-mono text-4xl w-full h-full opacity-0 hover:opacity-100" onClick={() => {
                                    setImages(images.filter((_, i) => i != index));
                                }}>×</button>
                                <img src={URL.createObjectURL(image)} className="h-full w-full object-cover" />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="mt-4 flex justify-between justify-items-center h-12 w-full">
                <button className="w-2/5 bg-red-500  rounded-md" onClick={props.hideCallBack}>Cancel</button>
                <button className="w-2/5  bg-blue-500  rounded-md" onClick={() => {
                    const data = new FormData();
                    images.forEach((image) => {
                        data.append("file", image);
                    });
                    data.append("content", (document.getElementById("postContent") as HTMLTextAreaElement).value);
                    axios.default.post(`http://localhost:7001/api/post/${props.url}`, data, {
                        headers: {
                            'Content-Type': 'x-www-form-urlencoded',
                        }
                    }).then(() => {
                        props.hideCallBack();
                    });
                }}>Post</button>

            </div>
        </>
    )
}