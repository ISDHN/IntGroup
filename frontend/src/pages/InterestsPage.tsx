import { Navigator } from "../components/Navigator"
import { CardsContainer } from "../components/CardsContainer";
import { getCurrentUser } from "../CurrentUser";
import { useState } from "react";
import { IntType } from "../enum";
import { setMessageBox } from "../App";
import { InterestCreation } from "../components/InterestCreation";

export function InterestsPage() {
    const [intType, setIntType] = useState<IntType>(IntType.My)

    return (
        <>
            <div className="absolute m-auto left-0 right-0 top-16 flex flex-col bottom-12 px-6 w-full">
                <Navigator namesAndCallback={[
                    {
                        name: 'My Interests',
                        callback: () => setIntType(IntType.My)
                    },
                    {
                        name: 'All Interests',
                        callback: () => setIntType(IntType.All)
                    }
                ]} />
                <div className="relative w-full h-full px-20 pt-2 pb-4 ">
                    <div className="relative w-full h-full">
                        <div className="absolute w-full h-full left-0 right-0 mx-auto">
                            {(() => {
                                switch (intType) {
                                    case IntType.My:
                                        return <CardsContainer key={IntType.My} type="ints" domain="user" datakind={`ints/${getCurrentUser()}`} singleCount={12} />
                                    case IntType.All:
                                        return <CardsContainer key={IntType.All} type="ints" domain="ints" datakind={`all`} singleCount={12} />
                                }
                            })()}
                        </div>
                    </div>
                </div>
            </div>
            <button className="absolute bottom-5 left-5 m-4 px-4 py-1.5 font-mono text-white bg-indigo-600 hover:bg-indigo-900 text-4xl rounded-full" onClick={() => {
                setMessageBox(<InterestCreation />, true)
            }}>+</button>
        </>
    )
}