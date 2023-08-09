import './App.css';
import Home from './Pages/Home';
import { CssBaseline, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { frFR } from '@mui/material/locale';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthGuard from './Guards/AuthGuard';
import Login from './Pages/Login';
import { AuthProvider } from './Context/useAuth';
import UnAuthGuard from './Guards/UnAuthGuard';
import SignUp from './Pages/SignUp';
import Layout from './Components/Layout';
import Cat from './Pages/Cat';
import File from './Pages/File';

function App() {

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  },
    frFR);

  //Définition des routes de l'application
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <AuthGuard element={<Home />} />,
        },
        {
          path: "/login",
          element: <UnAuthGuard element={<Login />} />,
        },
        {
          path: "/signup",
          element: <UnAuthGuard element={<SignUp />} />,
        },
        {
          path: "/cat",
          element: <Cat />
        },
        {
          path: "/files/:id",
          element: <AuthGuard element={<File />} />,
        },
        {
          path: "*",
          element: <h1>404</h1>,
        }
      ]
    }]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
