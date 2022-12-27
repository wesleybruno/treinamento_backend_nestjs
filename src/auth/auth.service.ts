import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const users = [
    {
        userId: 1,
        username: 'john',
        password: 'changeme',
    },
    {
        userId: 2,
        username: 'maria',
        password: 'guess',
    },
];

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {

        const user = users.filter((value) => value.username == username && value.password == pass);

        return user;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
