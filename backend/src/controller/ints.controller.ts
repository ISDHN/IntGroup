import { Controller, Inject, Post, Param, Query, File, Fields } from "@midwayjs/core";
import { IntsService } from "../service/ints.service";


@Controller("/api/ints")
export class IntsController {

    @Inject()
    intsService: IntsService;

    @Post("/info/:iid")
    async getInfo(@Param('iid') iid: number) {
        return this.intsService.getInfo(iid)
    }

    @Post("/all")
    async getAll(@Query('start') start: number, @Query('end') end: number) {
        return this.intsService.getAll(start, end);
    }

    @Post("/create")
    async create(@File() files, @Fields() fields) {
        return this.intsService.create(files.data, fields.name);
    }
}