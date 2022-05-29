import React, { useCallback, useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Filters } from "src/components/Filters";
import { ItemsList } from "src/components/ItemList";
import { Stats } from "src/components/Stats";
import { itemNamesTransactions } from "src/constants";
import { Transaction, checkType } from "src/types";

interface StatsData{
    totalDeltas: number;
    totalCommited: number;
    totalPrepared: number;
    totalTransactions: number;
}

export const TransactionsPage = ()=> {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const params = useParams();
    const [statsData, setStatsData] = useState<StatsData>({
        totalDeltas: 0,
        totalCommited: 0,
        totalPrepared: 0,
        totalTransactions: 0,
    });

    useEffect(() => {
        let tempStats = {
        totalDeltas: 0,
        totalCommited: 0,
        totalPrepared: 0,
        totalTransactions: 0,
    };
        transactions.forEach((transaction) => {
            if (transaction.state)
                transaction.state === "commited" ? tempStats.totalCommited++ : tempStats.totalPrepared++;
            if (transaction.delta)
                tempStats.totalDeltas += +transaction.delta;
            tempStats.totalTransactions++;
        });
        setStatsData(tempStats);
    }, [transactions]);

    const variantFunction = useCallback((check: checkType)=>(check.state === "prepared" ? "primary" : "success"), [])

    return(
        <>
            <Col
            md="2"
            className="pe-0"
            >
                <div className="d-flex flex-column justify-content-start h-100">
                    <Filters
                    params={params}
                    setFunction={setTransactions}
                    endpoint="transaction"
                    />  
                    <Stats
                    {...statsData}
                    />    
                </div>
            </Col>
            <ItemsList
            itemNames={itemNamesTransactions}
            items={transactions.sort((a, b)=>a.period - b.period)}
            name="Транзакция"
            idName="uuid"
            variantFunction={variantFunction}
            />
        </>
    )
}
