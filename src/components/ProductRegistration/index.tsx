import { FormEvent, useState } from "react";
import { X } from "phosphor-react"
import { db } from "../../config/index"
import { ContainerResgistration, ContainerResgistrationForm } from "./style";
import { addDoc, collection } from "firebase/firestore";

interface PropsModal {
    isActive: boolean,
    setIsactive: (isActive: boolean) => void
}

export function ProductRegistration({isActive,  setIsactive}: PropsModal){ 
    const [productsName, setProductsName] = useState("");
    const [productaAmount, setProductAmount] = useState<any>(0);
    const [productaDate, setProductDate] = useState("");
    const [productaValue, setProductValue] = useState("");
    

    function handleActiveModal(event: FormEvent){
        event.preventDefault()
        setIsactive(false)
    }

    async function handleSubmit(event: FormEvent){
        event.preventDefault();
        const date = new Date()
        try{
            const docRef = await addDoc(collection(db, "Inventory"), {
                name: productsName,
                value: Number(productaValue),
                date: new Intl.DateTimeFormat('pt-BR').format(date),
                amount: Number(productaAmount)
            })

            setProductAmount(0)
            setProductDate("")
            setProductValue("")
            setProductsName("")
        }catch (e){
            console.error("Error adding document: ", e);
        }
    }


    return(
        <ContainerResgistration 
            style={{display: isActive ? "flex" : "none"}}
        >
            <ContainerResgistrationForm onSubmit={handleSubmit}>
                <div>
                    <X size={20} onClick={handleActiveModal} />
                </div>
                <h1>Cadastrar produto</h1>
                <label htmlFor="">Nome do produto</label>
                <input 
                    type="text" 
                    value={productsName}
                    onChange={(event) => setProductsName(event.target.value)}
                />

                <label htmlFor="">Valor</label>
                <input 
                    type="text" 
                    value={productaValue}
                    onChange={(event) => setProductValue(event.target.value)}
                />

                <label htmlFor="">Quantidade</label>
                <input 
                    type="number" 
                    value={productaAmount}
                    onChange={(event) => Number(setProductAmount(event.target.value))}
                />

                <button type="submit">Cadastrar</button>
            </ContainerResgistrationForm>
        </ContainerResgistration>
    )
}