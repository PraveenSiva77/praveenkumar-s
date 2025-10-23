import { io, Socket } from "socket.io-client";

class SocketService {
    private socket: Socket | null = null;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private maintenanceCallbacks: Set<(data: any) => void> = new Set();

    connect() {
        if (this.socket?.connected) {
            console.log("Socket already connected");
            return;
        }

        // Get socket URL from environment variable or use production default
        const socketUrl = import.meta.env.VITE_SOCKET_URL || "https://api.praveensiva.me";

        // Connect to the backend socket server
        this.socket = io(socketUrl, {
            transports: ["websocket", "polling"],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: this.maxReconnectAttempts,
        });

        this.setupListeners();
    }

    private setupListeners() {
        if (!this.socket) return;

        this.socket.on("connect", () => {
            console.log("Socket connected:", this.socket?.id);
            this.reconnectAttempts = 0;
        });

        this.socket.on("disconnect", (reason: string) => {
            console.log("Socket disconnected:", reason);
        });

        this.socket.on("connect_error", (error: Error) => {
            console.error("Socket connection error:", error);
            this.reconnectAttempts++;
            
            if (this.reconnectAttempts >= this.maxReconnectAttempts) {
                console.error("Max reconnection attempts reached");
                this.disconnect();
            }
        });

        // Maintenance mode events
        this.socket.on("maintenance:init", (data: any) => {
            console.log("Maintenance init:", data);
            this.notifyMaintenanceCallbacks(data);
        });

        this.socket.on("maintenance:update", (data: any) => {
            console.log("Maintenance update:", data);
            this.notifyMaintenanceCallbacks(data);
        });

        this.socket.on("maintenance:clear", () => {
            console.log("Maintenance cleared");
            this.notifyMaintenanceCallbacks(null);
        });

        this.socket.on("error", (error: Error) => {
            console.error("Socket error:", error);
        });
    }

    private notifyMaintenanceCallbacks(data: any) {
        this.maintenanceCallbacks.forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error("Error in maintenance callback:", error);
            }
        });
    }

    onMaintenanceUpdate(callback: (data: any) => void) {
        this.maintenanceCallbacks.add(callback);
        
        // Return cleanup function
        return () => {
            this.maintenanceCallbacks.delete(callback);
        };
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
        this.maintenanceCallbacks.clear();
    }

    isConnected(): boolean {
        return this.socket?.connected ?? false;
    }

    getSocket(): Socket | null {
        return this.socket;
    }
}

// Export singleton instance
export const socketService = new SocketService();
export default socketService;
