import { Collapse } from "bootstrap";
import React, { SetStateAction, useCallback, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Transaction, CardType, Receipt, AlertType } from "src/types";
import { InfoList } from "./InfoList";
import { ItemButtons } from "./ItemButtons";

interface Props{
    item: Transaction | CardType | Receipt;
    itemNames: {[item: string]: string};
    name: string;
    idName: keyof Transaction | keyof CardType | keyof Receipt;
    variantFunction: (inp: Transaction | CardType | Receipt)=>string;
    editButton?: boolean;
    transactionButton?: boolean;
    receiptButton?: boolean;
    setAlerts?: React.Dispatch<SetStateAction<AlertType[]>>;
    alerts?: AlertType[];
}

export const Item = ({item, itemNames, name, idName, variantFunction, editButton, transactionButton, receiptButton, setAlerts, alerts}: Props)=>{

    const [editing, setEditing] = useState(false);

    const handleClickItem = useCallback((id: string | undefined)=>() => {
        if(id){
            const myCollapse = document.getElementById(id);
            if (myCollapse !== null){
                const bsCollapse = new Collapse(myCollapse, {toggle: false});
                myCollapse.classList.contains("show") ? bsCollapse.hide() : bsCollapse.show();
            }
        }
    },[]);

    return(
        <ListGroup.Item
        as="li"
        active={false}
        className="p-1 text-start"
        key={item[idName as keyof typeof item]}
        eventKey={item[idName as keyof typeof item]}
        variant={variantFunction(item)}
        action
        >
            <div
            className="d-flex flex-row"
            style={{cursor: "pointer"}}
            >
                <div
                className="flex-fill"
                onClick={handleClickItem(item[idName as keyof typeof item])}
                >     
                    {`${name} ${item[idName as keyof typeof item]}`}
                </div>
                <div className="d-flex">
                    <ItemButtons
                    cardId={item.uuid}
                    edit={editButton}
                    receipt={receiptButton}
                    transaction={transactionButton}
                    setEditing={setEditing}
                    editing={editing}
                    item={item}
                    setAlerts={setAlerts}    
                    alerts={alerts}
                    />
                </div>
            </div>
            <InfoList
            itemNames={itemNames}
            idName={idName}
            item={item}
            editing={editing}    
            />
        </ListGroup.Item>
    )
}
