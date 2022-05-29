import React, { useCallback, useState } from "react";
import { ListGroupItem, ListGroup, InputGroup, FormControl } from "react-bootstrap";
import { readonlyFields } from "src/constants";
import { Transaction, Receipt, CardType } from "src/types";

type ItemType = Transaction | Receipt | CardType;

interface Props {
    itemNames: {[item: string]: string};
    item: ItemType;
    idName: string;
    editing: boolean;
}

type InputFields<T> = {
    [key in keyof T]: T[key];
};

export const InfoList = ({item, itemNames, idName, editing} : Props)=>{

    const [inputFields, setInputFields] = useState<InputFields<ItemType>>(item);

    const handleChange = useCallback((key: keyof ItemType)=>(e: React.ChangeEvent<HTMLInputElement>) =>{
        let temp = {...inputFields};
        temp[key] = e.target.value;
        setInputFields(temp);
    }, [inputFields, setInputFields]);

    const handleAdditionalInfo = useCallback((item: ItemType)=>(
        Object.entries(item)
        .filter((entry)=>itemNames[entry[0]])
        .map(([key, value] : [string, any], index) => {
            let type = "text";
            if ((key === "created_date" || key.includes("period")) && !isNaN(new Date(value*1000).valueOf())) {
                type = "date"
                if(value){
                    value = `${new Date(value*1000).toISOString().substring(0, 10)}`;
                }
                else {
                    value = '--/--/--'
                    type="text"
                }
            }
            if(value)
                inputFields[key as keyof ItemType] = value;
            else
                inputFields[key as keyof ItemType] = '';


            return(
                <ListGroupItem className='p-0' key={index} >
                    <InputGroup>
                        <InputGroup.Text>
                            {`${itemNames[key]}:`}
                        </InputGroup.Text>
                        <FormControl
                        value={inputFields[key as keyof ItemType]}
                        type={type}
                        onChange={handleChange(key as keyof ItemType)}
                        disabled={!editing || readonlyFields[key]}
                        />
                    </InputGroup>
                </ListGroupItem>
            )
        })
    ), [handleChange, idName, inputFields, itemNames, editing]);

    return(
        <div className='collapse' id={item[idName as keyof typeof item]}>
            <div>
                <ListGroup className="text-start pt-1">
                    {
                        handleAdditionalInfo(inputFields)
                    }
                </ListGroup>

            </div>
        </div>

    )
}
