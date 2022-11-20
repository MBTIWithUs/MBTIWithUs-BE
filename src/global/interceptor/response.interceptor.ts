import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle()
            .pipe(map(data => this.removeUpperCase(data)))
            .pipe(map(data => this.removeSecured(data)))
        ;
    }

    removeSecured(obj: Object) {
        let includes = new Set([
            'social_id',
            'provider',
            'refresh_token',
            'target_deleted_at',
            'writer_deleted_at',
            'left_answer_type',
            'right_answer_type',
            'deleted_at',
        ]);

        for (var key in obj) {
            if (obj[key] instanceof Object) {
                this.removeSecured(obj[key]);
                continue;
            }
            if (!includes.has(key)) continue;

            delete obj[key];
        }

        return obj;
    }

    removeUpperCase(obj: Object) {
        for (var key in obj) {
            if (obj[key] instanceof Object) this.removeUpperCase(obj[key]);
            if (!this.hasUpperCase(key)) continue;

            let value = obj[key];
            delete obj[key];
            let processedKey = this.processUpperCase(key);
            obj[processedKey] = value;
        }

        return obj;
    }

    hasUpperCase(str: string): boolean {
        return (new RegExp('[A-Z]+')).test(str);
    }

    processUpperCase(str: string): string {
        let result = str;
        let replaced = [];
        for (let i = 0; i < 26; i++) {
            replaced.push(String.fromCharCode(i + 'A'.charCodeAt(0)));
        }
        for (let r of replaced) {
            let regex = new RegExp(r, 'g');
            result = result.replace(regex, "_" + r.toLowerCase());
        }

        return result;
    }
}