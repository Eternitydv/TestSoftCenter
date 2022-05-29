import React, { SetStateAction } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { Transaction, CardType, Receipt, AlertType } from "src/types";

import { Item } from "./Item";

interface Props {
    items: Transaction[] | CardType[] | Receipt[];
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

export const ItemsList = (props: Props)=> {
    const { items, ...propsChild } = props;
    return(
        <Col md={8}>
            <ListGroup as="ul">
                {
                    items.map((item: Transaction | CardType | Receipt)=>(
                        <Item key={item.uuid} {...{...propsChild, item}} ></Item>
                    ))
                }
            </ListGroup>
        </Col>
    )
}
