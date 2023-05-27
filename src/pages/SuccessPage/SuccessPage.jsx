
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components"


export default function SuccessPage() {
    const location = useLocation();
    const { nome, cpf, dia, Filme, horario, numeros } = location.state;

    const lugares = [numeros];
    console.log(lugares)
    return (
        <PageContainer>
            <h1>Pedido feito  <br />  com sucesso!</h1>

            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{Filme}</p>
                <p>{dia} - {horario}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><p>Ingressos</p></strong>
                {numeros.map(numeros => (
                    <p>Assento {numeros} </p>
                )
                )}

            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><p>Comprador</p></strong>
                <p>Nome: {nome}</p>
                <p>CPF: {cpf}</p>
            </TextContainer>
            <Link to='/' data-test="go-home-btn" >
                <button><p>Voltar para Home</p></button>
            </Link>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 20px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
        width: 225px;
        height: 42px;
        background: #E8833A;
        border-radius: 3px;
        border: none;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
    }

    button p{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        color: #FFFFFF;
    }

    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 5px;
    }

    strong p{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        letter-spacing: 0.04em;
        color: #293845;
    }

    p{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 22px;
        line-height: 26px;
        display: flex;
        align-items: center;
        color: #293845;
        margin-bottom: 0px;
        margin-top: 0px;
    }

`