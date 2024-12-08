import logo from './logo.svg';
import Login from './pages/login/login.jsx';
import Register from './pages/register/register.jsx';
import { BrowserRouter as Router, Route, Routes, createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css';
import LeftBar from './components/leftBar/leftBar.jsx';
import Navbar from './components/navbar/navbar.jsx';
import RightBar from './components/rightBar/rightBar.jsx';
import Home from './pages/home/home.jsx';
import Profile from './pages/profile/profile.jsx';


function App() {

  const Layout = () => {
    return (
      <div>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <Outlet />
          <RightBar />
        </div>
      </div>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
