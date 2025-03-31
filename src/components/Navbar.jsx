"use client"
import { useNavigate } from "react-router-dom"
import "../CSS/navbar.css"

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate("/login")
  }

  const navItems = ["Home", "About", "Contact", "Services"]
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="https://img.icons8.com/ios-filled/50/000000/developer.png" alt="Developer Logo" />
      </div>
      <ul className="nav-links">
        {navItems.map((item, index) => (
          <li key={index} className="nav-item">
            <a href={`#${item.toLowerCase()}`}>{item}</a>
          </li>
        ))}
        <li className="nav-item">
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar

