import { Inject, Controller, Post, Param, Query, Fields, Files } from '@midwayjs/core';
import { PostService } from '../service/post.service';

@Controller("/api/post")
export class PostController {

    @Inject()
    postService: PostService;

    @Post("/all")
    async getAll(@Query('start') start: number, @Query('end') end: number) {
        return this.postService.getPostsOfAll(start, end);
    }

    @Post("/ints/:iid")
    async getPostsOfInterest(@Param('iid') iid: number, @Query('start') start: number, @Query('end') end: number) {
        return this.postService.getPostsOfInterest(iid, start, end);
    }

    @Post("/info/:postID")
    async getPost(@Param('postID') postID: number) {
        return this.postService.getInfo(postID)
    }
    @Post("/user/:uid")
    async getPostsOfUser(@Param('uid') uid: number, @Query('start') start: number, @Query('end') end: number) {
        return this.postService.getPostsOfUser(uid, start, end)
    }

    @Post("/create")
    async createPost(@Files() files, @Fields() fields, @Query('uid') uid: number, @Query('iid') iid: number) {
        return this.postService.createPost(uid, iid, files, fields.content)
    }
    @Post("/comment")
    async commentPost(@Fields() fields, @Query('uid') uid: number, @Query('pid') pid: number) {
        return this.postService.commentPost(uid, pid, fields.content)
    }

    @Post("/forward")
    async forwardPost(@Fields() fields, @Query('uid') uid: number, @Query('pid') pid: number) {
        return this.postService.forwardPost(uid, pid, fields.content)
    }

    @Post("/comments/:pid")
    async getComments(@Param('pid') pid: number, @Query('start') start: number, @Query('end') end: number) {
        return this.postService.getComments(pid, start, end)
    }

    @Post("/getComment/:cid")
    async getComment(@Param('cid') cid: number) {
        return this.postService.getComment(cid)
    }

    @Post("/getLikes/:pid")
    async getLikes(@Param('pid') pid: number) {
        return this.postService.getLikes(pid)
    }
}