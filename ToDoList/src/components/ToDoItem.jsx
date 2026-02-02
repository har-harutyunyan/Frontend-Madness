export const ToDoItem = ({text, id, completed, onRemove, onComplete}) => {
    return <div className={`todo-item ${completed ? 'completed' : ''}`}> 
        <h3>{text}</h3>
        <button className="delete-btn" onClick = {() => onRemove(id)}>Delete</button>
        <button className="complete-btn"  onClick = {() => onComplete(id)}>Complete</button>
    </div>
}