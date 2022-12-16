import { collection, getDocs } from "firebase/firestore";
import { MagnifyingGlass } from "phosphor-react";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { PaginationComponent } from "../../components/Pagination/Index";
import { SalesRegistration } from "../../components/SalesRegistration";
import { db } from "../../config";
import useMedia from "../../Hooks/UseMedia";
import { ContainerSales, HeaderSales, TableSales } from "./style";

interface PropsSales{
    id: string,
    name: string,
    amount: number,
    money: number,
    date: string,
}

export function Sales(){
    const [isActive, setIsactive] = useState(false);
    const [dataSales, setDateSales] = useState<any>([])
    const [currentPage, setCurrentPerPage] = useState(0);
    const [itensPerPage, setItensPerPage] = useState(10);
    const [pages, setPages] = useState(0);
    const [currentItens, setCurrentItens] = useState<any>([]);
    const [filteredProduct, setFilteredProduct] = useState<[]>([]) 
    const mobile = useMedia('(max-width: 31rem)')
    const [seach, setSeach] = useState("")


    useEffect(() => {
        async function  getSales() {
            const collectionRef = collection(db, "Sales")
            const querySnapshot = await getDocs(collectionRef)
            setDateSales(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getSales()
    }, [])

    useEffect(() => {
        function calcPagination(){
             setPages(Math.ceil(dataSales.length /  itensPerPage))
            
            const startIndex = currentPage * itensPerPage;
            const endIndex = startIndex + itensPerPage

            setCurrentItens(dataSales.slice(startIndex, endIndex))
        }
        calcPagination()
    },[dataSales, currentPage])

    function FilterItem(event){
        setSeach(event.target.value)
        if(seach.length > 0){
            console.log("foi")
            setFilteredProduct(
                dataSales.filter((item: PropsSales) => item.name.toString().toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
            )
        }
    }

    function handleActiceModal(active: boolean){
        setIsactive(active)
    }
    const handleChangePage = (e: object, newPage: number) =>{
        setCurrentPerPage(newPage - 1)
    }
    return (
        <>
            <ContainerSales>
                <HeaderSales>
                    <div>
                        <input 
                            type="text"  
                            placeholder="Pesquisar venda"
                            value={seach}
                            onChange={FilterItem}
                        />
                        <MagnifyingGlass size={20}/>
                    </div>
                    <button onClick={() =>{
                        handleActiceModal(true)
                    }}>Nova Venda</button>
                </HeaderSales>

                <TableSales >
                    <thead>
                        <tr>
                            <th>Produto vendido</th>
                            <th>Valor</th>
                            <th>Date</th>
                            <th>Quant</th>
                        </tr>
                    </thead>
                    {mobile ? 
                    <tbody>
                        {filteredProduct.length > 0 ?
                            <>
                                {filteredProduct.map((item: any) =>{
                                    return(
                                       <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.money.toLocaleString('pt-br', {
                                                            style: 'currency', currency: 'BRL'
                                                        })}</td>
                                            <td>{item.date}</td>
                                            <td style={{color: "#11e6a6"}}>{item.amount}</td>
                                       </tr>
                                    )
                                })}
                            </>
                            :
                            <>
                                {currentItens.map((item: any) =>{
                                    return(
                                       <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.money.toLocaleString('pt-br', {
                                                            style: 'currency', currency: 'BRL'
                                                        })}</td>
                                            <td>{item.date}</td>
                                            <td style={{color: "#11e6a6"}}>{item.amount}</td>
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
                                {filteredProduct.map((item: any) =>{
                                return(
                                   <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.money.toLocaleString('pt-br', {
                                                        style: 'currency', currency: 'BRL'
                                                    })}</td>
                                        <td>{item.date}</td>
                                        <td style={{color: "#11e6a6"}}>{item.amount}</td>
                                   </tr>
                                )
                                })}
                            </>
                            :
                            <>
                                {currentItens.map((item: any) =>{
                                    return(
                                       <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.money.toLocaleString('pt-br', {
                                                            style: 'currency', currency: 'BRL'
                                                        })}</td>
                                            <td>{item.date}</td>
                                            <td style={{color: "#11e6a6"}}>{item.amount}</td>
                                       </tr>
                            )
                        })}
                            </>
                        }
                    </tbody>    
                }
                    
                </TableSales >
                {mobile ? "" : <>{seach.length > 0 ? "" : <PaginationComponent  pages={pages} handleChangePage={handleChangePage}/>}</>}
            </ContainerSales>
            <SalesRegistration isActive={isActive} setIsactive={setIsactive} />
        </>
    )
}