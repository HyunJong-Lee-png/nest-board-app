import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./entity/auth.entity";
import { Repository } from "typeorm";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as config from 'config';

const jwtConfig = config.get('jwt')

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || jwtConfig.secret
    })
  }

  async validate(payload: any) {
    const username = payload.username;
    const user = await this.repository.findOne({ where: { username }, relations: ['boards'] });
    if (!user) throw new UnauthorizedException("User doesn't exists!");

    return user;
  }
}