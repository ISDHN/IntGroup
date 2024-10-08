import { App, Provide, Scope, ScopeEnum } from "@midwayjs/core";
import { IInterest } from "../interface";
import * as fs from 'fs'
import { Application } from "@midwayjs/ws";

@Provide()
@Scope(ScopeEnum.Singleton)
export class IntsService {
    ints: IInterest[] = [];
    ids: number[] = [];

    @App('webSocket')
    wsApp: Application;

    constructor() {
        this.ints = JSON.parse(fs.readFileSync('./data/interests.json').toString())
        this.ids = Array.from(this.ints.keys())
    }

    private async save() {
        fs.writeFileSync('./data/interests.json', JSON.stringify(this.ints))
    }

    async getInfo(iid: number) {
        return this.ints[iid]
    }
    async getAll(start: number, end: number) {
        if (start >= this.ints.length) {
            return []
        }
        if (end > this.ints.length) {
            return this.ids.slice(start)
        }
        return this.ids.slice(start, end)
    }

    async create(icon: string, name: string) {
        if (this.ints.find((int) => int.name === name)) {
            return -1
        }
        const unixLikepath = icon.replaceAll("\\", '/')
        const savePlace = `data/imgs/ints_${name}_${unixLikepath.substring(unixLikepath.lastIndexOf('/') + 1)}`
        fs.copyFileSync(icon, savePlace)
        this.ints.push({ icon: `http://localhost:7001/${savePlace}`, name: name, people: 1, points: 1 })
        this.ids.push(this.ints.length - 1)
        this.save()

        this.wsApp.clients.forEach((client) => {
            client.send('NEWINT')
        })

        return this.ints.length - 1
    }

    async addPoint(iid: number) {
        if (this.ints[iid].points === undefined) {
            this.ints[iid].points = 0
        }
        this.ints[iid].points += 1
        this.save()
    }
}