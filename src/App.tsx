import React, { useState } from 'react';
import { NavLink, Outlet, Route, Routes } from 'react-router-dom';
import Home from 'pages/home';
import Users from 'pages/users';
import logo from './assets/images/logo.webp';
import './App.scss';

const Layout = ({
  darkMode,
  toggleDarkMode,
}: {
  darkMode: boolean;
  toggleDarkMode: () => void;
}) => (
  <div className={`layout-container ${darkMode ? 'dark-mode' : ''}`}>
    <header className="header">
      <img alt="Company Logo" className="logo" src={logo} />
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/users">Users</NavLink>
          </li>
        </ul>
        <button onClick={toggleDarkMode} className="toggle-dark-mode-button">
          Toggle Dark Mode
        </button>
      </nav>
    </header>
    <main>
      <Outlet />
    </main>
    <footer className="footer">
      <p>&copy; 2024 Your Company</p>
      <p>
        <a href="/privacy">Privacy Policy</a> |{' '}
        <a href="/terms">Terms of Service</a>
      </p>
    </footer>
  </div>
);

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <Routes>
      <Route
        element={<Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
      >
        <Route element={<Home />} path="/" />
        <Route element={<Users />} path="/users" />
      </Route>
    </Routes>
  );
};

export default App;
