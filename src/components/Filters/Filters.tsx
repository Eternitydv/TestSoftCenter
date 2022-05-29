import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { ErrorResponse, ReceiptResponse, TransactionResponse } from "../../types";

type ChangeEvent = React.ChangeEventHandler<HTMLInputElement>;
interface Props {
    setFunction: React.Dispatch<React.SetStateAction<any[]>>;
    params: {cardId?: string};
    endpoint: string;
}

export const Filters = ({ setFunction, params, endpoint }: Props) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState(`${new Date().toISOString().substring(0, 10)}`);
    const [cardId, setCardId] = useState(params.cardId ? params.cardId : "");

    const getCurrentTime = useCallback(() => Math.floor(Date.now() / 1000), []);
    const convertToTimestamp = useCallback((date: string) => Math.floor(new Date(date).getTime() / 1000), []);

    const handleChangeFrom: ChangeEvent = useCallback(e => {
        setFrom(e.target.value);
    }, []);
    const handleChangeTo: ChangeEvent = useCallback(e => {
        setTo(e.target.value);
    }, []);
    const handleChangeCardId: ChangeEvent = useCallback( e => setCardId(e.target.value), [])

    useEffect(()=>{
        axios.get(`/api/3rdparty/${endpoint}`, {
            params: { from: 0, to: getCurrentTime(), card_uuid: params.cardId },
            headers: { "Authorization": `${process.env.SECRET_KEY}` }
        })
        .then((response: TransactionResponse | ReceiptResponse)=>{
            if(response.data)
                setFunction(response.data);
        })
        .catch((error: ErrorResponse)=>{
            console.log(error.response.data);
        });
    }, [endpoint, params.cardId, setFunction]);
    
    const getData = useCallback(()=>{
        axios.get(`/api/3rdparty/${endpoint}`, {
            params: {
                from: from ? convertToTimestamp(from) : 0,
                to: to ? convertToTimestamp(to) : getCurrentTime(),
                card_uuid: params.cardId
            },
            headers: { "Authorization": `${process.env.SECRET_KEY}` }
        })
        .then((response: TransactionResponse | ReceiptResponse)=>{
            if(response.data)
                setFunction(response.data);
        })
        .catch((error: ErrorResponse)=>{
            console.log(error.response.data);
        });
    },[endpoint, from, to, params.cardId, setFunction]);

    return(
            <div className="mt-2 ms-2">
                <InputGroup size="sm">
                    <InputGroup.Text>От</InputGroup.Text>
                    <FormControl
                    type="date"
                    placeholder="От"
                    onChange={handleChangeFrom}
                    value={from}
                    />
                </InputGroup>
                <InputGroup size="sm">
                    <InputGroup.Text>До</InputGroup.Text>
                    <FormControl
                    type="date"
                    placeholder="До"
                    onChange={handleChangeTo}
                    value={to}
                    />
                </InputGroup>
                <InputGroup size="sm">
                    <InputGroup.Text>ID карты</InputGroup.Text>
                    <FormControl
                    type="text"
                    value={cardId}
                    onChange={handleChangeCardId}
                    >

                    </FormControl>
                </InputGroup>
                <div className="d-grid">
                    <Button
                    variant="outline-primary"
                    onClick={getData}
                    >
                        Применить
                    </Button>
                </div>
            </div>
    )
}