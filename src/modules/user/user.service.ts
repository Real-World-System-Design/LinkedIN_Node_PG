import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { getRepository, Repository } from 'typeorm';
import { createUserDto } from './dto/registerUser.dto';
import { sanitization } from 'src/utils/security';
import { hashPass, passMatch } from 'src/utils/password';
import { isEmail, validate } from 'class-validator';
import { loginUserDto } from './dto/loginUser.dto';
import { sign } from 'src/utils/jwt.util';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>){}

    async getAllUsers(): Promise<User[]>{
        return await this.userRepo.find();
    }
    async getUserById(userId: number): Promise<User>{
        const foundUser = await this.userRepo.findOne(userId);
        if(!foundUser) throw new HttpException({message: `No user with this id: ${userId} found`}, HttpStatus.NOT_FOUND);
        return sanitization(foundUser);
    }

    async registerUser(data: createUserDto): Promise<User>{
        const {username, password, email} = data;
        //check the uniqueness in the userdata
        const repo = getRepository(User);
        const existingUser = repo.findOne(username);
        const existingEmail = repo.findOne(email);
        if(!existingEmail && !existingUser) throw new HttpException({message: `Input data validation failed ${username} and ${email} must be unique`}, HttpStatus.UNPROCESSABLE_ENTITY); 
        //save the user to the db
        const newUSer = new User();
        newUSer.username = username;
        newUSer.email = email;
        newUSer.password = await hashPass(password);

        const erros = await validate(newUSer);
        if(erros.length > 0) {
            const _errors = {username: 'UserInput is not valid'};
            throw new HttpException({message: `Input data validation failed`, _errors}, HttpStatus.BAD_REQUEST);
        }else{
            const savedUser = await this.userRepo.save(newUSer);
            return sanitization(savedUser);
        }
    }
    async loginUser(data: loginUserDto): Promise<User> {
        const {email, password} = data;
        // const user = await this.userRepo.findOne(email);
        const repo = getRepository(User);
        const user = await repo.findOne(email);
        if(!user) throw new HttpException({message: `No user with this email ${email} exists`}, HttpStatus.UNPROCESSABLE_ENTITY);
    
        //MATCH THE PASSWORD
        const matchPass = await passMatch(password, user.password);
        if(!matchPass) throw new HttpException({message: `wrong password`}, HttpStatus.UNPROCESSABLE_ENTITY);
    
        user.token = await sign(user);
        return sanitization(user);
    }
}
