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
        <h1><FaTasks /> Book Manager</h1>
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
                <FaCircle /> Wants To Read
              </Link>
            </li>
            <li>
              <Link 
                to="/?complete=true" 
                className={completeParam === 'true' ? 'active' : ''}
              >
                <FaCheckCircle /> Completed Books
              </Link>
            </li>
            <li>
              <NavLink to="/add" className="add-task-button">
                <FaPlus /> Add Book
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
      </footer>
    </div>
  )
}

export default App
