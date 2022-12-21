import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import {Eye, EyeSlash} from "phosphor-react"
import { ContainerLogin, Form } from "./style"
import Logo from '../../assets/Logo.png'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AlertComponents } from "../../components/AlertComponents"

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [alert, setAlert] = useState(false)
    const [reload, setReload] = useState(false)
    const [activePassword, setActivePassword] = useState(false)
    const [activeTypePassword, setActiveTypePassword] = useState("password")

   const navigate = useNavigate()
    function handleNewLogin(event: any){
        event.preventDefault();
        const auth = getAuth();
        setReload(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((useCredential) => {
                const user = useCredential.user
                if(user){
                    window.localStorage.setItem("token", user.refreshToken)
                    navigate("/vendas")
                }
            }).catch((error) => {
                setAlert(true)
                setReload(false)
                console.log("error")
              });
    }

    function handleVisiblePassword(){
        if(activePassword === false){
            setActivePassword(true)
            setActiveTypePassword("text")
        }else{
            setActivePassword(false)
            setActiveTypePassword("password")
        }
    }


    return (
        <ContainerLogin>
                <img src={Logo} alt="Logo loja Sixty For" />
                {alert ? 
                    <div className="alert">
                        <AlertComponents/>
                    </div> 
                    :
                    ""    
                }
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
                            type={activeTypePassword} 
                            placeholder="Senha"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        {activePassword ? 
                            <Eye size={20} onClick={handleVisiblePassword}/> 
                            : 
                            <EyeSlash size={20} onClick={handleVisiblePassword}/>
                        }
                    </div>

                    {reload ? 
                        <button disabled >Entrando...</button>
                        :
                        <button type="submit">Entrar</button>
                    }
                </Form>
        </ContainerLogin>
    )
}