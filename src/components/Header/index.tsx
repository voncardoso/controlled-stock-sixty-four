import {NavLink } from "react-router-dom";
import { SignOut } from "phosphor-react";
import LogoSvg from "../../assets/LogoSVG.svg"
import { Nav } from "./style";

interface ActiveLink {
    isActive: boolean;
    isPending: boolean; 
}

export function Header(){
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
                    to="/home">
                        Home
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
            <button>
                Sair
                <SignOut size={20}/>
            </button>
        </Nav>
    )
}