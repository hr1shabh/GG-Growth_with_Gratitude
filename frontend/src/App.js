import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Login from './pages/login/login.jsx';
import Register from './pages/register/register.jsx';
import Navbar from './components/navbar/navbar.jsx';
import RightBar from './components/rightBar/rightBar.jsx';
import Home from './pages/home/home.jsx';
import Profile from './pages/profile/profile.jsx';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/authContext.js';

function App() {
    const { currentUser, loading } = useAuth();

    const Layout = () => {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex flex-1">
                    <main className="flex-grow">
                        <Outlet />
                    </main>
                    <aside className="w-64 sticky top-0 h-screen overflow-y-auto bg-white shadow-lg mr-4">
                        <RightBar />
                    </aside>
                </div>
            </div>
        );
    };

    const ProtectedRoute = ({ children }) => {
        if (loading) {
            return <div>Loading...</div>; // Show a loading spinner while checking auth state
        }

        if (!currentUser) {
            return <Navigate to="/login" />;
        }

        return children;
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <ProtectedRoute><Home /></ProtectedRoute>,
                },
                {
                    path: "/profile/:id",
                    element: <ProtectedRoute><Profile /></ProtectedRoute>,
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