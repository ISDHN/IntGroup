import { Get, Param, Controller } from "@midwayjs/core";
import * as fs from 'fs'
@Controller("/data/imgs")
export class ImgController {

    @Get("/:name")
    async get(@Param('name') name: string) {
        return fs.readFileSync(`./data/imgs/${name}`)
    }
}                       