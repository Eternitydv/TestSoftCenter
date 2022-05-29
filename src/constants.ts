import React from "react";

export const itemNamesCards = {
    uuid: "ID",
    type_uuid: "Вид карты",
    status: "Статус",
    holder: "Владелец",
    phone: "Номе телефона",
    birthdate: "Дата Рождения",
    created_date: "Время создания карты",
    created_user: "ID ЛК создателя карты",
    created_store_uuid: "ID торговой точки создания карты",
    created_device_uuid: "ID терминала создания карты",
    sales: "Сумма продаж",
    balance: "Баланс",
    number: "Номер карты",
} as const;

export const itemNamesTransactions = {
    uuid: "ID",
    card_uuid: "ID карты",
    delta: "Сумма транзакции",
    state: "Состояние",
    period: "Дата транзакции",
    period_activate: "Дата активации транзакции",
    user_uid: "ID ЛК",
    store_uuid: "ID торговой точки",
    device_uuid: "ID терминала",
    receipt_uuid: "ID связанного чека",
    comment: "Комментарий",
} as const;
export const itemNamesReceipts = {
    uuid: "ID",
    card_uuid: "ID карты",
    user_uid: "ID ЛК",
    type: "Вид",
    period: "Дата чека",
    number: "Номер",
    total: "Сумма без учета скидок и бонусов",
    totalWithDiscount: "Итог",
    bonus: "Начислено бонусов",
    payment: "Потрачено бонусов",
} as const;
export const readonlyFields: {[key: string]: boolean} = {
    created_date: true,
    created_user: true,
    created_store_uuid: true,
    created_device_uuid: true,
    balance: true,
    number: true,
    uuid: true,
};

export const statsFields: {[key: string]: string} = {
    uniqueHolders: "Уникальных держателей",
    totalBalance: "Сумма балансов",
    totalSales: "Сумма продаж",
    totalActive: "Активных карт",
    totalBlocked: "Заблокированных карт",
    totalSellReceipts: "Чеков на продажу",
    totalPaybackReceipts: "Чеков на выплату",
    totalBonusesGained: "Всего бонусов получено",
    totalBonusesSpent: "Всего бонусов потрачено",
    highestTotalWithout: "Максимальный чек без бонусов",
    highestTotalWith: "Максимальный чек с бонусами",
    totalSalesWithout: "Всего без учета скидок и бонусов",
    totalSalesWith: "Всего с учетом скидок и бонусов",
    totalDeltas: "Сумма всех транзакций (округленная)",
    totalCommited: "Транзакций исполнено",
    totalPrepared: "Транзакций подготовлено",
    totalTransactions: "Всего транзакций",
    totalReceipts: "Всего чеков",
    totalCards: "Всего карт",
} as const;