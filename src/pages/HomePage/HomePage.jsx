import styled from "styled-components"
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";


export default function HomePage() {
    const [filmes, setfilmes] = useState(undefined);

    useEffect(() => {
        const URL = 'https://mock-api.driven.com.br/api/v8/cineflex/movies';
        const promise = axios.get(URL);
        promise.then((resposta) => {
            setfilmes(resposta.data);
            console.log(resposta.data);

        }); //deu certo
        promise.catch((erro) => {
            console.log(erro.response.data);
        }); // deu errado

    }, []);
   
if(filmes === undefined){
    return (
        <PageContainer>
            Carregando .....
        </PageContainer>
    )
}


    return (
        <PageContainer>
            Selecione o filme

            <ListContainer key={filmes.id}>
                {filmes.map(filmes => (
                    <Link to={`/horario/${filmes.id}`}>
                        <MovieContainer key={filmes.id}>
                            <img src={filmes.posterURL} alt="poster" />
                        </MovieContainer>
                    </Link>
                )
                )}
            </ListContainer>

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
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`