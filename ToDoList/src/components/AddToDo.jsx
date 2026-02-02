import { AddToDoForm } from "./AddToDoForm";
import { useState } from "react";

export const AddToDo = ({ onAdd }) => {
    const [externalError, setExternalError] = useState("");

    const handleAdd = (text) => {
        if (!text) return;

        const added = onAdd(text);

        if (added === false) {
            setExternalError("This todo already exists!");
        } else {
            setExternalError("");
        }
    };

    const clearExternalError = () => setExternalError("");

    return (
        <AddToDoForm
            onAdd={handleAdd}
            externalError={externalError}
            clearExternalError={clearExternalError}
        />
    );
};
