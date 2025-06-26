import './App.css'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'

import NotFound from './pages/NotFound'
import Home from './pages/home/page'
import AllProjects from './pages/AllProjects'
import Footer from './components/footer'
import Project from './pages/Project'

function App() {
  const location = useLocation();
  const isNotFound = location.pathname !== '/' &&
    !['/home', '/all-projects'].includes(location.pathname) &&
    !/^\/project\/[^/]+$/.test(location.pathname);

  return (
    <div className='bg-black text-white min-h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black font-sans antialiased overflow-x-hidden'>
      <Routes>
        <Route path='/' element={<Navigate to="/home" replace />} />
        <Route path='/home' element={<Home />} />
        <Route path='/all-projects' element={<AllProjects />} />
        <Route path='/project/:id' element={<Project />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {!isNotFound && <Footer />}
    </div>
  )
}

export default App
