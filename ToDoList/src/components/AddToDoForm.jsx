import { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";

export const AddToDoForm = ({ onAdd, externalError, clearExternalError }) => {
    const [text, setText] = useState("");
    const [localError, setLocalError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!text.trim()) {
            setLocalError("Please type something!");
            return;
        }

        setLocalError("");
        clearExternalError();
        onAdd(text.trim());
        setText("");          
    };

    const handleChange = (e) => {
        setText(e.target.value);
        if (localError) setLocalError("");
        if (externalError) clearExternalError();
    };

    return (
        <form className="add-todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Type a todo..."
                value={text}
                onChange={handleChange}
            />
            <button type="submit">Add</button>
            {localError && <ErrorMessage message={localError} />}
            {externalError && <ErrorMessage message={externalError} />}
        </form>
    );
};
