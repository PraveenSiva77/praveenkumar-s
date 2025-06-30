import { Component } from "react";
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import Toaster from './components/Toaster'
import './App.css'

class App extends Component {
    render() {
        return (
            <div className='bg-black text-white min-h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black font-sans antialiased overflow-x-hidden'>
                <RouterProvider router={router} />
                <Toaster />
            </div>
        );
    }
}

export default App;
