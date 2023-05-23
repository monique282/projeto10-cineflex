import styled from "styled-components"

export default function SeatsPage() {

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                <SeatItem>01</SeatItem>
                <SeatItem>02</SeatItem>
                <SeatItem>03</SeatItem>
                <SeatItem>04</SeatItem>
                <SeatItem>05</SeatItem>
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

                <button>
                    <p>Reservar Assento(s)</p>
                </button>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={"https://br.web.img2.acsta.net/pictures/22/05/16/17/59/5165498.jpg"} alt="poster" />
                </div>
                <div>
                    <p>Tudo em todo lugar ao mesmo tempo</p>
                    <p>Sexta - 14h00</p>
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
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
        width: 225px;
        height: 42px;
        left: 72px;
        top: 688px;
        background: #E8833A;
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