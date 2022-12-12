import styled from "styled-components";

export const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background: ${(props) => props.theme["black-medium"]};

    img{
     max-width: 50px;
    }
   
   a{
    color: ${(props) => props.theme["gray-100"]};
    padding: 0.5rem 1rem;
    text-decoration: none;
    transition: 0.2s;
    margin: 0 10px ;
   }

   a:hover{
        color: ${(props) => props.theme["white"]};
        background: ${(props) => props.theme["gray-400"]};
        border-radius: 6px;
   }

   button{
     display: flex;
     align-items: center;
     gap: 4px;
     cursor: pointer;
     border: none;
     padding: 0.5rem 1rem;
     border-radius: 6px;
     font-size: 1rem;
     background: none;
     color: ${(props) => props.theme["white"]};
     transition: 0.2s;
   }

   button:hover{
          color: ${(props) => props.theme["white"]};
        background: ${(props) => props.theme["gray-400"]};
        border-radius: 6px;
   }
`;