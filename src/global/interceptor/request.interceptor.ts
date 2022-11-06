import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class RequestInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        let request: Request = context.switchToHttp().getRequest();
        this.removeUnderBar(request.body);
        return next.handle();
    }

    removeUnderBar(obj: Object) {
        for (var key in obj) {
            if (obj[key] instanceof Object) this.removeUnderBar(obj[key]);
            if (!this.hasUnderBar(key)) continue;

            let value = obj[key];
            delete obj[key];
            let processedKey = this.processUnderBar(key);
            obj[processedKey] = value;
        }

        return obj;
    }

    hasUnderBar(str: string): boolean {
        return (new RegExp('_')).test(str);
    }

    processUnderBar(str: string): string {
        let result = str;
        let replaced = [];
        for (let i = 0; i < 26; i++) {
            replaced.push(String.fromCharCode(i + 'a'.charCodeAt(0)));
        }
        for (let r of replaced) {
            let regex = new RegExp("_" + r, 'g');
            result = result.replace(regex, r.toUpperCase());
        }

        return result;
    }
}