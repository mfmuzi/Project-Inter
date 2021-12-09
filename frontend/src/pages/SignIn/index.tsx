import {Wrapper, Background, InputContainer, ButtonContainer} from './styles';

import Card from '../../components/Card';

import background from '../../assets/images/background-login.jpg'
import LogoInter from '../../assets/images/Inter-orange.png'
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {

    const navigate = useNavigate();
    const handleToSingIn = () => {
        navigate('/dashboard');
    }

    return (
        <Wrapper>
            <Background image={background}/>
            <Card width="403px">
            <img src={LogoInter} width={172} height={61} alt="Logo Inter" />
            <InputContainer>
                <Input placeholder="EMAIL" />
                <Input placeholder="SENHA" type="password" />                
            </InputContainer>

            <ButtonContainer>
                <Button type="button" onClick={handleToSingIn}> Entrar</Button>
                <p>Ainda não é cadastrado? <Link to="/signup">Cadastre-se já!</Link></p>
            </ButtonContainer>
            </Card>
        </Wrapper>
    )
}

export default SignIn;