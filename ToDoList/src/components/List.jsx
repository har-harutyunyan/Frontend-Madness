import { ToDoItem } from "./ToDoItem"

export const List = ({items, onRemove, onComplete}) => {
    return <div className="todo-list">
        {
         items.map(item => <ToDoItem  
            key = {item.id}
            onRemove = {onRemove}
            onComplete = {onComplete}
            {...item} // bad practice because of overfetching - receiving more parameters than is needed
                      // and underfetching is the opposite
            />)
        }
    </div>
}