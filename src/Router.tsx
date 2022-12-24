import { Route } from "react-router";
import { Routes, useNavigate } from "react-router-dom";
import { DefaultLayout } from "./components/DefaultLayout";
import { ProtectedRouter } from "./components/ProtectedRouter";
import {  Sales } from "./Pages/Sales";
import { Inventory } from "./Pages/Inventory";
import { Login } from "./Pages/Login/index";
import { PendingOders } from "./Pages/PendingOders";

export function Router(){

    return(
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/vendas" element={
                    <ProtectedRouter>
                        <Sales />
                    </ProtectedRouter>}
                />
                <Route path="/estoque" element={
                    <ProtectedRouter>
                        <Inventory />
                    </ProtectedRouter>}
                />
                <Route path="/pedidos" element={
                    <ProtectedRouter>
                        <PendingOders />
                    </ProtectedRouter>}
                />
            </Route>
        </Routes>
    )
}