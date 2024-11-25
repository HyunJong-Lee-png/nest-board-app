import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  async getUser(req){
    const user = await this.repository.findOne({where:{id:req.user.id}})
    return user;
  }

  async signUpUser(UserDto: UserDto): Promise<boolean> {
    const { username, password } = UserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.repository.create({
      username,
      password: hashedPassword
    });
    try {
      await this.repository.save(user);
      return true;
    } catch (e) {
      throw new UnauthorizedException(`${username} already exists!`)
    }
  }

  async signInUser(UserDto: UserDto): Promise<{ accessToken: string }> {
    const { username, password } = UserDto;
    const user = await this.repository.findOne({ where: { username } })
    if (!user) throw new UnauthorizedException(`${username} doesn't exist!`);
    const result = await bcrypt.compare(password, user.password);
    if (!result) throw new UnauthorizedException(`password is not correct!`);
    const accessToken = this.jwtService.sign({ username })
    return { accessToken };
  }
}
