import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Layout from "./app/layout/Layout";
import NotFound from './pages/NotFound';
import Dashboard from './components/Dashboard';
import PrivateRoute from "./PrivateRoute";
import Profile from "./components/Profile";

export const router = createBrowserRouter ([
    {
        path: "/",
        element: <Layout />, // navbar, footer, etc
        children: [
            //rotas publicas
            { index: true, element: <Home />},
            { path: "*", element: <NotFound />},

            // rotas protegidas
            {
                element: <PrivateRoute />,
                children: [
                    { path: "perfil", element: <Profile />},
                    { path: "dashboard", element: <Dashboard />}
                ]
            }
            // { path: "/dashboard", element: <Dashboard />}
        ],
    },
])