import * as axios from "axios"
import { useState } from "react"
import { setMessageBox } from "../App"
import { getCurrentUser } from "../CurrentUser"

export function InterestCreation() {
    const [intImageAndFile, setIntImageAndFile] = useState<{ intImage: string, intFile: File | null }>({ intImage: '', intFile: null })

    return (
        <>
            <div className="absolute left-0 right-0 top-0 bottom-0 m-auto w-3/5 h-fit">
                <div className="bg-slate-200 dark:bg-gray-800 rounded-md p-4 m-4 ">
                    <div className="text-4xl text-start m-4">Create Interest</div>
                    <div className="flex p-2">
                        <label htmlFor="uploadIntIcon">
                            <div className="relative w-[5.75rem] h-fit">
                                <div className="rounded-full bg-gray-200 px-4 pb-3 dark:bg-slate-700 hover:dark:bg-gray-800 border-4 border-white  h-fit">
                                    <p className="text-center text-5xl leading-6 mt-2 ">+</p>
                                    <p className="text-center opacity-50 text-xs mt-2 ">Choose Icon</p>
                                </div>
                                <img className="my-4 left-0 w-full" src={intImageAndFile.intImage} />
                            </div>
                        </label>
                        <input id="uploadIntIcon" type="file" accept="image/apng,image/gif,image/png, image/jpeg, image/svg+xml,image/webp" className="hidden" onChange={(event) => {
                            if (event.target.files && event.target.files.length > 0) {
                                setIntImageAndFile({ intImage: URL.createObjectURL(event.target.files[0]), intFile: event.target.files![0] })
                            }
                        }} />
                        <input id="intsName" type="text" placeholder="Name: " className="rounded-md p-2 mx-3 w-full" />
                    </div>
                    <button className="block bg-indigo-600 dark:bg-indigo-900 text-white text-2xl w-full m-2 p-2 rounded-md" onClick={() => {
                        const intName = (document.getElementById('intsName') as HTMLInputElement).value
                        if (intName == '' || intImageAndFile.intFile == null) {
                            alert('Please input name and image.')
                            return
                        }
                        const formData = new FormData();
                        formData.append('file', intImageAndFile.intFile);
                        formData.append('name', intName);
                        axios.default.post('http://localhost:7001/api/ints/create', formData, {
                            headers: {
                                'Content-Type': 'x-www-form-urlencoded',
                            },
                        }).then((res) => {
                            if (res.data == -1) {
                                alert('Failed to create interest. The interest with the same name has already existed.')
                                return
                            }
                            axios.default.post(`http://localhost:7001/api/user/intsinfo/${getCurrentUser()}/add/${res.data}`)
                            setMessageBox(<></>, false)
                        })
                    }}>Create</button>
                </div>
            </div>
        </>
    )
}