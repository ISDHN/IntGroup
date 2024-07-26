export function Navigator(props: { namesAndCallback: { name: string, callback: () => void }[] }) {

    return (
        <div className="relative my-2" >
            {props.namesAndCallback.map((nameAndCallback: { name: string, callback: () => void }, index) => {
                return (
                    <button key={index} className="menuItem mx-1 self-stretch bg-transparent" onClick={nameAndCallback.callback}>
                        {
                            nameAndCallback.name
                        }
                    </button>
                )
            })
            }
        </div>
    )
}