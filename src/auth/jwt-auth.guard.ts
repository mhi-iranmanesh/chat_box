import { CanActivate, ConsoleLogger, Injectable } from '@nestjs/common';
import { JwtModule, JwtSecretRequestType } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class WsGuard implements CanActivate {

  constructor(private userService: UsersService) {
  }

  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    const bearerToken = context.args[0].handshake.headers.authorization.split(' ')[1];
    try {

    //   const decoded = jwt.verify(bearerToken, jwtConstants.secret) as any; // FIXME verfify username with token
      return new Promise((resolve, reject) => {
        return this.userService.findOne('mohammad').then(user => { // FIXME get username 
          if (user) {
            resolve(user);
          } else {
            reject(false);
          }
        });

      });
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
}