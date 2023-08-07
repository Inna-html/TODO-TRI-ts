import { useState, useEffect } from 'react';
import { Todo } from './types'

interface AppProps {
  init: Todo[];
}

const App = ({ init }: AppProps) => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState(init);
  const [filter, setFilter] = useState('');
  const counter = todos.filter(todo => !todo.done).length;

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <div className="input">
        <i className="input--icon fa-solid fa-check-double"></i>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => {
            if (input && e.key === "Enter") {
              setTodos([{ text: input, done: false }, ...todos]);
              setInput('');
            }
          }}
        />
      </div>

      <div className="todos" data-filter={filter}>
        {todos.map((todo, currentIndex) => (
          <div className="todo" key={`${currentIndex}:${todos.length}`}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={({ target: { checked } }) => {
                setTodos(todos.map((todo, i) => i !== currentIndex ? todo : { ...todo, done: checked }));
              }}
            />
            <div className="todo--title">{todo.text}</div>
            <i
              className="todo--remove fa-solid fa-trash"
              onClick={() => {
                setTodos(todos.filter((_, i) => i !== currentIndex));
              }}
            />
          </div>
        ))}
      </div>

      <div className="status">
        <div className="status--counter"> {counter} items left</div>

        <div className="status--filter" onChange={(e) => setFilter((e.target as HTMLInputElement).value)}>
          <label>ALL<input value="" type="radio" name="filter" defaultChecked={true} /> </label>
          <label>ACTIVE<input value="active" type="radio" name="filter" /> </label>
          <label>DONE<input value="done" type="radio" name="filter" /> </label>
        </div>

        <div
          className="status--clear"
          onClick={() => {
            setTodos(todos.filter((todo) => !todo.done));
          }}
        >Clear completed</div>
      </div>
    </>
  )
}

export default App
