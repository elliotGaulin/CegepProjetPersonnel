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

function App() {

  const theme = createTheme({
    palette: {
      mode: "light",
    },
  },
    frFR);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/home",
          element: <AuthGuard element={<Home />} />,
        },
        {
          path: "/login",
          element: <UnAuthGuard element={<Login />} />,
        },
        {
          path: "/signup",
          element: <UnAuthGuard element={<SignUp />} />,
        }
      ]
    }]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
