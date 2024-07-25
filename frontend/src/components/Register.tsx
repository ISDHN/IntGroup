import * as axios from "axios"


export function Register(props: any) {
    let username = ''
    let password = ''
    let passwordAgn = ''
    return (<div className="absolute left-0 right-0 m-auto top-40 " >
        <p className="text-2xl text-center m-4">Register</p>
        <div className="text-center m-2">
            <input type="text" placeholder="Username" onChange={(event) => username = event.target.value} className="border-2 rounded-md border-neutral-600 text-center text-2xl " />
        </div>
        <div className="text-center m-2">
            <input type="password" placeholder="Password" onChange={(event) => password = event.target.value} className="border-2 rounded-md border-neutral-600 text-center text-2xl" />
        </div>
        <div className="text-center m-2">
            <input type="password" placeholder="Password again" onChange={(event) => passwordAgn = event.target.value} className="border-2 rounded-md border-neutral-600 text-center text-2xl" />
        </div>
        <div className="text-center m-5">
            <button className="border-2 rounded-md border-neutral-600 text-center px-4 py-1 text-xl hover:border-blue-400 active:bg-blue-600 active:text-white transition-colors" onClick={() => {
                if (username == '' || password == '') {
                    alert('Please input username and password.')
                    return
                }
                if (password != passwordAgn) {
                    alert('The two passwords are not the same.')
                }
                axios.default.post('http://localhost:7001/api/user/register', { username: username, password: password }).then((res) => {
                    if (res.data == false) {
                        alert('Login failed! Either username or password is incorrect.')
                    } else {
                        props.onClk()
                    }
                })

            }}>Register</button>
        </div>
        <a onClick={props.onClk} href="#"><p className="text-sm text-center">Already had a account? Login Now!</p></a>
    </div>)
}