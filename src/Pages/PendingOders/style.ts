import styled from "styled-components";

export const ContainerPendingOrders = styled.section`
    max-width: 50rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 3.75rem auto 0 auto;
    padding: 0px 20px ;

    nav{
        margin-bottom: 20px;
    }

    @media (max-width: 500px){
        
    }
`;

export const HeaderPendingOrders = styled.header`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 1.75rem;
    margin-bottom: 2.5rem;

    input{
        background: ${(props) => props.theme['inputs']};
        border: none;
        font: 1rem;
        padding: 0.5rem;
        border-radius: 6px;
        color: ${(props) => props.theme['white']};
    }

    svg{
        position: relative;
        left: -30px;
        top: 4px;
        color: ${(props) => props.theme['gray-100']};
    }

    button{
        font-size: 1rem;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        background: ${(props) => props.theme['red-700']};
        color: ${(props) => props.theme['white']};
        letter-spacing: 0.5px;
        border: none;
        cursor: pointer;
    }

    button:hover{
        background: ${(props) => props.theme['red-500']};
    }

    @media (max-width: 500px) {
        flex-direction: column-reverse;
        margin-bottom: 1rem;
        button{
            margin-bottom: 20px;
        }

        div{
            width: 100%;
            input{
                width: 100%;
            }

            svg{
                position: relative;
                top: -26px;
                left: 90%;
                align-self: center;
            }
        }
    }
`;

export const TablePendingOrders = styled.table`
     width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;

    svg{
        color: ${(props) => props.theme['blue']};
        cursor: pointer;
    }
    // min-width: 600px;
    th{
        background: ${(props) => props.theme['gray-400']};
        color: ${(props) => props.theme['white']};
        padding: 1rem;
        text-align: left;
        font-size: 0.875rem;
        line-height: 1.6;

        &:first-child {
            border-top-left-radius: 8px;
            padding-left: 1.5rem;
        }

        &:last-child {
            border-top-right-radius: 8px;
            padding-right: 1.5rem;
            text-align: center;
        }
    }

    td{
        background: ${(props) => props.theme['gray-500']};
        color: ${(props) => props.theme['white']};
        border-top: 4px solid ${(props) => props.theme['background']};
        padding: 1rem;
        font-size: 0.875rem;
        line-height: 1.6;

        &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
        text-align: center;
      }
    }

    @media (max-width: 500px) {
        th, td{
            padding: 0.5rem;
        }
        .iconUpdate{
            display: none;
        }
    }
`;