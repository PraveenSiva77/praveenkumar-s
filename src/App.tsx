import { Component } from "react";
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import Toaster from './components/Toaster'
import Maintenance from './pages/Maintenance'
import socketService from './services/socket'
import './App.css'

interface IAppState {
    isMaintenanceMode: boolean;
    maintenanceData: any | null;
    checkingMaintenance: boolean;
}

class App extends Component<{}, IAppState> {
    private maintenanceUnsubscribe: (() => void) | null = null;

    state: IAppState = {
        isMaintenanceMode: false,
        maintenanceData: null,
        checkingMaintenance: true,
    };

    async componentDidMount() {
        // Check initial maintenance status
        await this.checkMaintenanceStatus();

        // Connect to Socket.IO for real-time updates
        socketService.connect();

        // Subscribe to maintenance updates
        this.maintenanceUnsubscribe = socketService.onMaintenanceUpdate((data) => {
            if (data) {
                this.setState({
                    isMaintenanceMode: data.active || false,
                    maintenanceData: data,
                });
            } else {
                // Maintenance cleared
                this.setState({
                    isMaintenanceMode: false,
                    maintenanceData: null,
                });
            }
        });
    }

    componentWillUnmount() {
        // Clean up socket connection
        if (this.maintenanceUnsubscribe) {
            this.maintenanceUnsubscribe();
        }
        socketService.disconnect();
    }

    checkMaintenanceStatus = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL || "https://api.praveensiva.me/api";
            const response = await fetch(`${apiUrl}/maintenance`);
            
            if (response.ok) {
                const data = await response.json();
                
                if (data && data.active) {
                    this.setState({
                        isMaintenanceMode: true,
                        maintenanceData: data,
                        checkingMaintenance: false,
                    });
                } else {
                    this.setState({
                        isMaintenanceMode: false,
                        maintenanceData: null,
                        checkingMaintenance: false,
                    });
                }
            } else {
                // If endpoint doesn't exist or returns error, assume no maintenance
                this.setState({
                    isMaintenanceMode: false,
                    maintenanceData: null,
                    checkingMaintenance: false,
                });
            }
        } catch (error) {
            console.error("Error checking maintenance status:", error);
            // On error, allow normal access
            this.setState({
                isMaintenanceMode: false,
                maintenanceData: null,
                checkingMaintenance: false,
            });
        }
    };

    render() {
        const { isMaintenanceMode, maintenanceData, checkingMaintenance } = this.state;

        // Show loading spinner while checking maintenance status
        if (checkingMaintenance) {
            return (
                <div className="bg-black text-white min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-zinc-400">Loading...</p>
                    </div>
                </div>
            );
        }

        // Show maintenance page if maintenance mode is active
        if (isMaintenanceMode) {
            return (
                <div className='bg-black text-white min-h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black font-sans antialiased overflow-x-hidden'>
                    <Maintenance maintenanceData={maintenanceData} />
                    <Toaster />
                </div>
            );
        }

        // Show normal app
        return (
            <div className='bg-black text-white min-h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black font-sans antialiased overflow-x-hidden'>
                <RouterProvider router={router} />
                <Toaster />
            </div>
        );
    }
}

export default App;
