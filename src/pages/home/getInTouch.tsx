import { Component, type FormEvent, type ChangeEvent } from "react";
import { IoIosLock } from "react-icons/io";
import { MdMailLock } from "react-icons/md";
import AuthModal from "../../components/AuthModal";
import { sendContact } from "../../services/api";

export interface ILoading {
    [key: string]: any;
}
export type IError = string | null;

export interface IGetInTouchProps {}

export interface IGetInTouchState {
    loading: ILoading;
    error: IError;
    isLoggedIn: boolean;
    showAuth: boolean;
    name: string;
    email: string;
    subject: string;
    message: string;
    success: string | null;
}

function getUserFromStorage() {
    try {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    } catch {
        return null;
    }
}

function getTokenFromStorage() {
    try {
        return localStorage.getItem("token");
    } catch {
        return null;
    }
}

class GetInTouch extends Component<IGetInTouchProps, IGetInTouchState> {
    state: IGetInTouchState = {
        loading: {},
        error: null,
        isLoggedIn: !!getTokenFromStorage(),
        showAuth: false,
        name: getUserFromStorage()?.name || "",
        email: getUserFromStorage()?.email || "",
        subject: "",
        message: "",
        success: null,
    };

    componentDidMount() {
        // Check if user is still logged in on component mount
        const token = getTokenFromStorage();
        const user = getUserFromStorage();
        
        if (token && user) {
            this.setState({
                isLoggedIn: true,
                name: user.name || "",
                email: user.email || "",
            });
        } else {
            // Clear invalid state
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            this.setState({ isLoggedIn: false });
        }
    }

    handleLogin = () => {
        this.setState({ showAuth: true });
    };

    handleAuthSuccess = (data?: { token: string; user: any }) => {
        if (data?.token && data?.user) {
            // Store both token and user data
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            
            this.setState({
                isLoggedIn: true,
                showAuth: false,
                name: data.user.name || "",
                email: data.user.email || "",
                error: null,
            });
        }
    };

    handleAuthClose = () => {
        this.setState({ showAuth: false });
    };

    handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.setState({
            isLoggedIn: false,
            name: "",
            email: "",
            subject: "",
            message: "",
            success: null,
            error: null,
        });
    };

    handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // Clear previous messages when user starts typing
        this.setState({ 
            [e.target.name]: e.target.value,
            error: null,
            success: null,
        } as any);
    };

    handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        const { name, email, subject, message } = this.state;
        
        // Validate form data
        if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
            this.setState({ error: "Please fill in all fields." });
            return;
        }

        this.setState({ 
            loading: { ...this.state.loading, send: true }, 
            error: null, 
            success: null 
        });

        try {
            const token = getTokenFromStorage();
            
            if (!token) {
                throw new Error("Authentication required. Please log in again.");
            }

            const response = await sendContact(
                { 
                    name: name.trim(), 
                    email: email.trim(), 
                    subject: subject.trim(), 
                    message: message.trim() 
                },
                token
            );

            // Based on your API response structure
            this.setState({
                loading: { ...this.state.loading, send: false },
                success: response.message || "Message sent successfully!",
                subject: "",
                message: "",
            });

        } catch (error: any) {
            // Handle different types of errors
            let errorMessage = "Failed to send message.";
            
            if (error.message.includes("Authentication") || error.message.includes("token")) {
                errorMessage = "Session expired. Please log in again.";
                this.handleLogout();
            } else {
                errorMessage = error.message || "Failed to send message.";
            }

            this.setState({
                loading: { ...this.state.loading, send: false },
                error: errorMessage,
                success: null,
            });
        }
    };

    render() {
        const { isLoggedIn, showAuth, loading, error, name, email, subject, message, success } = this.state;

        return (
            <section id="contact" className="py-16 md:py-24 max-w-6xl">
                <div className="max-w-2xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                        Get In Touch
                    </h2>
                    <p className="text-zinc-400 text-center mb-10">
                        Interested in working together or have a question? Feel free to reach out!
                    </p>
                    
                    <div className="bg-zinc-800/30 rounded-2xl shadow-lg p-8 border border-zinc-700">
                        {!isLoggedIn ? (
                            <div className="flex flex-col items-center gap-6">
                                <MdMailLock className="text-5xl text-indigo-500 mb-2" />
                                <p className="text-zinc-300 text-center">
                                    Please{" "}
                                    <span className="font-semibold text-white">log in</span> to unlock the contact form and prevent spam.
                                </p>
                                <button
                                    onClick={this.handleLogin}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                                >
                                    Login to Unlock
                                </button>
                                {showAuth && (
                                    <AuthModal
                                        onClose={this.handleAuthClose}
                                        onAuthSuccess={this.handleAuthSuccess}
                                    />
                                )}
                            </div>
                        ) : (
                            <div>
                                {/* User info and logout option */}
                                <div className="flex justify-between items-center mb-6">
                                    <div className="text-sm text-zinc-400">
                                        Logged in as <span className="text-white font-medium">{name}</span>
                                    </div>
                                    <button
                                        onClick={this.handleLogout}
                                        className="text-zinc-400 hover:text-white text-sm transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>

                                <form className="flex flex-col gap-6" onSubmit={this.handleSubmit}>
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        disabled
                                        className="bg-zinc-900 text-white px-4 py-3 rounded-lg border border-zinc-700 opacity-70 cursor-not-allowed"
                                        placeholder="Your Name"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        disabled
                                        className="bg-zinc-900 text-white px-4 py-3 rounded-lg border border-zinc-700 opacity-70 cursor-not-allowed"
                                        placeholder="Your Email"
                                    />
                                    <input
                                        type="text"
                                        name="subject"
                                        value={subject}
                                        onChange={this.handleInputChange}
                                        placeholder="Subject"
                                        className="bg-zinc-900 text-white px-4 py-3 rounded-lg border border-zinc-700 focus:outline-none focus:border-indigo-500 transition-colors"
                                        required
                                        disabled={loading.send}
                                    />
                                    <textarea
                                        name="message"
                                        value={message}
                                        onChange={this.handleInputChange}
                                        placeholder="Your Message"
                                        rows={5}
                                        className="bg-zinc-900 text-white px-4 py-3 rounded-lg border border-zinc-700 focus:outline-none focus:border-indigo-500 transition-colors resize-vertical"
                                        required
                                        disabled={loading.send}
                                    />
                                    
                                    {error && (
                                        <div className="bg-red-900/20 border border-red-700 text-red-400 px-4 py-3 rounded-lg text-center">
                                            {error}
                                        </div>
                                    )}
                                    
                                    {success && (
                                        <div className="bg-green-900/20 border border-green-700 text-green-400 px-4 py-3 rounded-lg text-center">
                                            {success}
                                        </div>
                                    )}
                                    
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
                                        disabled={loading.send}
                                    >
                                        {loading.send ? "Sending..." : "Send Message"}
                                    </button>
                                    
                                    <p className="flex items-center justify-center text-zinc-400 text-xs">
                                        <IoIosLock className="inline-block mr-1 text-indigo-400" />
                                        Your information is secure and will not be shared with anyone.
                                    </p>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        );
    }
}

export default GetInTouch;