import { CanActivate, Injectable } from '@nestjs/common';

@Injectable()
export class WsGuard implements CanActivate {
  canActivate(context: any): any {
    return context.args[0].handshake.auth.token;
    // try {
    //   const decoded = jwt.verify(bearerToken, jwtConstants.secret) as any;
    //   return new Promise((resolve, reject) => {
    //     return this.userService
    //       .findByUsername(decoded.username)
    //       .then((user) => {
    //         if (user) {
    //           resolve(user);
    //         } else {
    //           reject(false);
    //         }
    //       });
    //   });
    // } catch (ex) {
    //   console.log(ex);
    //   return false;
    // }
  }
}
