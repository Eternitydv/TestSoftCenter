import React, { useCallback, useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Filters } from "src/components/Filters";
import { ItemsList } from "src/components/ItemList";
import { Stats } from "src/components/Stats";
import { itemNamesReceipts } from "src/constants";
import { checkType, Receipt } from "../../types";

interface StatsData{
    totalSellReceipts: number;
    totalPaybackReceipts: number;
    totalBonusesGained: number;
    totalBonusesSpent: number;
    highestTotalWithout: number;
    highestTotalWith: number;
    totalSalesWithout: number;
    totalSalesWith: number;
    totalReceipts: number;
}

export const ReceiptsPage = () => {
    const [receipts, setReceipts] = useState<Receipt[]>([]);
    const [statsData, setStatsData] = useState<StatsData>({
        totalSellReceipts: 0,
        totalPaybackReceipts: 0,
        totalBonusesGained: 0,
        totalBonusesSpent: 0,
        highestTotalWithout: 0,
        highestTotalWith: 0,
        totalSalesWithout: 0,
        totalSalesWith: 0,
        totalReceipts: 0,
    });
    const params = useParams();
    const variantFunction = useCallback((check: checkType) => check.type === "SELL" ? "warning" : "info", [])

    useEffect(() => {
        let tempStats: StatsData = {
            totalSellReceipts: 0,
            totalPaybackReceipts: 0,
            totalBonusesGained: 0,
            totalBonusesSpent: 0,
            highestTotalWithout: 0,
            highestTotalWith: 0,
            totalSalesWithout: 0,
            totalSalesWith: 0,
            totalReceipts: 0,
        };

        receipts.forEach((receipt) => {
            if (receipt.total) {
                if (receipt.total > tempStats.highestTotalWithout)
                    tempStats.highestTotalWithout = receipt.total;
                tempStats.totalSalesWithout += +receipt.total;
            }
            if (receipt.totalWithDiscount) {
                if (receipt.totalWithDiscount > tempStats.highestTotalWith)
                    tempStats.highestTotalWith = receipt.totalWithDiscount;
                tempStats.totalSalesWith += +receipt.totalWithDiscount;
            }
            if (receipt.type)
                receipt.type === "PAYBACK"
                    ? tempStats.totalPaybackReceipts++
                    : tempStats.totalSellReceipts++;
            if (receipt.bonus)
                tempStats.totalBonusesGained += +receipt.bonus;
            if (receipt.payment)
                tempStats.totalBonusesSpent += Math.abs(+receipt.payment);     
            tempStats.totalReceipts++;
        });
        setStatsData(tempStats);
    },[receipts])

    return(
        <>
            <Col
            md="2"
            className="pe-0"
            >
                <div className="d-flex flex-column justify-content-start h-100">
                    <Filters 
                    params={params}
                    setFunction={setReceipts}
                    endpoint="receipt"
                    />
                    <Stats
                    {...statsData}
                    />    
                </div>
            </Col>
            <ItemsList
            items={receipts.sort((a, b)=>+a.number - +b.number)}
            itemNames={itemNamesReceipts}
            name="Чек"
            variantFunction={variantFunction}
            idName="number"
            />
        </>
    )
}