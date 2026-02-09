import Button from './Button';

function ToDoItem({ todo, onToggle, onDelete }) {
    // todo - object for each tasks (id, text, completed)
    // onToggle - function that needs to be called when checkbox is clicked
    // onDelete - function to call when delete btn is clicked

    return(

        <div className="todo-item">
            // Checkbox to toggle status
            <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={onToggle}
            />

            // Todo text with conditional strikethrough styling if completed
            <span
                style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    marginLeft: '10px',
                    marginRight: '10px'
                }}
            >
            </span>

            // Delete btn using our reusable btn component
            <Button text="Delete" onClick={onDelete} />

        </div>

    );
}


export default ToDoItem;