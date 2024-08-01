import cookie from 'react-cookies'
import { IUserInfo } from './interface';
import defaultAvatar from './assets/User.svg'

let currentUID: number = cookie.load("currentUser") != undefined ? cookie.load("currentUser") : -1;
let currentUserInfo: IUserInfo = { name: '', avatar: defaultAvatar }

export function getCurrentUser() {
    return currentUID
}
export function setCurrentUser(uid: number) {
    currentUID = uid
    cookie.save("currentUser", uid, {})
}

export function getCurrentUserInfo() {
    return currentUserInfo
}

export function setCurrentUserInfo(val: IUserInfo) {
    currentUserInfo = val
}