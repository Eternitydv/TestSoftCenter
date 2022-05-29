import React, { useCallback } from "react";
import { Col, Container, Nav, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

export const SideBar = ()=>{
    const navigate = useNavigate();
    const handleClickNavCards = useCallback(()=>navigate('/cards'), []);
    const handleClickNavTransactions = useCallback(()=>navigate('/transactions'), []);
    const handleClickNavReceipts = useCallback(() => navigate('/receipts'), []);
    const location = useLocation();
    return(
        <Col
            md="2"
            className="ps-0"
        >
            <Nav
            className="flex-column text-end"
            as="ul"
            style={{ cursor: "pointer" }}
            variant="pills"
            >
                <Nav.Item className="text-center">
                    <Nav.Link
                        active={location.pathname.includes("cards")}
                        onClick={handleClickNavCards}
                        as="li"
                        className="btn btn-primary p-1"
                    >
                        Карты
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        active={location.pathname.includes("transactions")}
                        onClick={handleClickNavTransactions}
                        as="li"
                        className="btn btn-primary p-1"
                    >
                        Транзакции
                    </Nav.Link>    
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        active={location.pathname.includes("receipts")}
                        onClick={handleClickNavReceipts} 
                        as="li"
                        className="btn btn-primary p-1"
                    >
                        Чеки
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </Col>
    )
}