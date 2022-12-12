import styled from "styled-components";

export const ContainerResgistration = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    background: rgba(0, 0, 0 , 0.50);
    z-index: 1000;
    width: 100%;
    height: 100vh;

    animation: slider;
    animation-duration: 0.4s;

    @keyframes slider {
     from{
        opacity: 0;
     } 
     to{
        opacity: 1;
     }  
    }
`;

export const ContainerResgistrationForm = styled.form`
    position: absolute;
    max-width: 400px;
    width: 100%;
    padding: 20px;
    background: ${(props) => props.theme['background']};
    border-radius: 10px;
    z-index: 2000;

    div{
        width: 100%;
        display: flex;
        justify-content: flex-end;

        svg{
            cursor: pointer;
        }
    }
    h1{
        margin-bottom: 2rem;
        font-size: 1.625rem;
    }

    label{
        font-size: 1rem;
        padding-bottom: 16px;
    }

    input{
        width: 100%;
        padding: 1rem;
        font-size: 1rem;
        margin-top: 8px;
        margin-bottom: 16px;
        border-radius: 10px;        
        border: none;
        background: ${(props) => props.theme['inputs']};
        color:  ${(props) => props.theme['white']};
    }

    button{
        width: 100%;
        padding: 1rem;
        color:  ${(props) => props.theme['white']};
        background: ${(props) => props.theme['red-700']};
        font-weight: 500;
        border-radius: 10px;
        border: none;
        letter-spacing: 0.2px;
        cursor: pointer;
        margin-top: 0.5rem;
    }

    button:hover{
        background: ${(props) => props.theme['red-500']}; 
    }


`;