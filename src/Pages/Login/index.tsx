import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { ContainerLogin, Form } from "./style"
import Logo from '../../assets/Logo.png'
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
   const navigate = useNavigate()
    function handleNewLogin(event: any){
        event.preventDefault();
        console.log("foi")
        const auth = getAuth();
        
        signInWithEmailAndPassword(auth, email, password)
            .then((useCredential) => {
                const user = useCredential.user
                if(user){
                    window.localStorage.setItem("token", user.refreshToken)
                    navigate("/home")
                }
            }).catch((error) => {
                console.log("error")
              });
    }


    return (
        <ContainerLogin>
                <img src={Logo} alt="Logo loja Sixty For" />
                <Form onSubmit={handleNewLogin}>
                    
                    <h1>Faça seu login</h1>
                    <div>
                        <input 
                            type="text" 
                            placeholder="E-mail"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div>
                        <input 
                            type="password" 
                            placeholder="Senha"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>

                    <button type="submit">Entrar</button>
                </Form>
        </ContainerLogin>
    )
}