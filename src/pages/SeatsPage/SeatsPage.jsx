import styled from "styled-components"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SeatsPage() {

    const [acentos, setacentos] = useState(undefined);
    const [Filme, setFilme] = useState([]);
    const [horario, sethorario] = useState([]);
    const [dia, setdia] = useState([]);
    const [cor, setcor] = useState({});
    const [bancos, setbancos] = useState({ ids: [] });
    const [nome, setnome] = useState('');
    const [cpf, setcpf] = useState('');
    const navigate = useNavigate();


    const numApi = useParams();


    useEffect(() => {
        const URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${numApi.idSessao}/seats`;
        const promise = axios.get(URL);
        promise.then((resposta) => {
            setacentos(resposta.data.seats);
            // todos os acentos
            setFilme(resposta.data.movie);
            sethorario(resposta.data);
            setdia(resposta.data.day);
        }); //deu certo

        promise.catch((erro) => {
            console.log(erro.response.data);
        }); // deu errado

    }, []);

    function selecionado(id) {
        console.log(id);
        setcor((prevSelecionados) => ({
            ...prevSelecionados,
            [id]: !prevSelecionados[id],
        }));
        //  let bancos = [...bancos];
        setbancos((prevBancos) => ({
            ...prevBancos,
            ids: prevBancos.ids.includes(id)
                ? prevBancos.ids.filter((item) => item !== id)
                : [...prevBancos.ids, id],
        }));
    }

    console.log(bancos);
    if (acentos === undefined) {
        return (
            <PageContainer>
                Carregando....
            </PageContainer>
        )
    }
    // testar para ver se se esta false ou true

    function mandarProServidor(e) {
        e.preventDefault();
        console.log(nome);
        console.log(cpf);
        // pegar os dados dos imputs 
        // uso as variaveis de estado
        // enviar pro servidor atravez do axios
        const dados = {
            ids: bancos.ids,
            name: nome,
            cpf: cpf
        }
        console.log(dados);
        const urlDados = 'https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many';
        const promise = axios.post(urlDados, dados);
        promise.then(resposta => navigate("/sucesso", {
            state: {
                nome: nome,
                cpf: cpf,
                dia: dia,
                Filme: Filme,
                horario: horario,
            }
        }));
        promise.catch(respota => (alert('deu errado')));

    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer >
                {acentos.map((acentos) => (
                    <>
                        {
                            acentos.isAvailable === true ? (
                                <SeatItem data-test="seat"
                                    key={acentos.id}
                                    onClick={() => selecionado(acentos.id)}
                                    style={{
                                        backgroundColor: cor[acentos.id] ? '#0E7D71' : '',
                                        border: cor[acentos.id]
                                            ? '1px solid #0E7D71'
                                            : '1px solid #808F9D',
                                    }}
                                >
                                    {acentos.name}
                                </SeatItem>

                            ) :
                                <SeatItemIndisp data-test="seat" onClick={() => alert('Esse assento não está disponível')} key={acentos.id} >
                                    {acentos.name}
                                </SeatItemIndisp>
                        }
                    </>
                    // sem onclick

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

            <form onSubmit={mandarProServidor}>
                <FormContainer >
                    <label htmlFor="nome">Nome do Comprador:</label>
                    <input
                        data-test="client-name"
                        type="text"
                        id="nome"
                        required
                        value={nome}
                        onChange={(e) => setnome(e.target.value)}
                        placeholder="Digite seu nome..."
                    />

                    <label htmlFor="cpf">CPF do Comprador:</label>
                    <input
                        data-test="client-cpf"
                        type="number"
                        id="cpf"
                        required
                        value={cpf}
                        onChange={(e) => setcpf(e.target.value)}
                        placeholder="Digite seu CPF..."
                    />

                </FormContainer>

                <Buto>
                    {/*mandar o post com os dados do comprador esse é o link do post*/}

                    <button type="submit" data-test="book-seat-btn">
                        <p>Reservar Assento(s)</p>
                    </button>
                    {/* criar uma função no butão que manda pro cervidor , dentro da fulçao vericar se foi then, se sim pular pra proxima pagina
                  {/*then 
                     Link to='/pedido-confirmado' style={{ textDecoration: 'none' }} key={horario.date}*/}
                </Buto>
            </form>

            <FooterContainer data-test="footer" >
                <div>
                    <img src={Filme.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{Filme.title}</p>
                    <p>{dia.weekday}&nbsp;-&nbsp;{horario.name}</p>
                </div>
            </FooterContainer>

        </PageContainer >
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

        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        
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

const SeatItemIndisp = styled.div`
    border: 1px solid #F7C52B;         // Essa cor deve mudar
    background-color: #FBE192;    // Essa cor deve mudar
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