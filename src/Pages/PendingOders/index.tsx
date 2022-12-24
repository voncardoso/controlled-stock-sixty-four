import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { MagnifyingGlass } from "phosphor-react";
import { useEffect, useState } from "react";
import { PedingOrderRegistration } from "../../components/PedingOrderRegistration/inde";
import { db } from "../../config";
import useMedia from "../../Hooks/UseMedia";
import { ButtonTypePeddingOrder, ContainerPendingOrders, HeaderPendingOrders, TablePendingOrders } from "./style";
import {Check} from "phosphor-react"

interface PropsPeding{
    id: string,
    custumer: string,
    product: string,
    amount: number,
    date: string,
    status: boolean
}

export function PendingOders(){
    const [seach, setSeach] = useState("");
    const [dataPeding, setDataPending] = useState<any>([])
    const [isActive, setIsactive] = useState(false);
    const [isActiveTable, setIsactiveTable] = useState("pendente");
    const [currentPage, setCurrentPerPage] = useState(0);
    const [itensPerPage, setItensPerPage] = useState(10);
    const [currentItens, setCurrentItens] = useState<any>([]);
    const [reload, setReload] = useState(false);
    const [pages, setPages] = useState(0);
    const mobile = useMedia('(max-width: 31rem)')

    useEffect(() =>{
        async function getPedingOders() {
            const collectionRef = collection(db, "PedingOrder")
            const querySnapshot = await getDocs(collectionRef)
            setDataPending(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getPedingOders()
    }, [reload])

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
            setReload(true)
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
                <ButtonTypePeddingOrder>
                    {isActiveTable === "pendente"  ? 
                        <button 
                            style={{background: "#7A1921", color: "white"}}>
                            Pendentes
                        </button> : 
                        <button onClick={() => {
                        setIsactiveTable("pendente")
                        }}>
                            Pendentes
                        </button>
                    }
                    {isActiveTable === "finalizado"  ? 
                        <button style={{background: "#7A1921", color: "white"}}>
                            Finalizados
                        </button> : 
                        <button onClick={() => {
                        setIsactiveTable("finalizado")
                        }}>
                            Finalizados
                        </button>
                    }
                </ButtonTypePeddingOrder>

                {isActiveTable === "pendente" ? 
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
                                        if(item.status === false){
                                            return(
                                                <tr key={item.id}>
                                                    <td>{item.custumer}</td>
                                                    <td >{item.product}</td>
                                                    <td style={{color: "#4EA8DE", textAlign: "center"}}>{item.amount}</td>
                                                    <td>
                                                        <button onClick={() =>{
                                                            handleUpdateStatusPeding(item.id)
                                                        }}>
                                                            <Check size={16}/>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                     })}
                                 </>
                                 :
                                 <>
                                     {currentItens.map((item: PropsPeding) =>{
                                        if(item.status === false){
                                            return(
                                                <tr key={item.id}>
                                                    <td>{item.custumer}</td>
                                                    <td >{item.product}</td>
                                                    <td style={{color: "#4EA8DE", textAlign: "center"}}>{item.amount}</td>
                                                    <td>
                                                        <button onClick={() =>{
                                                            handleUpdateStatusPeding(item.id)
                                                        }}>
                                                            <Check size={16}/>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                     })}
                                 </>
                             }
                         </tbody> 
                         : 
                         <tbody>
                          {filteredProduct.length > 0 ? 
                                 <>
                                     {filteredProduct.map((item: PropsPeding) =>{
                                         if(item.status === false){
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
                                         }
                                     })}
                                 </>
                                 :
                                 <>
                                     {currentItens.map((item: PropsPeding) =>{
                                         if(item.status === false){
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
                                         }
                                     })}
                                 </>
                             }
                         </tbody>
                     }          
                    </TablePendingOrders>
                    :
                    <TablePendingOrders>
                    {mobile ? 
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Produto</th>
                                <th style={{ textAlign: "center"}}>Quant</th>
                                
                            </tr>
                        </thead> 
                        :
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Produto</th>
                                <th>Data</th>
                                <th style={{ textAlign: "center"}}>Quant</th>
                                
                            </tr>
                        </thead>
                    }
                    {mobile? 
                        <tbody>
                            {filteredProduct.length > 0 ? 
                                <>
                                    {filteredProduct.map((item: PropsPeding) =>{
                                        if(item.status === true){
                                            return(
                                                <tr key={item.id}>
                                                    <td style={{width: "45%"}}>{item.custumer}</td>
                                                    <td >{item.product}</td>
                                                    <td style={{color: "#4EA8DE", textAlign: "center"}}>{item.amount}</td>
                                                </tr>
                                            )
                                        }
                                    })}
                                </>
                                :
                                <>
                                    {currentItens.map((item: PropsPeding) =>{
                                        if(item.status === true){
                                            return(
                                                <tr key={item.id}>
                                                    <td style={{width: "45%"}}>{item.custumer}</td>
                                                    <td >{item.product}</td>
                                                    <td style={{color: "#4EA8DE", textAlign: "center"}}>{item.amount}</td>
                                                </tr>
                                            )
                                        }
                                    })}
                                </>
                            }
                        </tbody> 
                        : 
                        <tbody>
                         {filteredProduct.length > 0 ? 
                                <>
                                    {filteredProduct.map((item: PropsPeding) =>{
                                        if(item.status === true){
                                            return(
                                                <tr key={item.id}>
                                                    <td>{item.custumer}</td>
                                                    <td >{item.product}</td>
                                                    <td>{item.date}</td>
                                                    <td style={{color: "#4EA8DE", textAlign: "center"}}>{item.amount}</td>

                                                </tr>
                                            )
                                        }
                                    })}
                                </>
                                :
                                <>
                                    {currentItens.map((item: PropsPeding) =>{
                                        if(item.status === true){
                                            return(
                                                <tr key={item.id}>
                                                    <td>{item.custumer}</td>
                                                    <td >{item.product}</td>
                                                    <td>{item.date}</td>
                                                    <td style={{color: "#4EA8DE", textAlign: "center"}}>{item.amount}</td>
                                                </tr>
                                            )
                                        }
                                    })}
                                </>
                            }
                        </tbody>
                    }
                    
                    </TablePendingOrders>
                }
            </ContainerPendingOrders>

            <PedingOrderRegistration isActive={isActive}  setIsActive={setIsactive}/>
        </>
    )
}

