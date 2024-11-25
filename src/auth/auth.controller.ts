import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './custom-auth.decorator';
import { User } from './entity/auth.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Get()
  @UseGuards(AuthGuard())
  getUserInfo(@Req() req){
    return this.authService.getUser(req);
  }

  @Post('/signup')
  signUpUser(@Body(new ValidationPipe()) UserDto: UserDto): Promise<boolean> {
    return this.authService.signUpUser(UserDto);
  }

  @Post('/signin')
  signInUser(@Body(new ValidationPipe()) UserDto: UserDto): Promise<{ accessToken: string }> {
    return this.authService.signInUser(UserDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user:User) {
    console.log(user);
  }
}
