import { CardsContainer } from "../components/CardsContainer"
export function PublicSquarePage() {


    return (
        <>
            <div className="left-0 right-0 m-auto h-auto bottom-0 w-3/5 pb-8 absolute top-20">
                <div className="relative h-full">
                    <CardsContainer type="post" domain="post" datakind="all" singleCount={12} />
                </div>
            </div>
        </>
    )

}