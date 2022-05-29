import React, { SetStateAction, useCallback } from "react";
import { Button } from "react-bootstrap";
import { EditSVG } from "src/assets/icons";
import './tooltip.css'

export const EditButton = ({ setEditing, editing }: { setEditing:React.Dispatch<SetStateAction<boolean>>;  editing: Boolean})=>{
    const handleClick = useCallback(() => {
        setEditing(!editing);
        console.log(editing);
    }, [editing, setEditing]);

    return (
        <div className="custom-tooltip">
            <Button
            variant="outline-secondary"
            size="sm"
            className="p-0"
            onClick={handleClick}
            >
                <EditSVG/>
            </Button>
            <span className="tooltip__text">Редактировать</span>
        </div>
    )
}