export interface CardType{
    uuid: string;
    type_uuid?: string;
    number: string;
    status?: "active" | "blocked";
    holder?: string;
    phone?: string;
    birthdate?: string;
    created_date?: number | string;
    created_user?: string;
    create_store_uuid?: string;
    created_device_uuid?: string;
    sales?: number;
    balance?: number;
}

export type CardResponse = { data: CardType[];}

export interface ErrorResponse{
    response:{
        data: {
            code: number;
            message: string;
            data: {
                description: string;
            }
        }
    }
}

export interface Transaction{
    uuid: string;
    card_uuid: string;
    delta: number;
    state?: "prepared" | "commited";
    period: number;
    period_activate?: number;
    user_uid?: string;
    store_uuid?: string;
    device_uuid?: string;
    receipt_uuid?: string;
    comment?: string;
}
export type TransactionResponse = {data: Transaction[];}

export interface Receipt{
    uuid?: string;
    user_uid?: string;
    card_uuid?: string;
    type?: "SELL" | "PAYBACK";
    number: number;
    period?: number;
    total?: number;
    totalWithDiscount?: number;
    bonus?: number;
    payment?: number;
}

export type ReceiptResponse = { data: Receipt[];}

export type checkType = {
    state?: string | undefined; 
    status?: string | undefined; 
    type?: string | undefined
}

export type AlertType = {
    message: string;
    variant: string;
}