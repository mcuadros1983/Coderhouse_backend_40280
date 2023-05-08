import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/createUser.dto';
import UserInterface from 'src/interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly users: UserInterface[] = [];
  private cont = 1;
  private readonly saltRounds = 2;

  private getIndex(id: number) {
    return this.users.findIndex((product) => product.id == id);
  }

  async register(data: CreateUserDto): Promise<UserInterface> {
    const foundUser = this.users.find((user) => user.email === data.email);
    if (foundUser)
      throw new HttpException(
        `El correo ${data.email} ya está registrado!`,
        HttpStatus.NOT_ACCEPTABLE,
      );

    const passwordHash = await bcrypt.hash(data.password, this.saltRounds)
    const user = new UserInterface();
    user.id = this.cont++;
    user.email = data.email;
    user.password = passwordHash;
    this.users.push(user);
    return user;
  }

  async login(data: CreateUserDto) {
    const foundUser = this.users.find((user) => user.email === data.email);
    if (!foundUser)
      throw new HttpException(
        `Error en credenciales`,
        HttpStatus.NOT_ACCEPTABLE,
      );

    const verifyPassword = await bcrypt.compare(
      data.password,
      foundUser.password,
    );
    if (!verifyPassword)
      throw new HttpException(
        `Error en credenciales`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    return { email: data.email };
  }

  findAll(): UserInterface[] {
    return this.users;
  }
}
