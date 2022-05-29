import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Alerts } from "src/components/Alerts";
import { ItemsList } from "src/components/ItemList";
import { Stats } from "src/components/Stats";
import { itemNamesCards } from "src/constants";
import { AlertType, CardResponse, CardType, checkType, ErrorResponse } from "../../types";

interface StatsData{
    uniqueHolders: number;
    totalSales: number;
    totalBalance: number;
    totalActive: number;
    totalBlocked: number;
    totalCards: number;
}

export const CardsPage = () => {
    const [cards, setCards] = useState<CardType[]>([]);
    const [alerts, setAlerts] = useState<AlertType[]>([]);
    const [statsData, setStatsData] = useState<StatsData>({
        uniqueHolders: 0,
        totalSales: 0,
        totalBalance: 0,
        totalBlocked: 0,
        totalActive: 0,
        totalCards: 0,
    });

    useEffect(() => {
        axios.get("/api/3rdparty/card", {headers: {"Authorization" : `${process.env.SECRET_KEY}`}})
        .then( (response: CardResponse) => {
            console.log(response.data);
            if (response.data) {
                let uniqueHolders: string[] = [];
                let tempStats: StatsData = {
                    uniqueHolders: 0,
                    totalSales: 0,
                    totalBalance: 0,
                    totalBlocked: 0,
                    totalActive: 0,
                    totalCards: 0,
                };
                response.data.forEach((card) => {
                    if (card.holder && !uniqueHolders.includes(card.holder)){
                        tempStats.uniqueHolders++;
                        uniqueHolders.push(card.holder);
                    }
                    if (card.sales)
                        tempStats.totalSales += +card.sales;
                    if (card.balance)
                        tempStats.totalBalance += +card.balance;
                    if (card.status === "active")
                        tempStats.totalActive++;
                    if (card.status === "blocked")
                        tempStats.totalBlocked++;
                    tempStats.totalCards++;
                });
                setStatsData(tempStats);
                setCards(response.data);
            }
        })
        .catch( (error: ErrorResponse)=>{
            console.log(error.response.data);
        })
    }, []);


    const variantFunction = useCallback((check: checkType) => check.status === "active" ? "primary" : "secondary", []);

    return(
        <>
            <Col
            md="2"
            className="pe-0"
            >
                <div className="d-flex flex-column justify-content-start h-100">
                    <Alerts alerts={alerts} />
                    <Stats
                    {...statsData}
                    />    
                </div>
            </Col>
            <ItemsList
            itemNames={itemNamesCards}
            items={cards.sort((a, b) => +a.number - +b.number)}
            name="Карта"
            idName="number"
            variantFunction={variantFunction}
            editButton={true}
            transactionButton={true}
            receiptButton={true}
            setAlerts={setAlerts}
            alerts={alerts}
            ></ItemsList>
        </>
    )
}
