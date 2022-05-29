import React from "react";
import { Alert } from "react-bootstrap";
import { AlertType } from "src/types";


export const Alerts = (({ alerts }: {alerts: AlertType[]}) => {
    return (
        <>
            {
                alerts.map((alert, index) => (
                    <Alert
                    key={index}
                    variant={alert.variant}
                    dismissible
                    >
                        {alert.message}
                    </Alert>
                ))
            }
        </>
    )
})