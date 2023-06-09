import styled from "styled-components"
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SessionsPage() {
    const [horarios, sethorario] = useState(undefined);
    const [filmeEscolhido, setfilmeEscolhido] = useState([])
    const numApi = useParams();

    useEffect(() => {
        const URL = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${numApi.idFilme}/showtimes`;
        const promise = axios.get(URL);
        promise.then((resposta) => {
            sethorario(resposta.data.days);
            console.log(resposta.data.days)
            setfilmeEscolhido(resposta.data);
            console.log(resposta.data)

        }); //deu certo
        promise.catch((erro) => {
            console.log(erro.response.data);
        }); // deu errado

    }, []);

    if (horarios === undefined) {
        return (
            <PageContainer>
                Carregando....
            </PageContainer>
        )
    }

    return (
        <PageContainer>
            Selecione o horário
            <div >
                {horarios.map(horarios => (
                    <SessionContainer key={horarios.id} data-test="movie-day" >
                        <p>{`${horarios.weekday} - ${horarios.date}`}</p>
                        <ButtonsContainer >
                            {horarios.showtimes.map((showtimes) => (
                                <Link to={`/assentos/${showtimes.id}`} key={showtimes.id} data-test="showtime">
                                    <button  >{showtimes.name}</button>
                                </Link>
                            )
                            )}
                        </ButtonsContainer>
                    </SessionContainer>
                )
                )}
            </div>
            <FooterContainer data-test="footer">
                <div>
                    <img src={filmeEscolhido.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{filmeEscolhido.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;

    p{
        width: 100%;
        height: 35px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        display: flex;
        align-items: center;
        color: #293845;

    }

`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
        width: 83px;
        height: 43px;
        background: #E8833A;
        border: none;
        color :#FFFFFF;
        border-radius: 3px;
    }
    a {
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
    left: 0px;

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
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`