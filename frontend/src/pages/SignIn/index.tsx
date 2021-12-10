import {Wrapper, Background, InputContainer, ButtonContainer} from './styles';
import { useEffect, useState } from 'react';
import Card from '../../components/Card';

import background from '../../assets/images/background-login.jpg'
import LogoInter from '../../assets/images/Inter-orange.png'
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import { signIn } from '../../services/resources/user';


const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const {userSignIn} = useAuth(); 

    const handleToSignIn = async () => {
        const data = {
            email,
            password
        }
        
        const response = await userSignIn(data);

        if(response.id){
            navigate('/dashboard');
            return;
        }

        alert('Usuário ou senha inválida');

    }

    return (
        <Wrapper>
            <Background image={background}/>
            <Card width="403px">
            <img src={LogoInter} width={172} height={61} alt="Logo Inter" />
            <InputContainer>
                <Input placeholder="EMAIL" value={email} onChange={e => setEmail(e.target.value)}/>
                <Input placeholder="SENHA" type="password" value={password} onChange={e => setPassword(e.target.value)}/>                
            </InputContainer>

            <ButtonContainer>
                <Button type="button" onClick={handleToSignIn}> Entrar</Button>
                <p>Ainda não é cadastrado? <Link to="/signup">Cadastre-se já!</Link></p>
            </ButtonContainer>
            </Card>
        </Wrapper>
    )
}

export default SignIn;