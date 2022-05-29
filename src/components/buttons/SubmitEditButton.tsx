import axios from "axios";
import React, { SetStateAction, useCallback } from "react";
import { Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import { AlertType, CardResponse, CardType, ErrorResponse } from "src/types";
import { EditSubmitSVG } from "src/assets/icons";
import './tooltip.css';


interface Props{
    item: CardType;
    setAlerts?: React.Dispatch<SetStateAction<AlertType[]>>;
    alerts?: AlertType[]
}

export const SubmitEditButton = ({ item, setAlerts, alerts}: Props) => {

    const dismissAlert = useCallback((alert: AlertType) => {
        window.setTimeout(() => {
            if (alerts && setAlerts) {
                const temp = [...alerts];
                temp.filter((iter) => iter.message != alert.message);
                setAlerts(temp);
            }
        }, 5000);
    }, [alerts, setAlerts]);

    const handleClick = useCallback(() => {
        if (item.created_date)
            item.created_date = Math.floor(new Date(item.created_date).getTime() / 1000);
        if (item.balance)
            item.balance = +item.balance;
        if (item.sales)
            item.sales = +item.sales;
        
        axios.post('/api/3rdparty/card', item, { headers: { "Authorization": `${process.env.SECRET_KEY}` } })
            .then((response: CardResponse) => {
                const newAlert = { message: "Карта успешно обновлена!", variant: "success" };
                if (alerts && setAlerts) {
                    const temp = [...alerts];
                    temp.push(newAlert);
                    setAlerts(temp);
                    dismissAlert(newAlert);
                }
            })
            .catch((error: ErrorResponse) => {
                const newAlert = { message: error.response.data.message, variant: "danger" }
                if (alerts && setAlerts) {
                    const temp = [...alerts];
                    temp.push(newAlert);
                    setAlerts(temp);
                    dismissAlert(newAlert);
                }
            });
    }, [alerts, setAlerts, dismissAlert]);

    return (
        <div className="custom-tooltip">
        <Button
        variant="success"
        size="sm"
        className="p-0 me-1"
        onClick={handleClick}
        >
                <EditSubmitSVG/>
        </Button>
            <span className="tooltip__text">Сохранить изменения</span>
        </div>
    )
}