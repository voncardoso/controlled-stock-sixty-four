import { collection, getDocs } from "firebase/firestore";
import {db} from "../../config/index"
import { MagnifyingGlass,  ArrowClockwise} from "phosphor-react";
import { useEffect, useState } from "react";
import { ProductRegistration } from "../../components/ProductRegistration";
import { ContainerInventory, HeaderInventory, TableInventory } from "./style";
import { PaginationComponent } from "../../components/Pagination/Index";
import  useMedia  from "../../Hooks/UseMedia";

interface PropsInventary{
    id: string,
    name: string,
    amount: number,
    value: number,
    date: string,
}




export function Inventory(){
    const [isActive, setIsactive] = useState(false);
    const [dataIventory, setDataInventory] = useState<any>([]);
    const [currentPage, setCurrentPerPage] = useState(0);
    const [itensPerPage, setItensPerPage] = useState(10);
    const [pages, setPages] = useState(0);
    const [currentItens, setCurrentItens] = useState<any>([]);
    
    const mobile = useMedia('(max-width: 31rem)')

    console.log('mobile',mobile)

    useEffect(() =>{
        async function getInvevtory(){
            const collectionRef = collection(db, "Inventory")
            const querySnapshot = await getDocs(collectionRef)
            setDataInventory(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getInvevtory()
    },[])

    useEffect(() => {
        function calcPagination(){
             setPages(Math.ceil(dataIventory.length /  itensPerPage))
            
            const startIndex = currentPage * itensPerPage;
            const endIndex = startIndex + itensPerPage

            setCurrentItens(dataIventory.slice(startIndex, endIndex))
        }
        calcPagination()
    },[dataIventory, currentPage])

    const handleChangePage = (e: object, newPage: number) =>{
        setCurrentPerPage(newPage - 1)
    }

    function handleActiceModal(active: boolean){
        setIsactive(active)
    }
    
    return(
        <>
            <ContainerInventory>
                <HeaderInventory>
                    <div>
                        <input type="text"  placeholder="Pesquisar produto"/>
                        <MagnifyingGlass size={20}/>
                    </div>
                    <button onClick={() =>{
                        handleActiceModal(true)
                    }}>Novo Produto</button>
                </HeaderInventory>

                <TableInventory>
                    <thead>
                          <tr>
                              <th>Produto</th>
                              <th>Valor</th>
                              <th>Data</th>
                              <th style={{textAlign: "center"}}>Quant</th>
                              <th></th>
                          </tr>
                     </thead>

                     {mobile ? 
                        <tbody>
                            {dataIventory.map((inventary: PropsInventary) =>{
                                return(
                                    <tr key={inventary.id}>
                                        <td>{inventary.name}</td>
                                        <td>{inventary.value.toLocaleString('pt-br', {
                                            style: 'currency', currency: 'BRL'
                                        })}</td>
                                        <td>{inventary.date}</td>
                                        <td style={{textAlign: "center",color: inventary.amount > 0 ? '#11e6a6' : '#FF9000'}}>{inventary.amount}</td>
                                        <td><ArrowClockwise size={18}/></td>
                                    </tr>
                                )
                            })}
                        </tbody> 
                        :
                        <tbody>
                            {currentItens.map((inventary: PropsInventary) =>{
                                return(
                                    <tr key={inventary.id}>
                                        <td>{inventary.name}</td>
                                        <td>{inventary.value.toLocaleString('pt-br', {
                                            style: 'currency', currency: 'BRL'
                                        })}</td>
                                        <td>{inventary.date}</td>
                                        <td style={{textAlign: "center",color: inventary.amount > 0 ? '#11e6a6' : '#FF9000'}}>{inventary.amount}</td>
                                        <td><ArrowClockwise/></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    }
                </TableInventory>
                {mobile ? "" : <PaginationComponent pages={pages} handleChangePage={handleChangePage}/>}
            </ContainerInventory >

            <ProductRegistration isActive={isActive}  setIsactive={setIsactive}/>
        </>
    )
}