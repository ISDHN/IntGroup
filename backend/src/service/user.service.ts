import { Inject, Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { ILoginInfo, IUser } from '../interface';
import * as fs from "fs"
import { IntsService } from './ints.service';
import { PostService } from './post.service';

@Provide()
@Scope(ScopeEnum.Singleton)
export class UserService {
    usersPassword: { [name: string]: { password: string, id: number } } = {};
    userInfos: IUser[] = [];

    @Inject()
    intservice: IntsService

    @Inject()
    postservice: PostService

    constructor() {
        const userdatas = JSON.parse(fs.readFileSync('./data/users.json').toString())
        this.usersPassword = userdatas.pw;
        this.userInfos = userdatas.inf;
    }

    private async save() {
        fs.writeFile('./data/users.json', JSON.stringify({ pw: this.usersPassword, inf: this.userInfos }), () => { })
    }

    async login(info: ILoginInfo): Promise<number> {
        if (this.usersPassword[info.username] && this.usersPassword[info.username].password === info.password) {
            return this.usersPassword[info.username].id;
        }
        return -1
    }

    async register(info: ILoginInfo): Promise<boolean> {
        if (this.usersPassword[info.username]) {
            return false;
        }

        const id = this.userInfos.length;
        this.usersPassword[info.username] = { password: info.password, id: id };

        this.userInfos[id] = {
            basic: {
                username: info.username,
                avatar: ''
            },
            ints: [],
            likes: []
        }
        this.save()
        return true
    }

    async getInfo(uid: number) {
        if (uid === -1) {
            return ''
        }
        return this.userInfos[uid].basic
    }

    async getInterests(uid: number, start: number, end: number) {
        if (uid === -1) {
            return []
        }
        if (start >= this.userInfos[uid].ints.length) {
            return []
        }
        if (end > this.userInfos[uid].ints.length) {
            return this.userInfos[uid].ints.slice(start)
        }
        return this.userInfos[uid].ints.slice(start, end)
    }

    async setAvatar(uid: number, avatar: string) {
        if (uid === -1) {
            return
        }
        const savePlace = `data/imgs/${this.userInfos[uid].basic.username}_avatar`
        fs.copyFileSync(avatar, savePlace)
        this.userInfos[uid].basic.avatar = `http://localhost:7001/${savePlace}?tempid=${Math.random()}`
        this.save()
        return `${this.userInfos[uid].basic.avatar}`
    }

    async hasInterest(uid: number, intid: number) {
        if (uid === -1) {
            return false
        }
        return this.userInfos[uid].ints.includes(intid)
    }

    async addInterest(uid: number, intid: number) {
        if (uid === -1) {
            return
        }
        if (this.userInfos[uid].ints.includes(intid)) {
            return
        }
        this.userInfos[uid].ints.push(intid)
        this.intservice.addPoint(intid)
        this.save()
    }

    async removeInterest(uid: number, intid: number) {
        if (uid === -1) {
            return
        }
        if (!this.userInfos[uid].ints.includes(intid)) {
            return
        }
        this.userInfos[uid].ints = this.userInfos[uid].ints.filter((id) => id !== intid)
        this.save()
    }

    async haslikedPost(uid: number, pid: number) {
        if (uid === -1) {
            return
        }
        if (this.userInfos[uid].likes.includes(pid)) {
            return true
        }
        return false
    }

    async unlikePost(uid: number, pid: number) {
        if (uid === -1) {
            return
        }
        if (!this.userInfos[uid].likes.includes(pid)) {
            return
        }
        this.postservice.unlikePost(pid)
        this.userInfos[uid].likes = this.userInfos[uid].likes.filter((id) => id !== pid)
        this.save()
    }

    async likePost(uid: number, pid: number) {
        if (uid === -1) {
            return
        }
        if (this.userInfos[uid].likes.includes(pid)) {
            return
        }
        this.userInfos[uid].likes.push(pid)
        this.postservice.likePost(pid)
        this.save()
    }

    async getLikes(uid: number, start: number, end: number) {
        if (uid === -1) {
            return []
        }
        if (start >= this.userInfos[uid].likes.length) {
            return []
        }
        if (end > this.userInfos[uid].likes.length) {
            return this.userInfos[uid].likes.slice(start)
        }
        return this.userInfos[uid].likes.slice(start, end)
    }
}

