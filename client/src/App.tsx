
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
import { CheckComponent } from './pages/home/Check';
import Register from './pages/Register/Register';
import { GrammarComponent } from './pages/home/Grammar';
import { AnalyticComponent } from './pages/home/Analytics';
import AccountComponent from './pages/account/Account';
import { ReportComponent } from './pages/account/report/Report';
import AdminPage from './pages/account/admin/AdminPage';
import GroupsPage from './pages/account/group/Group';
import { GroupDetailPage } from './pages/account/group/Groupdetail';
import GroupAccountComponent from './pages/account/group/GroupAccount';
import LoadingRedirectPage from './pages/loading/LoadingPage';
import LoadingRedirectPageGroup from './pages/loading/LoadingPageGroup';


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
          <Route path='register' element={<Register />} />
          <Route path='check' element={<CheckComponent />} />
          <Route path='grammar' element={<GrammarComponent />} />
          <Route path='analytics' element={<AnalyticComponent />} />
          <Route path='activate/:activationCode' element={<LoadingRedirectPage />} />
          <Route path='groups/:groupId/:username' element={<LoadingRedirectPageGroup />} />
          <Route path='account' element={<AccountComponent />} />
          <Route path='group/:id' element={<GroupAccountComponent />} />
          <Route path='group/file/:id' element={<GroupAccountComponent />} />
          <Route path='group/check/:id' element={<GroupAccountComponent />} />
          <Route path='group/analytic/:id' element={<GroupAccountComponent />} />
          <Route path='account/*' element={<AccountComponent />} />
          {user.user.role === "ROLE_ADMIN" ?
            <Route path='admin' element={<AdminPage />} /> : <></>
          }

          <Route path="*" element={
            <HomeComponent />
          } />
        </Routes>
      </Layout>
    </BrowserRouter >
  );
}

export default App;
