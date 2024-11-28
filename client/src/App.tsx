
import { useEffect } from 'react';
import './App.css';

import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Login from './pages/Login/Login';
import { useAppDispatch, useAppSelector } from './hooks';
import { isAuth, getUser } from './redux/utils/auth'
import { auth } from './redux/reducers/UserSlice';
import { RootState } from './store';
import LogOut from './pages/Login/LogOut';
import { HomeComponent } from './pages/home/Home';
import RegisterForm from './pages/Login/RegisterForm';


function App() {
  axios.defaults.baseURL = 'http://localhost:8080/'
  useEffect(() => {
    if (isAuth()) {
      let user = getUser();
      dispatch(auth(user))
    }
  }, [])

  const user = useAppSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch();

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="logOut" element={<LogOut />} />
          <Route path="home" element={<HomeComponent />} />
          <Route path='register' element={<RegisterForm/>}/>
          {/* <Route path="account" element={
            <>{
              user.user.role?.toLocaleLowerCase() === 'role_user' ?
                <Student />
                :
                user.user.role?.toLocaleLowerCase() === 'role_teacher' ?
                  <TeacherComponent />
                  :
                  user.user.role?.toLocaleLowerCase() === 'role_department' ?
                    <DepartmentComponentMain />
                    :
                    user.user.role?.toLocaleLowerCase() === 'role_admin' ?
                      <AdminComponent />
                      :
                      <>
                        No auth
                      </>
            }</>
          } /> */}


          <Route path="*" element={
            <HomeComponent />
          } />
        </Routes>
      </Layout>
    </BrowserRouter >
  );
}

export default App;
