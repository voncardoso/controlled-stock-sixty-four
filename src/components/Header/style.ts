import styled from "styled-components";
export const ContainerHeader = styled.section`

  >div{
    margin: 20px;
    padding-bottom: 20px;
    display: flex;
    align-items: flex-start;
    h1{
      text-align: center;
      width: 100%;
      font-size: 1.5rem;
    }
    >svg{
      height: 32px;
    }
  }

`;


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


   @media (max-width: 500px) {
    overflow-x: auto;
    z-index: 1000;
    top: 0;
   }
`;

interface Status {
  active: boolean,
}


export const NavMobile = styled.nav<Status>`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: none;
  z-index: 10000;
  background: ${(props) => props.theme['background']};
  display:  ${(props) => props.active ? "" : "none"};

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

  > svg{
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 20px;
    margin-top: 20px;
  }

  div{
    z-index: 100000;
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    font-size: 1.5rem;
    
    a{
      color: ${(props) => props.theme["white"]};
      text-decoration: none;
      cursor: pointer;
    }
  }

  button{
    display: flex;
    align-items: flex-end;
    gap: 5px;
    margin-top: 20px;
    font-size: 1.5rem;
    border: none;
    color: ${(props) => props.theme["white"]};
    background: none;
    cursor: pointer;
    svg{
      position: relative;
      height: 25px;
    }
    
  }


`;
