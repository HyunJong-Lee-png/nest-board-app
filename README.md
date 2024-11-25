@Injectable 데코가 붙은 클래스를 providers에 저장시 컨트롤러나 다른 서비스에서
인스턴스로 사용할 수 있다.

@Module데코에서 import한 다른 모듈은 그 모듈에서 exports하고있는 서비스나 모듈을
해당 모듈에서 사용할 수 있다.

@Entity에서 @ManyToOne @OneToMany관계는 ManyToOne쪽에만 자동으로 해당 "컬럼+Id"값으로 테이블에 저장된다. (다대다,일대일 관계에서는 어디쪽에 저장할 지 직접 명시해준다)
또한 따로 디비에 ManyToOne이나 OneToMany의 컬럼값이 저장되진 않으니 가져올땐 
relations속성을 넣어줘야한다.

Dto는 그냥 interface를 클래스형태로 만든거라고 보면 되는데 거기에 추가적인 유효성 체크까지 가능하게 만든것

엔티티는 typeorm에서 사용하는거고 sequlizeorm에서는 엔티티말고 테이블데코를 사용

커스텀파이프 = PipeTransForm 상속, 커스텀데코레이터 = createParamDecorator사용

jwt전략을 사용하기 위해 passport,passport-jwt,@nestjs/passport,@nestjs/jwt패키지를 설치한다.

jwt전략의 과정은 회원가입 후 로그인시 입력한 아이디와 비밀번호가 맞다면 
 PassportModule.register({   defaultStrategy: 'jwt' }),
 JwtModule.register({ secret: 'secret1234', signOptions: { expiresIn: 3600 } })를 해당 모듈에서 임포트 하면 Jwt모듈에서 임포트했기때문에 JwtService라는 injectable클래스를 사용할 수 있고 jwtService.sign({username})을 하면 알아서 해당 객체에 시크릿을 합쳐 1시간짜리 토큰을 생성해준다. 이를 클라이언트에 보내주면 끝

 다음 회원정보가 필요한 엔드포인트에 요청시 @UseGuards(AuthGuards())를 사용하면 기본전략이 jwt므로 @UseGuards(AuthGuards('jwt'))즉 express에서 보는 passport.autheticate('jwt')가 실행되고 injectable한 JwtStrategy클래스가 인스턴스화 되어
 토큰을 해석해 jwtService.sign의 인수에 넣었던 {username}을 가져와 마지막에 req.user에 유저정보를 담아준다. 

 super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret1234'
    }) 는
     passport-local을 사용한다면

super({
      usernamefield:'내가 클라이언트에서 보낸 속성이름',
      passwordfield:'내가 클라이언트에서 보낸 속성이름',
    })으로 대체될 것



