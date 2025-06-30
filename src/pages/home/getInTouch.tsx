import { Component, type FormEvent, type ChangeEvent } from "react";
import { IoIosLock, IoMdMail, IoMdCheckmarkCircle } from "react-icons/io";
import { MdMailLock, MdSubject, MdSend } from "react-icons/md";
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
        const token = getTokenFromStorage();
        const user = getUserFromStorage();
        
        if (token && user) {
            this.setState({
                isLoggedIn: true,
                name: user.name || "",
                email: user.email || "",
            });
        } else {
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
        this.setState({ 
            [e.target.name]: e.target.value,
            error: null,
            success: null,
        } as any);
    };

    handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        const { name, email, subject, message } = this.state;
        
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

            this.setState({
                loading: { ...this.state.loading, send: false },
                success: response.message || "Message sent successfully!",
                subject: "",
                message: "",
            });

        } catch (error: any) {
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
        const { isLoggedIn, showAuth, loading, error, name, subject, message, success } = this.state;

        return (
            <section id="contact" className="py-8 sm:py-12 lg:py-16 px-4 w-full">
                <div className="max-w-3xl mx-auto">
                    
                    <div className="md:hidden flex flex-col items-center justify-center gap-1 text-center mb-8 sm:mb-12 lg:mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-bold text-white">
                            Get In Touch
                        </h2>

                        <p className="text-zinc-400 text-sm max-w-2xl mx-auto">
                            Ready to collaborate? Let's create something amazing together.
                        </p>
                    </div>
                    
                    {/* Contact Form */}
                    <div className="relative bg-gradient-to-br from-zinc-600/10 via-zinc-600/5 to-zinc-600/10 border border-zinc-500/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl backdrop-blur-sm overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 opacity-50"></div>
                        
                        <div className="relative z-10">
                            {!isLoggedIn ? (
                                <div className="text-center">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 flex items-center justify-center">
                                        <MdMailLock className="text-5xl md:text-6xl text-zinc-300" />
                                    </div>
                                    <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
                                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                                            Secure Contact Form
                                        </h3>
                                        <p className="text-zinc-300 text-sm sm:text-base md:text-lg max-w-md mx-auto leading-relaxed">
                                            Please{" "}
                                            <span className="font-semibold text-white bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                                log in
                                            </span>{" "}
                                            to unlock the contact form and help us prevent spam.
                                        </p>
                                    </div>
                                    <button
                                        onClick={this.handleLogin}
                                        className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-sm sm:text-base shadow-lg hover:shadow-indigo-500/25 w-full sm:w-auto"
                                    >
                                        <IoIosLock className="text-lg" />
                                        Login to Continue
                                    </button>

                                    {/* Quick Contact Info */}
                                    <div className="mt-6 mb-3 text-center">
                                        <div className="inline-flex flex-col sm:flex-row items-center md:gap-2">
                                            <p className="text-zinc-500 text-sm sm:text-base">
                                                Prefer email? Reach out directly at
                                            </p>
                                            <a 
                                                href="mailto:praveensiva0820@gmal.com" 
                                                className="text-indigo-400 hover:text-indigo-300 transition-colors text-sm sm:text-base"
                                            >
                                                praveensiva0820@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6 sm:space-y-8">
                                    {/* Welcome Header */}
                                    <div className="flex justify-between items-start sm:items-center gap-4 p-4 sm:p-6 bg-gradient-to-r from-zinc-800/30 to-zinc-700/30 rounded-xl sm:rounded-2xl border border-zinc-600/30 backdrop-blur-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                                                <IoMdCheckmarkCircle className="text-green-400 text-xl" />
                                            </div>
                                            <div>
                                                <p className="text-zinc-400 text-xs sm:text-sm">Welcome back,</p>
                                                <p className="text-white font-semibold text-sm sm:text-base">{name}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={this.handleLogout}
                                            className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors hover:bg-red-500/10 px-3 py-1.5 rounded-lg"
                                        >
                                            Logout
                                        </button>
                                    </div>

                                    <form className="space-y-6 sm:space-y-8" onSubmit={this.handleSubmit}>
                                        {/* Subject Input */}
                                        <div className="space-y-3">
                                            <label className="text-white text-sm sm:text-base font-medium flex items-center gap-2">
                                                <MdSubject className="text-indigo-400 text-lg" />
                                                Subject
                                            </label>
                                            <input
                                                type="text"
                                                name="subject"
                                                value={subject}
                                                onChange={this.handleInputChange}
                                                placeholder="What would you like to discuss?"
                                                className="w-full bg-zinc-900/60 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-zinc-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 text-sm sm:text-base placeholder:text-zinc-500 hover:bg-zinc-900/80"
                                                required
                                                disabled={loading.send}
                                            />
                                        </div>

                                        {/* Message Textarea */}
                                        <div className="space-y-3">
                                            <label className="text-white text-sm sm:text-base font-medium flex items-center gap-2">
                                                <IoMdMail className="text-indigo-400 text-lg" />
                                                Message
                                            </label>
                                            <textarea
                                                name="message"
                                                value={message}
                                                onChange={this.handleInputChange}
                                                placeholder="Tell me about your project, ideas, or just say hello..."
                                                rows={6}
                                                className="w-full bg-zinc-900/60 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-zinc-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 resize-vertical min-h-[140px] sm:min-h-[160px] text-sm sm:text-base placeholder:text-zinc-500 hover:bg-zinc-900/80"
                                                required
                                                disabled={loading.send}
                                            />
                                        </div>
                                        
                                        {/* Error Message */}
                                        {error && (
                                            <div className="bg-red-900/20 border border-red-500/30 text-red-400 px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-center text-sm sm:text-base flex items-center gap-3 justify-center">
                                                <span className="text-red-500 text-lg">⚠️</span>
                                                {error}
                                            </div>
                                        )}
                                        
                                        {/* Success Message */}
                                        {success && (
                                            <div className="bg-green-900/20 border border-green-500/30 text-green-400 px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-center text-sm sm:text-base flex items-center gap-3 justify-center">
                                                <IoMdCheckmarkCircle className="text-green-400 text-lg flex-shrink-0" />
                                                {success}
                                            </div>
                                        )}
                                        
                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-indigo-800 disabled:to-purple-800 disabled:cursor-not-allowed text-white font-semibold py-3 sm:py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100 active:scale-[0.98] text-sm sm:text-base shadow-lg hover:shadow-indigo-500/25 disabled:shadow-none"
                                            disabled={loading.send}
                                        >
                                            {loading.send ? (
                                                <span className="flex items-center justify-center gap-3">
                                                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    Sending Message...
                                                </span>
                                            ) : (
                                                <span className="flex items-center justify-center gap-3">
                                                    <MdSend className="text-lg" />
                                                    Send Message
                                                </span>
                                            )}
                                        </button>
                                        
                                        {/* Security Notice */}
                                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-zinc-400 text-xs sm:text-sm text-center pt-2 border-t border-zinc-700/50">
                                            <div className="flex items-center gap-2">
                                                <IoIosLock className="text-indigo-400 text-sm flex-shrink-0" />
                                                <span>Your information is secure and won't be shared</span>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {showAuth && (
                    <AuthModal
                        onClose={this.handleAuthClose}
                        onAuthSuccess={this.handleAuthSuccess}
                    />
                )}
            </section>
        );
    }
}

export default GetInTouch;