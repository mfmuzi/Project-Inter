import {DashboardBackground, BodyContainer, InlineContainer, InlineTitle} from './styles'

import Header from '../../components/Header';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Statement from './Statement';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import {pay, request} from '../../services/resources/pix'

const Dashboard = () => {

    const {user, getCurrentUser} = useAuth();
    const wallet = user?.wallet || 0;

    const [key, setKey] = useState('');
    const [generatedKey, setGeneratedKey] = useState('');
    const [value, setValue] = useState('');

    const handleNewPayment = async () => {

        const{data} = await request(Number(value));

        if(data.copyPasteKey){
            setGeneratedKey(data.copyPasteKey)
        }
    }

    const handlePayPix = async() =>{
        try{
            const {data} = await pay(key)

            if(data.msg){
                alert(data.msg)
                return
            }
                alert('Não foi possivel efetuar o pagamento')
        }catch(e){
            console.log(e);
            alert('Não é possivel receber o PIX do mesmo usuário')
        }

    }

    useEffect(() => {
        getCurrentUser()
    }, [])

    if(!user){
        return null
    }

    return (
        <DashboardBackground>
            <Header />
            <BodyContainer>
                <div>
                    <Card noShadow width="90%">
                        <InlineTitle>
                            <h2 className="h2">Saldo Atual</h2>
                        </InlineTitle>
                        <InlineContainer>
                            <h3 className="wallet">
                                {wallet.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                            </h3>
                        </InlineContainer>
                    </Card>
                    <Card noShadow width="90%">
                        <InlineTitle>
                            <h2 className="h2">Receber PIX</h2>
                        </InlineTitle>
                        <InlineContainer>
                            <Input value={value} onChange={e => setValue(e.target.value)} style={{flex: 1}} placeholder="Valor"/>
                            <Button onClick={handleNewPayment}>Gerar Código</Button>
                        </InlineContainer>

                        {generatedKey && (
                            <>
                            <p className="primary-color">Pix copia e cola</p>
                            <p className="primary-color">{generatedKey}</p>
                            </>

                        )}
                    </Card>
                    <Card noShadow width="90%">
                        <InlineTitle>
                            <h2 className="h2">Pagar PIX</h2>
                        </InlineTitle>
                        <InlineContainer>
                            <Input style={{flex: 1}} value={key} onChange={e => setKey(e.target.value)} placeholder="Insira a chave PIX"/>
                            <Button onClick={handlePayPix}>Pagar PIX</Button>
                        </InlineContainer>                        
                    </Card>
                </div>
                <div>
                <Card noShadow width="90%">
                    <InlineTitle>
                        <h2 className="h2">Extrato da conta</h2>
                    </InlineTitle>
                    <Statement></Statement>                            
                </Card>
                </div>
            </BodyContainer>
        </DashboardBackground>
    )
}

export default Dashboard;