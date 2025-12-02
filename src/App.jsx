import { Route, Routes } from 'react-router-dom'
import PublicLayout from './layouts/public/PublicLayout'
import AdminLayout from './layouts/admin/AdminLayout'
import MainPage from './pages/public/main/MainPage'
import AdminMainPage from './pages/admin/main/MainPage'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={ <PublicLayout /> }>
          <Route index element={ <MainPage /> } />
        </Route>
        <Route path='/admin' element={ <AdminLayout /> }>
          <Route index element={ <AdminMainPage /> } />
        </Route>
      </Routes>
    </>
  )
}

export default App