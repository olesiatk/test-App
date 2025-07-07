import { Outlet, NavLink, useLocation, Link } from 'react-router-dom'
import { FaTasks, FaCheckCircle, FaCircle, FaPlus } from 'react-icons/fa'
import './App.css'
import { useIframeBridge } from '../utils/useIframeBridge' // або './useIframeBridge'


function App() {
  useIframeBridge();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const completeParam = searchParams.get('complete');
  
  return (
    <div className="app-container">
      <header>
        <h1><FaTasks /> Task Manager</h1>
        <nav>
          <ul>
            <li>
              <Link 
                to="/" 
                className={completeParam === null ? 'active' : ''}
              >
                <FaTasks /> All Books
              </Link>
            </li>
            <li>
              <Link 
                to="/?complete=false" 
                className={completeParam === 'false' ? 'active' : ''}
              >
                <FaCircle /> Open Tasks
              </Link>
            </li>
            <li>
              <Link 
                to="/?complete=true" 
                className={completeParam === 'true' ? 'active' : ''}
              >
                <FaCheckCircle /> Completed Tasks
              </Link>
            </li>
            <li>
              <NavLink to="/add" className="add-task-button">
                <FaPlus /> Add Task
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Book Manager App</p>
        <a target="_top"href='https://react.dev/'>Link to React</a>
        <br />
        <a target="_blank" href='https://angular.dev/'>Link to Angular</a>
      </footer>
    </div>
  )
}

export default App
