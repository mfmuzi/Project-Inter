import { AxiosResponse } from "axios";
import { createContext, useEffect, useState, useCallback } from "react";

import {signIn, signUp, SignInData, SignUpData, me} from '../services/resources/user'


interface UserDTO {
    id: string;
    firstName: string;
    lastName: string;
    accountNumber: number;
    accountDigit: number;
    wallet: number;
    email: string;
}

interface ContextData {
    user: UserDTO;
    userSignIn: (userData: SignInData) => Promise<UserDTO>;
    userSignUp: (userData: SignUpData) => Promise<UserDTO>;
    getCurrentUser: () => Promise<UserDTO>;

}
export const AuthContext = createContext<ContextData>({} as ContextData)

export const AuthProvider: React.FC = ({children}) => {

    const [user, setUser] = useState<UserDTO>(() => {
        
        const user = localStorage.getItem('@Inter:User');

        if(user){
            return JSON.parse(user);
        }

        return {} as UserDTO

    });

    const userSignIn = async (userData: SignInData) => {
        const {data} = await signIn(userData);

        if(data?.status === 'error'){
            return data;
        }

        if(data.accessToken){
            localStorage.setItem('@Inter:Token', data.accessToken);
        }

        const user =  await getCurrentUser();
        localStorage.setItem('@Inter:User', JSON.stringify(user));
        return user;
              
    }

    const getCurrentUser = async () => {
        const {data} = await me();
        setUser(data)
        return data;
    }

    const userSignUp = async (userData: SignUpData) => {
        const {data} = await signUp(userData);

        if(data.accessToken){
            localStorage.setItem('@Inter:Token', data.accessToken);
        }

        const user =  await getCurrentUser();
        localStorage.setItem('@Inter:User', JSON.stringify(user));
        return user;
    
    }

    return(
        <AuthContext.Provider value={{user, userSignIn, userSignUp, getCurrentUser}}>
            {children}
        </AuthContext.Provider>
    )
}