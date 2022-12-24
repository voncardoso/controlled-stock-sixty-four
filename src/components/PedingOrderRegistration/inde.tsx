import { async } from "@firebase/util";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { X } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react"
import { db } from "../../config";
import { ContainerPedingRegistration, PedingRegistrationForm } from "./style";

interface PropsInventary{
    id: string,
    name: string,
    amount: number,
    value: number,
    date: string,
}

interface PropsModal {
    isActive: boolean,
    setIsActive: (isActive: boolean) => void
}

export function PedingOrderRegistration({isActive,  setIsActive}: PropsModal){
    const [dataIventory, setDataInventory] = useState<any>([])
    const [pedingNameCustomers, setPedingNameCustomers] = useState("");
    const [pedingNameProduct, setPedingNameProduct] = useState("");
    const [pedingAmount, setPedingAmount] = useState<any>(0);

    useEffect(() =>{
        async function getInvevtory(){
            const collectionRef = collection(db, "Inventory")
            const querySnapshot = await getDocs(collectionRef)
            setDataInventory(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            
        }
        getInvevtory()
    },[])

    function handleActiveModal(event: FormEvent){
        event.preventDefault()
        setIsActive(false)
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const date = new Date()

        try{
            const docRef = await addDoc(collection(db, "PedingOrder"), {
                custumer: pedingNameCustomers,
                product: pedingNameProduct,
                amount: Number(pedingAmount),
                status: false,
                date: new Intl.DateTimeFormat('pt-BR').format(date),
            })

            setPedingAmount(0)
            setPedingNameProduct("")
            setPedingNameCustomers("")
        }catch (e){
            console.error("Error adding document: ", e);
        }
    }

    return(
        <ContainerPedingRegistration
            style={{display: isActive ? "flex" : "none"}}   
        >
            <PedingRegistrationForm 
                onSubmit={handleSubmit}
            >
                <div>
                    <X size={20} onClick={handleActiveModal} />
                </div>
                <h1>Cadastrar pedido</h1>
                <label htmlFor="Customers">Nome do Cliente</label>
                <input 
                    id="Customers"
                    name="Customers"
                    type="text" 
                    value={pedingNameCustomers}
                    onChange={(event) => setPedingNameCustomers(event.target.value)}    
                />

                <label htmlFor="product">Nome do produto</label>
                <input 
                    name="product" 
                    id="product" 
                    type="text" 
                    value={pedingNameProduct}
                    onChange={(event) => setPedingNameProduct(event.target.value)}
                    list="product-suggestions"
                />

                <datalist id="product-suggestions">
                    {dataIventory.length ? 
                    <>
                        {dataIventory.map((item: PropsInventary) =>{
                           return(
                            <option key={item.id} value={`${item.name}`}></option>
                           )
                        })}
                    </> : ""}
                    
                </datalist>

                <label htmlFor="">Quantidade</label>
                <input 
                    name="amount" 
                    id="amount" 
                    type="number" 
                    value={pedingAmount}
                    onChange={(event) => setPedingAmount(event.target.value)}
                />

                <button type="submit">Cadastrar</button>
            </PedingRegistrationForm>
        </ContainerPedingRegistration>
    )
}