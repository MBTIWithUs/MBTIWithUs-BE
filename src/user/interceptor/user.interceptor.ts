import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { UserService } from "../user.service";

@Injectable()
export class UserInterceptor implements NestInterceptor {

    constructor(
        private readonly userService: UserService
    ) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle()
            .pipe(map(data => this.toNickname(data)));
    }

    async toNickname(obj: Object) {
        let includes: Object = {};

        includes['targetId'] = 'target_nickname';
        includes['writerId'] = 'writer_nickname';
        includes['target_id'] = 'target_nickname';
        includes['writer_id'] = 'writer_nickname';

        let result = await this.toNicknameDP(obj, {}, includes);
        return result;
    }

    async toNicknameDP(obj: Object, mem: Object, includes: Object) {
        for (var key in obj) {
            if (obj[key] instanceof Object) await this.toNicknameDP(obj[key], mem, includes);
            if (!includes.hasOwnProperty(key)) continue;

            let userId = obj[key];
            if (!Boolean(mem[userId])) {
                try {
                    let nickname = (await this.userService.findOne(userId)).nickname;
                    mem[userId] = Boolean(nickname)? nickname: "Unknown";
                } catch (error) {
                    mem[userId] = 'Unknown';
                }
            }

            delete obj[key];
            obj[includes[key]] = mem[userId];
        }

        return obj;
    }
}