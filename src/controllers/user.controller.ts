import { post, requestBody, HttpErrors } from '@loopback/rest';
import { User } from '../models';
import { UserRepository, UserRoleRepository } from '../repositories';
import { repository } from '@loopback/repository';
import { Credentials, JWT_SECRET, EXP_DAY } from '../auth';
import { promisify } from 'util';

const { sign } = require('jsonwebtoken');
const signAsync = promisify(sign);

export class UserController {
  constructor(
    @repository(UserRepository) private userRepository: UserRepository,
    @repository(UserRoleRepository) private userRoleRepository: UserRoleRepository,
  ) { }

  @post('/users')
  async createUser(@requestBody() user: User): Promise<User> {
    var md5 = require('md5');
    var plainPassword = user.password;
    user.password = md5(user.password);
    var users = await this.userRepository.create(user);
    users.password = plainPassword;
    return users;
  }

  @post('/users/login')
  async login(@requestBody() credentials: Credentials) {
    if (!credentials.email || !credentials.password) throw new HttpErrors.BadRequest('Missing Email or Password');
    const user = await this.userRepository.findOne({ where: { email: credentials.email } });
    if (!user) throw new HttpErrors.Unauthorized('Invalid credentials');

    var md5 = require('md5');
    const isPasswordMatched = user.password === md5(credentials.password);
    if (!isPasswordMatched) throw new HttpErrors.Unauthorized('Invalid credentials');

    var moment = require('moment');
    var expDayEpoch = moment().add(EXP_DAY, "days").unix();

    const tokenObject = { userid: user.id, user_name: user.name, email: user.email, exp: expDayEpoch };
    const token = await signAsync(tokenObject, JWT_SECRET);
    const roles = await this.userRoleRepository.find({ where: { userId: user.id } });
    const { id, email, name } = user;

    return {
      token,
      id: id,
      name: name,
      email,
      roles: roles.map(r => r.roleId),
    };
  }
}
