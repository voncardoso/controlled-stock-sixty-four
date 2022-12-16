import { Outlet } from "react-router-dom";
import { Header } from "../Header/index";

export function DefaultLayout(){
    return (
        <section>
          <Header />
          <Outlet />
        </section>
      )
}