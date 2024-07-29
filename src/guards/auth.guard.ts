import { JwtService } from "@nestjs/jwt"
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const authorizationValue = request.headers.authorization
        const token = authorizationValue?.split(' ')[1]

        if (!token) {
            throw new UnauthorizedException('Unauthorized')
        }

        try {
            const tokenPayload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('JWT_SECRET')
            })

            request.user = {
                id: tokenPayload.sub,
                username: tokenPayload.username
            }

            return true

        } catch (error) {
            console.log(error)
            throw new UnauthorizedException('Invalid token')
        }
    }
}