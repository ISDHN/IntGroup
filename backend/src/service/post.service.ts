import { IComment, IPost } from './../interface';
import { Inject, Provide, Scope, ScopeEnum } from '@midwayjs/core';
import * as fs from 'fs'
import { IntsService } from './ints.service';

@Provide()
@Scope(ScopeEnum.Singleton)
export class PostService {

    posts: IPost[] = [];
    ids: number[] = [];
    comments: IComment[] = [];

    @Inject()
    intservice: IntsService

    constructor() {
        this.posts = JSON.parse(fs.readFileSync('./data/posts.json').toString())
        this.ids = Array.from(this.posts.keys()).reverse()
        this.comments = JSON.parse(fs.readFileSync('./data/comments.json').toString())
    }

    async getPostsOfAll(start: number, end: number) {
        if (start >= this.posts.length) {
            return []
        }
        if (end > this.posts.length) {
            return this.ids.slice(start)
        }
        return this.ids.slice(start, end)
    }

    async getInfo(postID: number) {
        return this.posts[postID]
    }

    async getPostsOfUser(uid: number, start: number, end: number) {
        const pou = this.ids.filter((id) => { return this.posts[id].uid == uid })
        if (start >= pou.length) {
            return []
        }
        if (end > pou.length) {
            return this.ids.slice(start)
        }
        return pou.slice(start, end)
    }

    async getPostsOfInterest(iid: number, start: number, end: number) {
        const poi = this.ids.filter((id) => { return this.posts[id].iid == iid })
        if (start >= poi.length) {
            return []
        }
        if (end > poi.length) {
            return poi.slice(start)
        }
        return poi.slice(start, end)
    }

    async createPost(uid: number, iid: number, images: any, content: any) {
        const now = new Date()
        const post: IPost = {
            uid: uid,
            iid: iid,
            content: content,
            comments: [],
            imgs: [],
            likes: 0,
            date: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
        }
        images.forEach((image: any) => {
            const unixLike = image.data.replaceAll("\\", '/') as string
            const savePlace = `data/imgs/posts_${uid}_${now.getTime()}_${unixLike.substring(unixLike.lastIndexOf('/') + 1)}`
            fs.copyFileSync(image.data, savePlace)
            post.imgs.push(`http://localhost:7001/${savePlace}`)
        })
        this.ids.unshift(this.posts.push(post) - 1)
        this.intservice.addPoint(iid)
        //fs.writeFileSync('./data/posts.json', JSON.stringify(this.posts))
    }

    async commentPost(uid: number, pid: number, content: string) {
        const now = new Date()
        const comment: IComment = {
            uid: uid,
            content: content,
            date: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
        }
        this.posts[pid].comments.push(this.comments.push(comment) - 1)
        this.intservice.addPoint(this.posts[pid].iid)
        //fs.writeFileSync('./data/comments.json', JSON.stringify(this.posts))
    }

    async getComments(pid: number, start: number, end: number) {
        if (start >= this.posts[pid].comments.length) {
            return []
        }
        if (end > this.posts[pid].comments.length) {
            return this.posts[pid].comments.slice(start)
        }
        return this.posts[pid].comments.slice(start, end)
    }

    async getComment(cid: number) {
        return this.comments[cid]
    }

    async likePost(pid: number) {
        this.posts[pid].likes += 1
        this.intservice.addPoint(this.posts[pid].iid)
        //fs.writeFileSync('./data/posts.json', JSON.stringify(this.posts))
    }

    async unlikePost(pid: number) {
        this.posts[pid].likes -= 1
        this.intservice.addPoint(this.posts[pid].iid)
        //fs.writeFileSync('./data/posts.json', JSON.stringify(this.posts))
    }

    async getLikes(pid: number) {
        return this.posts[pid].likes
    }
}