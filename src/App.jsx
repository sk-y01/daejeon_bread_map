import { Route, Routes } from 'react-router-dom'
import PublicLayout from './layouts/public/PublicLayout'
import AdminLayout from './layouts/admin/AdminLayout'
import MainPage from './pages/public/main/MainPage'
import AdminMainPage from './pages/admin/main/MainPage'
import LoginPage from './pages/login/LoginPage'
import DesignPage from './pages/public/design/DesignPage'
import './App.css'
import './styles/components/_input.scss'
import './styles/components/_buttons.scss'

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
        </Route>
        <Route path='/login' element={ <LoginPage /> } />
      </Routes>
    </>
  )
}

export default App