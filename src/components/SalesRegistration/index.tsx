import { db } from "../../config/index"
import { FormEvent, useEffect, useState } from "react"
import { X } from "phosphor-react"
import { ContainerSales, ContainerSalesForm } from "./style"
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore"
import { async } from "@firebase/util"

interface PropsInventary{
    id: string,
    name: string,
    amount: number,
    value: number,
    date: string,
}


interface PropsModal {
    isActive: boolean,
    setIsactive: (isActive: boolean) => void
}



export function SalesRegistration({isActive,  setIsactive}: PropsModal){
    const [dataIventory, setDataInventory] = useState<any>([])
    const [id, setId] = useState("")
    const [amount, setAmount] = useState<any>(0)
    const [money, setMoney] = useState("")
    const filter = dataIventory.filter((item: any) => item.id === id)
    const [teste, setTeste] = useState<Boolean>(false)
    let disebladAmount: boolean = false;

    useEffect(() =>{
        async function getInvevtory(){
            const collectionRef = collection(db, "Inventory")
            const querySnapshot = await getDocs(collectionRef)
            setDataInventory(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getInvevtory()
    },[])



    useEffect(() =>{
        if(filter.length > 0){
            if(+amount <= +filter[0].amount){
                console.log("menor")
                disebladAmount = false
            }else{
               
                disebladAmount = true
            }
        }
        setTeste(disebladAmount)
    }, [amount])
    

    function handleActiveModal(active: boolean){
        setIsactive(active)
    } 

    async function handleSubmit(event: FormEvent){
        event.preventDefault()
        const SalesRef = doc(db, "Inventory", id);
        const date = new Date()
        try{
            await updateDoc(SalesRef, {
                amount: (filter[0].amount - Number(amount))
            })
            try{
                const docRef = await addDoc(collection(db, "Sales"), {
                    name: filter[0].name,
                    money: Number(money),
                    amount: Number(amount),
                    date: new Intl.DateTimeFormat('en-US').format(date)
                })
    
                setId("")
                setAmount(0)
                setMoney("")
            }catch{
    
            }
        }catch{
    
        }
    }


    return(
        <ContainerSales
            style={{display: isActive ? "flex" : "none"}}
        >
            <ContainerSalesForm onSubmit={handleSubmit}>
                <div>
                    <X size={20} onClick={() =>{
                        handleActiveModal(false)
                    }}/>
                </div>
                <h1>Cadastrar Vendas</h1>
                <label htmlFor="">
                    Produto
                    <select 
                        name="product" 
                        id=""
                        value={id}
                        onChange={(item) => setId(item.target.value)}
                    >
                        <option  value=" ">Selecione</option>
                        {dataIventory.map((item: PropsInventary) =>{
                            return(
                               <>
                                    {item.amount > 0 ? <option key={item.id} value={item.id}>{item.name}</option> : ""}
                               </>
                            )
                        })}

                    </select>
                </label>
                <label htmlFor="amount">Quantidade</label>     
                <input 
                    id="amount"
                    name="amount"
                    type="number" 
                    value={amount}
                    onChange={(event) => Number(setAmount(event.target.value))} 
                />
                  
                <label htmlFor="money">Valor</label>
                <input 
                    type="text" 
                    value={money}
                    onChange={(item) => setMoney(item.target.value)}
                    list="money-suggestions"
                />

                <datalist id="money-suggestions">
                    {filter.length ? <option value={`${filter[0].value}`}></option> : ""}
                    
                </datalist>
                {teste === true ?  
                    <button type="submit" disabled={teste === true}>Quantidade indisponivel</button> 
                    : 
                    <button type="submit">Cadastrar venda</button>}
                
            </ContainerSalesForm>

        </ContainerSales>
    )
}