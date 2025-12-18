import { Route, Routes } from 'react-router-dom'
import PublicLayout from './layouts/public/PublicLayout'
import AdminLayout from './layouts/admin/AdminLayout'
import MainPage from './pages/public/main/MainPage'
import AdminMainPage from './pages/admin/main/AdminDashboardPage'
import LoginPage from './pages/login/LoginPage'
import DesignPage from './pages/public/design/DesignPage'
import './App.css'
import './styles/components/_input.scss'
import './styles/components/_buttons.scss'
import BakeryListPage from './pages/admin/bakery/BakeryListPage'
import BakeryFormPage from './pages/admin/bakery/BakeryFormPage'
import BakeryDeleteHistoryPage from './pages/admin/bakery/BakeryDeleteHistoryPage'
import TestApi from './pages/test/TestApi'
import JoinPage from './pages/login/JoinPage'

import "./styles/components/_header.scss";
import "./styles/main.scss";

import "./styles/admin/_layout.scss";
import "./styles/admin/_sidebar.scss";
import "./styles/admin/_bakery-list.scss";
import "./styles/admin/_bakery-form.scss";
import "./styles/admin/_dashboard.scss";
import "./styles/admin/_bakery-delete-history.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={ <PublicLayout /> }>
          <Route index element={ <MainPage /> } />
          <Route path='design' element={ <DesignPage /> } />
        </Route>

        <Route path='/admin' element={ <AdminLayout /> }>
          <Route index element={ <AdminMainPage /> } />

          <Route path='bakery' element={<BakeryListPage />} />
          <Route path='bakery/form' element={<BakeryFormPage />} />
          <Route path='bakery/form/:id' element={<BakeryFormPage />} />
          <Route path="bakery/delete-history" element={<BakeryDeleteHistoryPage />} />
        </Route>

        <Route path='/login' element={ <LoginPage /> } />
        <Route path='/join' element={ <JoinPage /> } />
        <Route path='/test' element={ <TestApi /> } />
      </Routes>
    </>
  )
}

export default App