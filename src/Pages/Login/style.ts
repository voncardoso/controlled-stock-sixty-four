import styled from "styled-components";

export const ContainerLogin = styled.section`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    img{
        position: relative;
        top: -20px;
    }

    .alert{
        margin-bottom: 20px;
    }
`;

export const Form = styled.form`
    max-width: 350px;
    width: 100%;
    
    h1{
        font-size: 1.5rem;
        line-height: 2rem;
        margin-bottom: 1.5rem;
        text-align: center;
        font-weight: 500;
    }

    div{
        svg{
            position: relative;
            z-index: 10;
            left: 90%;
            top: -52px;
            color: ${(props) => props.theme['white']};
            cursor: pointer;
        }
        input{
            
            width: 100%;
            padding: 1rem;
            border-radius: 10px;
            margin-bottom: 16px;
            border: none;
            background: ${(props) => props.theme['inputs']};
            color:  ${(props) => props.theme['white']};
        }

    }

    

    button{
        
        width: 100%;
        padding: 1rem;
        border-radius: 10px;
        border: none;
        background: ${(props) => props.theme['red-700']};
        color:  ${(props) => props.theme['white']};
        letter-spacing: 0.4px;
        cursor: pointer;
    }

    button:disabled{
        background: ${(props) => props.theme['red-700']};
    }
    
    button:hover{
        background: ${(props) => props.theme['red-500']}; 
    }

    @media (max-width: 768px) {
        div{
            svg{
                top: -49px;
            }
        }
    }
`;