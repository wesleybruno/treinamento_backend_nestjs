import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class BraiaGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) { }


    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

        const isPublic = this.reflector.get<boolean>(
            'isPublic',
            context.getHandler()
        );

        if (isPublic) {
            return true;
        }

        const { headers } = context.switchToHttp().getRequest();
        if (!headers)
            throw new UnauthorizedException()

        const authHeader = headers['authorization']
        if (!authHeader)
            throw new UnauthorizedException()

        const pass = canPass(authHeader)

        if (!pass)
            throw new UnauthorizedException()

        return true;

    }
}


function canPass(value: string): boolean {
    const start = startValues(value);
    if (!start)
        return false;

    const base64 = isBase64(value);
    if (!base64)
        return false;

    const contains = containsId(value);
    if (!contains)
        return false;


    return true;
}

function startValues(value: string): boolean {
    return value.startsWith('Braia ');
}

const base64Regex = /[A-Za-z0-9+/=]/;

function isBase64(value: string): boolean {
    return base64Regex.test(value)
}


function containsId(value: string): boolean {
    try {
        const encodedValue = value.split(' ')[1];
        const decodedValue = Buffer.from(encodedValue, 'base64');
        const str = decodedValue.toString('utf-8');

        const parsed = JSON.parse(str);

        const id = parsed['id'];

        if (!id)
            return false;

        return true;
    } catch (error) {
        return false;
    }

}