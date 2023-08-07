import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Todo } from './types'

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);
const init: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
root.render(<App init={init} />);
