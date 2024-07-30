import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { Roles } from "src/enums/roles.enum"

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext) {
        const requiredRoles = this.reflector.get<Roles[]>('roles', context.getHandler())

        if (!requiredRoles) {
            return true
        }

        const request = context.switchToHttp().getRequest()
        const user = request.user
        return requiredRoles.includes(user.role)
    }
}