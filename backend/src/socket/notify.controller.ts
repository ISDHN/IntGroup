import { Inject, OnWSConnection, WSController } from "@midwayjs/core";
import { Context } from "vm";

@WSController('/')
export class NotifyController {

    @Inject()
    ctx: Context;

    @OnWSConnection()
    async onConnection() {
        console.log('connected')
    }
}