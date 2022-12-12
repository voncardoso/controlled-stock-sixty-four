import { collection, getDocs } from "firebase/firestore";
import {db} from "../../config/index"
import { MagnifyingGlass } from "phosphor-react";
import { useEffect, useState } from "react";
import { ProductRegistration } from "../../components/ProductRegistration";
import { ContainerInventory, HeaderInventory, TableInventory } from "./style";

interface PropsInventary{
    id: string,
    name: string,
    amount: number,
    value: number,
    date: string,
}

export function Inventory(){
    const [isActive, setIsactive] = useState(false);
    const [dataIventory, setDataInventory] = useState<any>([])

    useEffect(() =>{
        async function getInvevtory(){
            const collectionRef = collection(db, "Inventory")
            const querySnapshot = await getDocs(collectionRef)
            setDataInventory(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getInvevtory()
    },[])

    function handleActiceModal(active: boolean){
        setIsactive(active)
    }
    console.log(dataIventory)
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
                              <th>Quant</th>
                          </tr>
                     </thead>
                     <tbody>
                        {dataIventory.map((inventary: PropsInventary) =>{
                            return(
                                <tr key={inventary.id}>
                                    <td>{inventary.name}</td>
                                    <td>{inventary.value.toLocaleString('pt-br', {
                                        style: 'currency', currency: 'BRL'
                                    })}</td>
                                    <td>{inventary.date}</td>
                                    <td style={{color: inventary.amount > 0 ? '#11e6a6' : '#FF9000'}}>{inventary.amount}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </TableInventory>
            </ContainerInventory >

            <ProductRegistration isActive={isActive} setIsactive={setIsactive}/>
        </>
    )
}