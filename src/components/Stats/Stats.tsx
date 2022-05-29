import React from "react";
import { ListGroup } from "react-bootstrap";
import { statsFields } from "src/constants";

interface Props{
    [key: string]: string | number;
}

export const Stats = (props: Props) => {
    return (
        <ListGroup
        variant="flush"
        className="mt-5"
        >
            <div>
                {
                    Object.entries(props).map(([key, value], index) => (
                        <ListGroup.Item className="p-1" key={index}>
                            {`${statsFields[key]}: ${typeof value ==='number' ? Math.floor(value) : value}`}
                        </ListGroup.Item>
                    ))
                }
            </div>
        </ListGroup>
    )
}