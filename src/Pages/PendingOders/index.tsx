import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { MagnifyingGlass } from "phosphor-react";
import { useEffect, useState } from "react";
import { PedingOrderRegistration } from "../../components/PedingOrderRegistration/inde";
import { db } from "../../config";
import useMedia from "../../Hooks/UseMedia";
import { ContainerPendingOrders, HeaderPendingOrders, TablePendingOrders } from "./style";
import {Check} from "phosphor-react"

interface PropsPeding{
    id: string,
    custumer: string,
    product: string,
    amount: number,
    date: string,
}

export function PendingOders(){
    const [seach, setSeach] = useState("");
    const [dataPeding, setDataPending] = useState<any>([])
    const [isActive, setIsactive] = useState(false);
    const [currentPage, setCurrentPerPage] = useState(0);
    const [itensPerPage, setItensPerPage] = useState(10);
    const [currentItens, setCurrentItens] = useState<any>([]);
    const [pages, setPages] = useState(0);
    const mobile = useMedia('(max-width: 31rem)')

    useEffect(() =>{
        async function getPedingOders() {
            const collectionRef = collection(db, "PedingOrder")
            const querySnapshot = await getDocs(collectionRef)
            setDataPending(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getPedingOders()
    }, [])

    useEffect(() => {
        function calcPagination(){
             setPages(Math.ceil(dataPeding.length /  itensPerPage))
            
            const startIndex = currentPage * itensPerPage;
            const endIndex = startIndex + itensPerPage

            setCurrentItens(dataPeding.slice(startIndex, endIndex))
        }
        calcPagination()
    },[dataPeding, currentPage])

    const filteredProduct = dataPeding.filter((item: PropsPeding) => item.custumer.toString().toLocaleLowerCase().includes(seach))

    async function handleUpdateStatusPeding(id: string){
        const pedingRef = doc(db, "PedingOrder", id)
        try{
            await updateDoc(pedingRef, {
                status: true
            })
        }catch{
    
        }
    }
    
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
                    {mobile ? 
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Produto</th>
                                <th style={{ textAlign: "center"}}>Quant</th>
                                <th></th>
                            </tr>
                        </thead> 
                        :
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Produto</th>
                                <th>Data</th>
                                <th style={{ textAlign: "center"}}>Quant</th>
                                <th></th>
                            </tr>
                        </thead>
                    }
                    {mobile? 
                        <tbody>
                            {filteredProduct.length > 0 ? 
                                <>
                                    {filteredProduct.map((item: PropsPeding) =>{
                                        return(
                                            <tr key={item.id}>
                                                <td>{item.custumer}</td>
                                                <td >{item.product}</td>
                                                <td style={{color: "#4EA8DE", textAlign: "center"}}>{item.amount}</td>
                                                <td>
                                                    <button onClick={() =>{
                                                        handleUpdateStatusPeding(item.id)
                                                    }}>
                                                        <Check />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </>
                                :
                                <>
                                    {currentItens.map((item: PropsPeding) =>{
                                        return(
                                            <tr key={item.id}>
                                                <td>{item.custumer}</td>
                                                <td >{item.product}</td>
                                                <td style={{color: "#4EA8DE", textAlign: "center"}}>{item.amount}</td>
                                                <td>
                                                    <button onClick={() =>{
                                                        handleUpdateStatusPeding(item.id)
                                                    }}>
                                                        <Check />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </>
                            }
                        </tbody> 
                        : 
                        <tbody>
                         {filteredProduct.length > 0 ? 
                                <>
                                    {filteredProduct.map((item: PropsPeding) =>{
                                        return(
                                            <tr key={item.id}>
                                                <td>{item.custumer}</td>
                                                <td >{item.product}</td>
                                                <td>{item.date}</td>
                                                <td style={{color: "#4EA8DE", textAlign: "center"}}>{item.amount}</td>
                                                <td>
                                                    <button onClick={() =>{
                                                        handleUpdateStatusPeding(item.id)
                                                    }}>
                                                        Finalizar
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </>
                                :
                                <>
                                    {currentItens.map((item: PropsPeding) =>{
                                        return(
                                            <tr key={item.id}>
                                                <td>{item.custumer}</td>
                                                <td >{item.product}</td>
                                                <td>{item.date}</td>
                                                <td style={{color: "#4EA8DE", textAlign: "center"}}>{item.amount}</td>
                                                <td>
                                                    <button onClick={() =>{
                                                        handleUpdateStatusPeding(item.id)
                                                    }}>
                                                        Finalizar
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </>
                            }
                        </tbody>
                    }
                    
                </TablePendingOrders>
            </ContainerPendingOrders>

            <PedingOrderRegistration isActive={isActive}  setIsActive={setIsactive}/>
        </>
    )
}

