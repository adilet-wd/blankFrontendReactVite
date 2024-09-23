import 'bootstrap/dist/css/bootstrap.css';
import './styles/App.scss';
import './styles/nullstyles.scss';
import {Route, Routes} from "react-router-dom";
import AuthProvider from "./App/auth/authProvider.tsx";

import Layout from "./Components/Layout/Layout.tsx";
import Home from "./Pages/Home/Home.tsx";
import PrivateRoute from "./App/auth/PrivateRoute.tsx";
import Login from "./Pages/Login/Login.tsx";
import Account from "./Pages/Account/Account.tsx";
import Register from "./Pages/Register/Register.tsx";

// Дизайн
// https://www.figma.com/design/2KnxvPD8ktnmoNMbgz4tzj/Lemon?node-id=1-775&node-type=frame&t=VW0yr0CtTqvcCykc-0


function App() {
  return (
      <>
          <AuthProvider>
              <Routes>
                  <Route path="/" element={<Layout />}>
                      <Route path='/' element={<Home />} />
                      <Route path='/auth/login' element={<Login/>}/>
                        <Route path='/auth/register' element={<Register/>}/>
                      <Route element={<PrivateRoute />}>
                          <Route path="/account" element= {<Account />} />
                      </Route>
                      <Route path='*' element={<h1 className={"text-center"}>Not Found</h1>} />
                  </Route>
              </Routes>
          </AuthProvider>
      </>
  )
}

export default App
