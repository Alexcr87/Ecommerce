import { SetMetadata } from "@nestjs/common";
import { Rol } from "../modules/Users/roles.enum";

export const Roles = (...roles:Rol[]) => SetMetadata ('roles', roles)