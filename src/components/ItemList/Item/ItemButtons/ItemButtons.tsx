import React, { SetStateAction } from "react";
import { SubmitEditButton, EditButton, ReceiptButton, TransactionButton } from "src/components/buttons";
import { Transaction, Receipt, CardType, AlertType } from "src/types";

interface Props{
    edit?: boolean;
    receipt?: boolean;
    transaction?: boolean;
    cardId: string | undefined;
    setEditing: React.Dispatch<SetStateAction<boolean>>;
    editing: Boolean;
    item: Transaction | Receipt | CardType;
    setAlerts?: React.Dispatch<SetStateAction<AlertType[]>>;
    alerts?: AlertType[];
}

export const ItemButtons = ({edit = false, receipt = false, transaction = false, cardId, setEditing, editing, item, setAlerts, alerts}: Props)=>{
    return(
        <div className="pb-1">
            {editing && <SubmitEditButton item={item as CardType} setAlerts={setAlerts} alerts={alerts} />}
            {edit && <EditButton setEditing={setEditing} editing={editing} />}
            {receipt && <ReceiptButton cardId={cardId}/>}
            {transaction && <TransactionButton cardId={cardId}/>}
        </div>
    )
}