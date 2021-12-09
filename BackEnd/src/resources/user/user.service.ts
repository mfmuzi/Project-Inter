import {getRepository} from 'typeorm';
import md5 from 'crypto-js/md5';
import {sign} from 'jsonwebtoken';
import {User} from '../../entity/User';
import authConfig from '../../config/auth'

import {UserSignIn} from './dtos/user.signin.dtos';
import {UserSignUp} from './dtos/user.signup.dtos';
import AppError from '../../shared/error/AppError';


export default class UserService{

    async signin(user: UserSignIn){
        const userRepository = getRepository(User);

        const {email, password} = user;
        const passwordHash = md5(password).toString();

        const existUser = await userRepository.findOne({where: {email, password: passwordHash}})

        if(!existUser){
            throw new AppError('Usuário não encontrado', 401);
        }

       const {secret, expiresIn} = authConfig.jwt;

       const token = sign({
           firstName: existUser.firstName,
           lasName: existUser.lastName,
           accountNumber: existUser.accountNumber,
           accountDigit: existUser.accountDigit,
           wallet: existUser.wallet
       }, secret, {
           subject: existUser.id,
           expiresIn,
       });

       //@ts-expect-error ignore
       delete existUser.password
       
       return {accessToken: token}

    }

    async signup(user: UserSignUp){

        const userRepository = getRepository(User);

        const existUser = await userRepository.findOne({where: {email: user.email}})

        if(existUser){
            throw new AppError('Já existe um usuário com esse email', 401);
        }

        const userData = {
            ...user,
            password: md5(user.password).toString(),
            wallet: 0,
            accountNumber: Math.floor(Math.random() * 999999),
            accountDigit: Math.floor(Math.random() * 99)
        }

        const userCreate = await userRepository.save(userData);

        const {secret, expiresIn} = authConfig.jwt;

        const token = sign({
            firstName: user.firstName,
            lasName: user.lastName,
            accountNumber: userData.accountNumber,
            accountDigit: userData.accountDigit,
            wallet: userData.wallet
        }, secret, {
            subject: userCreate.id,
            expiresIn,
        });

        return {accessToken: token}
    }

    async me(user: Partial<User>){
        const userRepository = getRepository(User);
        const currentUser = await userRepository.findOne({where: {id: user.id}})

        if(!currentUser){
            throw new AppError('Usuário não encontrado', 401);
        }

        //@ts-expect-error
        delete currentUser.password

        return currentUser
    }
}