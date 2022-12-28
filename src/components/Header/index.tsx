import {NavLink, useLocation, useNavigate } from "react-router-dom";
import { SignOut, X, List } from "phosphor-react";
import LogoSvg from "../../assets/LogoSVG.svg"
import { ContainerHeader, Nav, NavMobile } from "./style";
import { getAuth, signOut } from "firebase/auth";
import useMedia from "../../Hooks/UseMedia";
import { useEffect, useState } from "react";

export function Header(){
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const [pageName, setPageName] = useState("")
    const mobile = useMedia('(max-width: 43.75rem)')
    const [actvieMunuMobile, setActivemenuMobile] = useState(false)
    console.log(pathname)

    useEffect(() =>{
        switch(pathname){
            case "/vendas":
                setPageName("Vendas")
                break;
            case "/estoque":
                setPageName("Estoque")
                break;
            case "/pedidos":
                setPageName("Pedidos")
                break;
            default: 
              
        }
    }, [pathname])

    useEffect(() =>{
        document.body.style.overflowY = actvieMunuMobile ? "hidden" : "auto"
    }, [actvieMunuMobile])

    function Logout(){
        console.log("foi")
        const auth = getAuth();
        let response = window.confirm("Certeza que deseja sair ?");
        if (response === true) {
            signOut(auth)
              .then(() => {
                window.localStorage.removeItem("token");
                navigate("/");
              })
              .catch((error) => {
                // An error happened.
              });
          }
    }

    let activeStyle = {
        color: "#F4EDE8",
        background: "#3E3B47",
        borderRadius: "6px",
    }
    return(
        <ContainerHeader>
            <NavMobile active={actvieMunuMobile}>
                    <X 
                        size={20}
                        onClick={() =>{
                            setActivemenuMobile(false)
                        }}
                    />
                    <div>
                        <NavLink   
                            style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                            } 
                            onClick={() =>{
                                setActivemenuMobile(false)
                            }}
                            to="vendas">
                                Vendas
                            </NavLink>
                        <NavLink 
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }  
                            onClick={() =>{
                                setActivemenuMobile(false)
                            }}
                            to="/estoque">
                                Estoque
                        </NavLink>
                        <NavLink 
                                style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }  
                                onClick={() =>{
                                setActivemenuMobile(false)
                            }}
                                to="/pedidos">
                                    Pedidos
                        </NavLink>
                    </div>
                    <button onClick={Logout}>
                        Sair
                        <SignOut size={20}/>
                    </button>
            </NavMobile>
            
            {mobile ? 
            <div>
                <List 
                    size={30}
                    onClick={() =>{
                        setActivemenuMobile(true)
                    }}
                />
                <h1>{pageName}</h1>     
            </div>
            : 
            <Nav>
                <img src={LogoSvg} alt="" />
                <div>
                    <NavLink   
                        style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                        } 
                        to="/vendas">
                            Vendas
                        </NavLink>
                    <NavLink 
                        style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }  
                        to="/estoque">
                            Estoque
                    </NavLink>
                    <NavLink 
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }  
                            to="/pedidos">
                                Pedidos
                    </NavLink>
                </div>
                <button onClick={Logout}>
                    Sair
                    <SignOut size={20}/>
                </button>
            </Nav>}
        </ContainerHeader>
    )
}