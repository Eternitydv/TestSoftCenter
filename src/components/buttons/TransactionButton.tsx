import React, { useCallback } from "react";
import { Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TransactionSVG } from "../../assets/icons";
import './tooltip.css';

export const TransactionButton = ({cardId}: {cardId: string | undefined})=>{
    const navigate = useNavigate(); 
    const handleClickTransaction = useCallback((uuid: string | undefined)=> () =>{
        navigate(`/transactions/${uuid}`)
    },[navigate]);
    return (
        <div className="custom-tooltip">
            <Button
            variant="outline-secondary"
            size="sm"
            className="p-0"
            onClick={handleClickTransaction(cardId)}
            >
                <TransactionSVG/>
            </Button>    
            <span className="tooltip__text">Транзакции</span>
        </div>
    )
}