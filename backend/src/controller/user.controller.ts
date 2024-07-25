import { Inject, Body, Controller, Post, Param, Query, File } from '@midwayjs/core';
import { UserService } from '../service/user.service';
import { ILoginInfo } from '../interface';

@Controller('/api/user')
export class UserController {

    @Inject()
    userService: UserService;

    @Post('/login')
    async login(@Body() request: ILoginInfo) {
        return this.userService.login(request);
    }
    @Post('/register')
    async register(@Body() request: ILoginInfo) {
        return this.userService.register(request);
    }
    @Post('/info/:uid')
    async getInfo(@Param('uid') uid: number) {
        return this.userService.getInfo(uid)
    }

    @Post('/setAvatar/:uid')
    async setAvatar(@Param('uid') uid: number, @File() files) {
        return this.userService.setAvatar(uid, files.data)
    }

    @Post('/ints/:uid')
    async getInterests(@Param('uid') uid: number, @Query('start') start: number, @Query('end') end: number) {
        return this.userService.getInterests(uid, start, end)
    }

    @Post('/intsinfo/:uid/has/:iid')
    async hasInterest(@Param('uid') uid: number, @Param('iid') intid: number) {
        return this.userService.hasInterest(uid, intid)
    }

    @Post('/intsinfo/:uid/add/:iid')
    async addInterest(@Param('uid') uid: number, @Param('iid') intid: number) {
        this.userService.addInterest(uid, intid)
    }

    @Post('/intsinfo/:uid/remove/:iid')
    async removeInterest(@Param('uid') uid: number, @Param('iid') intid: number) {
        this.userService.removeInterest(uid, intid)
    }

    @Post('/likesinfo/:uid/has/:pid')
    async likePost(@Param('uid') uid: number, @Param('pid') pid: number) {
        return this.userService.haslikedPost(uid, pid)
    }

    @Post('/likesinfo/:uid/remove/:pid')
    async unlikePost(@Param('uid') uid: number, @Param('pid') pid: number) {
        this.userService.unlikePost(uid, pid)
    }

    @Post('/likesinfo/:uid/add/:pid')
    async addPost(@Param('uid') uid: number, @Param('pid') pid: number) {
        this.userService.likePost(uid, pid)
    }

    @Post('/likes/:uid')
    async getLikes(@Param('uid') uid: number, @Query('start') start: number, @Query('end') end: number) {
        return this.userService.getLikes(uid, start, end)
    }
}