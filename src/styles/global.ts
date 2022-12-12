import { createGlobalStyle } from 'styled-components'
// para pode a tipagem funcionar e preciso criara a pasta do @types 
// para pode criar a tipagem de cores no styled-componets

export const GlobalStyles = createGlobalStyle`
     *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus{
        outline: 0;
        box-shadow: 0 0 0 2px ${(props) => props.theme['red-500']};
        border-radius: 6px;
    }
    
    body{
        background: ${(props) => props.theme['background']};
        color: ${(props) => props.theme['white']};
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button{
        font-family: 'Roboto Slab', serif;
        font-weight: 400;
        font-size: 1rem;
    }
`;