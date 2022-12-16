import { collection, getDocs } from "firebase/firestore";
import {db} from "../../config/index"
import { MagnifyingGlass,  ArrowClockwise} from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
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
    const [filteredProduct, setFilteredProduct] = useState<[]>([]) 
    const [seach, setSeach] = useState("") 
    const mobile = useMedia('(max-width: 31rem)')
    const [reload, setReload] = useState(false)

    useEffect(() =>{
        async function getInvevtory(){
            const collectionRef = collection(db, "Inventory")
            const querySnapshot = await getDocs(collectionRef)
            setDataInventory(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getInvevtory()
        setReload(false)
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

    function FilterItem(event){
        setSeach(event.target.value)
        if(seach.length > 0){
            console.log("foi")
            setFilteredProduct(
                dataIventory.filter((item: PropsInventary) => item.name.toString().toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
            )
        }
    }

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
                        <input 
                            type="text"  
                            placeholder="Pesquisar produto"
                            value={seach}
                            onChange={FilterItem}
                        />
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
                              {mobile ? "" : <th></th>}
                          </tr>
                     </thead>

                     {mobile ? 
                        <tbody>
                            {filteredProduct.length > 0 ? 
                                <>
                                    {filteredProduct.map((inventary: PropsInventary) =>{
                                        return(
                                            <tr key={inventary.id}>
                                                <td>{inventary.name}</td>
                                                <td>{inventary.value.toLocaleString('pt-br', {
                                                    style: 'currency', currency: 'BRL'
                                                })}</td>
                                                <td>{inventary.date}</td>
                                                <td style={{textAlign: "center",color: inventary.amount > 0 ? '#11e6a6' : '#FF9000'}}>{inventary.amount}</td>
                                                {mobile ? "" :  <td className="iconUpdate"><ArrowClockwise/></td>}
                                            </tr>
                                        )
                                    })} 
                                </> : 
                                <>
                                    {dataIventory.map((inventary: PropsInventary) =>{
                                        return(
                                            <tr key={inventary.id}>
                                                <td>{inventary.name}</td>
                                                <td>{inventary.value.toLocaleString('pt-br', {
                                                    style: 'currency', currency: 'BRL'
                                                })}</td>
                                                <td>{inventary.date}</td>
                                                <td style={{textAlign: "center",color: inventary.amount > 0 ? '#11e6a6' : '#FF9000'}}>{inventary.amount}</td>
                                                {mobile ? "" :  <td className="iconUpdate"><ArrowClockwise/></td>}
                                            </tr>
                                        )
                                    })} 
                                </>
                            } 
                        </tbody> 
                        :
                        <tbody>
                            {seach.length > 0 ? 
                                <>
                                    {filteredProduct.map((inventary: PropsInventary) =>{
                                        return(
                                            <tr key={inventary.id}>
                                                <td>{inventary.name}</td>
                                                <td>{inventary.value.toLocaleString('pt-br', {
                                                    style: 'currency', currency: 'BRL'
                                                })}</td>
                                                <td>{inventary.date}</td>
                                                <td style={{textAlign: "center",color: inventary.amount > 0 ? '#11e6a6' : '#FF9000'}}>{inventary.amount}</td>
                                               {mobile ? "" :  <td className="iconUpdate"><ArrowClockwise/></td>}
                                            </tr>
                                        )
                                    })}
                                </> 
                                : 
                                <>
                                    {currentItens.map((inventary: PropsInventary) =>{
                                        return(
                                            <tr key={inventary.id}>
                                                <td>{inventary.name}</td>
                                                <td>{inventary.value.toLocaleString('pt-br', {
                                                    style: 'currency', currency: 'BRL'
                                                })}</td>
                                                <td>{inventary.date}</td>
                                                <td style={{textAlign: "center",color: inventary.amount > 0 ? '#11e6a6' : '#FF9000'}}>{inventary.amount}</td>
                                               {mobile ? "" :  <td className="iconUpdate"><ArrowClockwise/></td>}
                                            </tr>
                                        )
                                    })}
                                </>
                            }
                        </tbody>
                    }
                </TableInventory>

                {mobile ? "" : <>{seach.length > 0 ? "" : <PaginationComponent  pages={pages} handleChangePage={handleChangePage}/>}</>}
                    
                    
                
                
            </ContainerInventory >

            <ProductRegistration isActive={isActive}  setIsactive={setIsactive} setReload={setReload}/>
        </>
    )
}