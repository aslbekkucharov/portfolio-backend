import { SetMetadata } from "@nestjs/common"
import { Roles as PossibleRoles } from "src/enums/roles.enum"

export const AllowedRoles = (...roles: PossibleRoles[]) => SetMetadata('roles', roles)