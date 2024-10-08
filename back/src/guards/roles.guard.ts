import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Rol } from "../modules/Users/roles.enum";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Rol[]>('roles', [
      context.getHandler(),
      context.getClass()
    ])

    if (!requiredRoles || requiredRoles.length === 0) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (!user || !user.roles) {
      throw new ForbiddenException('No tienes permiso para acceder a esta ruta')
    }

    
    let hasRole = false
    for (const rol of requiredRoles) {
      if (user.roles.includes(rol)) {
        hasRole = true
        break
      }
    }

    if (!hasRole) {
      throw new ForbiddenException('No tienes permiso para acceder a esta ruta')
    }

    return hasRole
  }
}