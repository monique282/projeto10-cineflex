import styled from "styled-components"
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SeatsPage() {

    const [acentos, setacentos] = useState(undefined);
    const [Filme, setFilme] = useState([]);
    const [horario, sethorario] = useState([]);
    const [dia, setdia] = useState([]);
    const numApi = useParams();

    useEffect(() => {
        const URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${numApi.horarioSelecionado}/seats`;
        const promise = axios.get(URL);
        promise.then((resposta) => {
            setacentos(resposta.data.seats);
            setFilme(resposta.data.movie);
            console.log(resposta.data);
            sethorario(resposta.data);
            setdia(resposta.data.day);
            console.log(resposta.data.day)
        }); //deu certo

        promise.catch((erro) => {
            console.log(erro.response.data);
        }); // deu errado

    }, []);

    if (acentos === undefined) {
        return (
            <PageContainer>
                Carregando....
            </PageContainer>
        )
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer >
                {acentos.map((acentos) => (

                    <SeatItem key={acentos.id} >{acentos.name}</SeatItem>

                )
                )}

            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircleSele />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircleDisp />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircleIndip />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                <h1>Nome do Comprador:</h1>
                <input placeholder="Digite seu nome..." />

                <h1>CPF do Comprador:</h1>
                <input placeholder="Digite seu CPF..." />


            </FormContainer>

            <Buto>
                <Link to='/pedido-confirmado' style={{ textDecoration: 'none' }} key={horario.date}>
                    <button>
                        <p>Reservar Assento(s)</p>
                    </button>
                </Link>
            </Buto>

            <FooterContainer>
                <div>
                    <img src={Filme.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{Filme.title}</p>
                    <p>{dia.weekday}&nbsp;-&nbsp;{horario.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin: 20px 0;
    font-size: 18px;
    
    input {
        width: calc(100vw - 60px);
        height: 51px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 3px;
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        display: flex;
        align-items: center;
        margin-top: 0px;
    }

    h1{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        display: flex;
        align-items: center;
        color: #293845;
        margin-bottom: 0px;
    }
`
const Buto = styled.div`
    button {
        align-self: center;
        width: 225px;
        height: 42px;
        left: 72px;
        top: 688px;
        background-color: #E8833A;
        border-radius: 3px;
        border: none;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        margin-top: 35px;
      
        
    }

    button p{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #FFFFFF;
            }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircleSele = styled.div`
    border: 1px solid #0E7D71;         // Essa cor deve mudar
    background-color: #1AAE9E;   // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;

`
const CaptionCircleDisp = styled.div`
    border: 1px solid #7B8B99;         // Essa cor deve mudar
    background-color: #C3CFD9;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionCircleIndip = styled.div`
    border: 1px solid #F7C52B;         // Essa cor deve mudar
    background-color: #FBE192;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid #808F9D;         // Essa cor deve mudar
    background-color: #C3CFD9;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    text-decoration: none;
    color: #000000;

    p{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: 0.04em;
        color: #000000; 
        text-decoration: none;
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;
   

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        p {
            margin-bottom: 0px;
            text-align: left;
            margin-top: 0px;

            &:nth-child(2) {
            margin-top: 0px;
            }
        }
    }
`