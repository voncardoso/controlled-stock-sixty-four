import { MagnifyingGlass } from "phosphor-react";
import { useState } from "react";
import { PedingOrderRegistration } from "../../components/PedingOrderRegistration/inde";
import { PedingRegistrationForm } from "../../components/PedingOrderRegistration/style";
import { ContainerPendingOrders, HeaderPendingOrders, TablePendingOrders } from "./style";

export function PendingOders(){
    const [seach, setSeach] = useState("");
    const [dataPeding, setDataPending] = useState<any>([])
    const [isActive, setIsactive] = useState(false);


    function handleActiceModal(active: boolean){
        setIsactive(active)
    }
    return(
        <>
            <ContainerPendingOrders>
                <HeaderPendingOrders>
                    <div>
                        <input 
                            type="text"  
                            placeholder="Pesquisar venda"
                            value={seach}
                            onChange={(event) => setSeach(event.target.value)}
                        />
                            <MagnifyingGlass size={20}/>
                        </div>
                    <button onClick={() =>{
                        handleActiceModal(true)
                    }}>
                        Nova Pedido
                    </button>
                </HeaderPendingOrders>
                <TablePendingOrders>
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>produro</th>
                            <th>Quantidade</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                </TablePendingOrders>
            </ContainerPendingOrders>

            <PedingOrderRegistration isActive={isActive}  setIsActive={setIsactive}/>
        </>
    )
}

