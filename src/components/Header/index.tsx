import {NavLink, useNavigate } from "react-router-dom";
import { SignOut } from "phosphor-react";
import LogoSvg from "../../assets/LogoSVG.svg"
import { Nav } from "./style";
import { getAuth, signOut } from "firebase/auth";

export function Header(){
    const navigate = useNavigate();

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
                        to="/lote">
                            Lote
                </NavLink>
            </div>
            <button onClick={Logout}>
                Sair
                <SignOut size={20}/>
            </button>
        </Nav>
    )
}