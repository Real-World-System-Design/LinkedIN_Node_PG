import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { loginUserDto } from './dto/loginUser.dto';
import { createUserDto } from './dto/registerUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    @HttpCode(201)
    async getAllUsers(): Promise<User[]> {
        return await this.userService.getAllUsers();
    }
    @Get(':id')
    @HttpCode(201)
    async getUserById(@Param('id') id: number): Promise<User> {
        return await this.userService.getUserById(id);
    }
    @Post('register')
    @HttpCode(201)
    async registerUser(@Body() data: createUserDto): Promise<User> {
        return await this.userService.registerUser(data);
    }
    @Post('login')
    @HttpCode(201)
    async loginUser(@Body() data: loginUserDto): Promise<User> {
        return await this.userService.loginUser(data);
    }
}
