import { Component } from "react";
import { IoConstruct, IoTime } from "react-icons/io5";
import Particles from "../components/particles";

export interface MaintenanceData {
    message?: string;
    startAt?: string;
    endAt?: string;
    schedule?: string;
    active?: boolean;
}

export interface IMaintenanceProps {
    maintenanceData?: MaintenanceData | null;
}

export interface IMaintenanceState {
    email: string;
    subscribed: boolean;
    loading: boolean;
    error: string | null;
    timeRemaining: {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    };
    maintenanceData: MaintenanceData | null;
}

class Maintenance extends Component<IMaintenanceProps, IMaintenanceState> {
    private countdownInterval: NodeJS.Timeout | null = null;

    state: IMaintenanceState = {
        email: "",
        subscribed: false,
        loading: false,
        error: null,
        timeRemaining: {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        },
        maintenanceData: this.props.maintenanceData || null,
    };

    componentDidMount() {
        // If no prop data provided, fetch from API
        if (!this.props.maintenanceData) {
            this.fetchMaintenanceData();
        }
        this.startCountdown();
    }

    componentDidUpdate(prevProps: IMaintenanceProps) {
        // Update state if prop changes
        if (this.props.maintenanceData !== prevProps.maintenanceData) {
            this.setState({ maintenanceData: this.props.maintenanceData || null });
        }
    }

    componentWillUnmount() {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }
    }

    fetchMaintenanceData = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL || "https://api.praveensiva.me/api";
            const response = await fetch(`${apiUrl}/maintenance`);
            if (response.ok) {
                const data = await response.json();
                this.setState({ maintenanceData: data });
            }
        } catch (error) {
            console.error("Failed to fetch maintenance data:", error);
        }
    };

    startCountdown = () => {
        this.updateCountdown();
        this.countdownInterval = setInterval(this.updateCountdown, 1000);
    };

    updateCountdown = () => {
        const { maintenanceData } = this.state;
        if (!maintenanceData?.endAt) {
            // Default countdown: 24 hours
            const endTime = new Date().getTime() + 24 * 60 * 60 * 1000;
            this.calculateTimeRemaining(endTime);
            return;
        }

        const endTime = new Date(maintenanceData.endAt).getTime();
        this.calculateTimeRemaining(endTime);
    };

    calculateTimeRemaining = (endTime: number) => {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance < 0) {
            this.setState({
                timeRemaining: { days: 0, hours: 0, minutes: 0, seconds: 0 },
            });
            if (this.countdownInterval) {
                clearInterval(this.countdownInterval);
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this.setState({
            timeRemaining: { days, hours, minutes, seconds },
        });
    };

    handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ email: e.target.value, error: null });
    };

    handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        const { email } = this.state;

        if (!email || !email.includes("@")) {
            this.setState({ error: "Please enter a valid email address" });
            return;
        }

        this.setState({ loading: true, error: null });

        try {
            // Replace with your actual API endpoint
            await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            this.setState({
                subscribed: true,
                loading: false,
                email: "",
            });
        } catch (error) {
            this.setState({
                error: "Failed to subscribe. Please try again.",
                loading: false,
            });
        }
    };

    render() {
        const { timeRemaining, maintenanceData } = this.state;

        return (
            <div className="max-h-screen bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 relative overflow-hidden flex items-center justify-center">
                {/* Background Effects */}
                <Particles
                    className="absolute inset-0 -z-0 pointer-events-none"
                    quantity={50}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-transparent to-purple-600/5 opacity-50"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

                {/* Main Content */}
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
                    {/* Icon */}
                    <div className="mb-8 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-indigo-600/20 blur-2xl rounded-full"></div>
                            <div className="relative bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-sm border border-indigo-500/30 rounded-full p-8">
                                <IoConstruct className="text-6xl sm:text-7xl text-indigo-400 animate-pulse" />
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                        Under Maintenance
                    </h1>

                    {/* Description */}
                    <div className="mb-8 space-y-4">
                        <p className="text-xl sm:text-2xl text-zinc-300 leading-relaxed">
                            {maintenanceData?.message || "We're currently upgrading our systems to serve you better."}
                        </p>
                        <p className="text-base sm:text-lg text-zinc-400">
                            Sorry for the inconvenience. We'll be back shortly!
                        </p>
                    </div>

                    {/* Countdown Timer */}
                    <div className="mb-12">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <IoTime className="text-indigo-400 text-xl" />
                            <h2 className="text-xl sm:text-2xl font-semibold text-white">
                                Estimated Time Remaining
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
                            {Object.entries(timeRemaining).map(([unit, value]) => (
                                <div
                                    key={unit}
                                    className="bg-gradient-to-br from-zinc-800/60 to-zinc-900/60 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-300"
                                >
                                    <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                                        {value.toString().padStart(2, "0")}
                                    </div>
                                    <div className="text-sm sm:text-base text-zinc-400 capitalize">
                                        {unit}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Email Subscription */}
                    {/* <div className="mb-12 max-w-2xl mx-auto">
                        <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-8">
                            <div className="flex items-center justify-center gap-2 mb-6">
                                <IoMail className="text-purple-400 text-xl" />
                                <h3 className="text-xl sm:text-2xl font-semibold text-white">
                                    Notify Me When It's Ready
                                </h3>
                            </div>

                            {!subscribed ? (
                                <form onSubmit={this.handleSubscribe} className="space-y-4">
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={this.handleEmailChange}
                                            placeholder="your.email@example.com"
                                            className="w-full px-6 py-4 bg-zinc-700/50 border border-zinc-600/50 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                                            disabled={loading}
                                        />
                                    </div>

                                    {error && (
                                        <p className="text-red-400 text-sm">{error}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-zinc-600 disabled:to-zinc-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-indigo-500/25"
                                    >
                                        {loading ? "Subscribing..." : "Notify Me"}
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center">
                                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-600/20 border border-green-500/30 rounded-xl text-green-400 mb-4">
                                        <IoCalendar size={20} />
                                        <span className="font-medium">You're subscribed!</span>
                                    </div>
                                    <p className="text-zinc-400">
                                        We'll send you an email as soon as we're back online.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div> */}

                    {/* Social Links */}
                    {/* <div className="mb-8">
                        <p className="text-zinc-400 mb-6">Stay connected with us</p>
                        <div className="flex justify-center gap-6">
                            <a
                                href="https://twitter.com/praveensiva77"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit Twitter profile"
                                className="p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl hover:border-zinc-600/50 hover:bg-zinc-700/50 transition-all duration-300 hover:scale-110"
                            >
                                <FiTwitter className="text-2xl text-zinc-400 hover:text-white transition-colors" />
                            </a>
                            <a
                                href="https://github.com/praveensiva77"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit GitHub profile"
                                className="p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl hover:border-zinc-600/50 hover:bg-zinc-700/50 transition-all duration-300 hover:scale-110"
                            >
                                <FiGithub className="text-2xl text-zinc-400 hover:text-white transition-colors" />
                            </a>
                            <a
                                href="https://linkedin.com/in/praveensiva77"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit LinkedIn profile"
                                className="p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl hover:border-zinc-600/50 hover:bg-zinc-700/50 transition-all duration-300 hover:scale-110"
                            >
                                <FiLinkedin className="text-2xl text-zinc-400 hover:text-white transition-colors" />
                            </a>
                        </div>
                    </div> */}

                    {/* Contact Button */}
                    {/* <a
                        href="mailto:praveensiva0820@gmail.com"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 hover:border-zinc-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                    >
                        <IoMail size={20} />
                        <span>Contact Us</span>
                    </a> */}

                    {/* Footer */}
                    <div className="mt-8 pt-4">
                        <p className="text-zinc-500 text-sm">
                            © {new Date().getFullYear()} Praveen Siva. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Maintenance;
