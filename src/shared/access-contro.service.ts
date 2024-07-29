import { Injectable } from '@nestjs/common'
import { Roles } from 'src/enums/roles.enum'

interface IsAuthorizedParams {
    currentRole: Roles
    requiredRole: Roles
}

@Injectable()
export class AccessContorlService {
    private hierarchies: Array<Map<string, number>> = []
    private priority: number = 1

    constructor() {
        this.buildRoles([Roles.USER, Roles.ADMIN])
        this.buildRoles([Roles.MODERATOR, Roles.ADMIN])
    }

    /**
     * The buildRoles method allows for creating a role hierarchy between specified set of roles.
     * Roles have to be specified from least privileged user to the most priviliged one
     * @param roles Array that contains list of roles
     */
    private buildRoles(roles: Roles[]) {
        const hierarchy: Map<string, number> = new Map()

        roles.forEach((role) => {
            hierarchy.set(role, this.priority)
            this.priority++
        })

        this.hierarchies.push(hierarchy)
    }

    public isAuthorized({ currentRole, requiredRole }: IsAuthorizedParams) {
        for (let hierarchy of this.hierarchies) {
            const priority = hierarchy.get(currentRole)
            const requiredPriority = hierarchy.get(requiredRole)
            if (priority && requiredPriority && priority >= requiredPriority) {
                return true
            }
        }

        return false
    }
}