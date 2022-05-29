import React, { useCallback } from "react";
import { Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ReceiptSVG } from "../../assets/icons";
import './tooltip.css';


export const ReceiptButton = ({cardId} : {cardId: string | undefined})=>{
    const navigate = useNavigate();
    //  clown module doesn't work 
    // const renderTooltip = (props: any) => (
    //     <Tooltip id="button-tooltip" {...props}>
    //         Чеки
    //     </Tooltip>
    // );
    const handleclickReceipt = useCallback( (uuid: string | undefined) => () =>{
        navigate(`/receipts/${uuid}`)
    },[navigate]);
    return(
        // <OverlayTrigger
        // placement='bottom'
        // delay={{show: 400, hide: 250}}
        // overlay={renderTooltip}
        // >
        <div className="custom-tooltip">

            <Button
            variant="outline-secondary"
            size="sm"
            className="p-0 mx-1"
            onClick={handleclickReceipt(cardId)}
            >
                <ReceiptSVG/>
            </Button>
            <span className="tooltip__text">Чеки</span>
        </div>
        // </OverlayTrigger>
    )
}