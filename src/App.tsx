import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import Toaster from './components/Toaster'
import './App.css'
import { HelmetProvider } from 'react-helmet-async'

function App() {
  return (
    <div className='bg-black text-white min-h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black font-sans antialiased overflow-x-hidden'>
      <HelmetProvider>
        <RouterProvider router={router} />
        <Toaster />
      </HelmetProvider>
    </div>
  )
}

export default App
