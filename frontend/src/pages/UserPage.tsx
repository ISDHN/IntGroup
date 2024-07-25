import { useState } from 'react'
import { getCurrentUser } from '../CurrentUser'
import { Login } from '../components/Login'
import { Register } from '../components/Register'
import { Profile } from '../components/Profile'

enum UserPageState {
    Register,
    Logining,
    Logined
}

export function UserPage() {
    const [state, setState] = useState(getCurrentUser() == -1 ? UserPageState.Logining : UserPageState.Logined)

    return (
        <>
            {
                ((curState: UserPageState) => {
                    switch (curState) {
                        case UserPageState.Logining:
                            return <Login onClk={() => setState(UserPageState.Register)} />
                        case UserPageState.Register:
                            return <Register onClk={() => setState(UserPageState.Logining)} />
                        case UserPageState.Logined:
                            return <Profile />
                    }
                })(state)
            }
        </>
    )
}