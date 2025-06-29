import { Component, type ChangeEvent, type FormEvent } from "react";
import { loginUser, registerUser, verifyUser } from "../services/api";
import { IoMdClose, IoMdMail, IoMdPerson, IoMdLock, IoMdCheckmarkCircle } from "react-icons/io";
import { HiOutlineShieldCheck } from "react-icons/hi";

export interface ILoading {
    [key: string]: any;
}
export type IError = string | null;

export interface IAuthModalProps {
    onClose?: () => void;
    onAuthSuccess?: (data?: { token: string; user: any }) => void;
}

export interface IAuthModalState {
    loading: boolean;
    error: IError;
    mode: "login" | "signup" | "verify";
    email: string;
    password: string;
    name: string;
    otp: string;
    tempEmail: string;
    tempName: string;
    tempPassword: string;
    showPassword: boolean;
}

class AuthModal extends Component<IAuthModalProps, IAuthModalState> {
    state: IAuthModalState = {
        loading: false,
        error: null,
        mode: "login",
        email: "",
        password: "",
        name: "",
        otp: "",
        tempEmail: "",
        tempName: "",
        tempPassword: "",
        showPassword: false,
    };

    handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Clear error when user starts typing
        this.setState({ 
            [e.target.name]: e.target.value,
            error: null 
        } as any);
    };

    togglePasswordVisibility = () => {
        this.setState(s => ({ showPassword: !s.showPassword }));
    };

    switchMode = () => {
        this.setState((s) => ({
            mode: s.mode === "login" ? "signup" : "login",
            error: null,
            email: "",
            password: "",
            name: "",
        }));
    };

    handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && this.props.onClose) {
            this.props.onClose();
        }
    };

    handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        this.setState({ loading: true, error: null });

        try {
            if (this.state.mode === "login") {
                const data = await loginUser(this.state.email, this.state.password);
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                this.setState({ loading: false });
                if (this.props.onAuthSuccess) this.props.onAuthSuccess(data);
                if (this.props.onClose) this.props.onClose();
            } else if (this.state.mode === "signup") {
                await registerUser(this.state.name, this.state.email, this.state.password);
                this.setState({
                    loading: false,
                    mode: "verify",
                    tempEmail: this.state.email,
                    tempName: this.state.name,
                    tempPassword: this.state.password,
                    email: "",
                    password: "",
                    name: "",
                });
            } else if (this.state.mode === "verify") {
                await verifyUser(this.state.tempEmail, this.state.otp);
                const data = await loginUser(this.state.tempEmail, this.state.tempPassword);
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                this.setState({ loading: false });
                if (this.props.onAuthSuccess) this.props.onAuthSuccess(data);
                if (this.props.onClose) this.props.onClose();
            }
        } catch (error: any) {
            this.setState({ error: error.message || "Authentication failed", loading: false });
        }
    };

    render() {
        const { onClose } = this.props;
        const { loading, error, mode, email, password, name, otp, showPassword } = this.state;

        return (
            <div 
                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={this.handleBackdropClick}
            >
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl shadow-2xl border border-zinc-700/50 w-full max-w-md relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5"></div>
                    
                    {/* Header */}
                    <div className="relative p-6 pb-0">
                        {onClose && (
                            <button
                                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-zinc-700/50 transition-all duration-200"
                                onClick={onClose}
                            >
                                <IoMdClose size={20} />
                            </button>
                        )}
                        
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-full flex items-center justify-center border border-indigo-500/30">
                                {mode === "verify" ? (
                                    <HiOutlineShieldCheck className="text-indigo-400 text-2xl" />
                                ) : (
                                    <IoMdLock className="text-indigo-400 text-2xl" />
                                )}
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                {mode === "login"
                                    ? "Welcome Back"
                                    : mode === "signup"
                                    ? "Create Account"
                                    : "Verify Email"}
                            </h2>
                            <p className="text-zinc-400 text-sm">
                                {mode === "login"
                                    ? "Sign in to your account"
                                    : mode === "signup"
                                    ? "Join our community today"
                                    : "Check your email for verification code"}
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="relative p-6 pt-0">
                        <form onSubmit={this.handleSubmit} className="space-y-4">
                            {mode === "signup" && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                        <IoMdPerson className="text-indigo-400" />
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={this.handleInputChange}
                                        placeholder="Enter your full name"
                                        className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 text-white border border-zinc-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 placeholder:text-zinc-500"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            )}
                            
                            {(mode === "login" || mode === "signup") && (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                            <IoMdMail className="text-indigo-400" />
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={this.handleInputChange}
                                            placeholder="Enter your email"
                                            className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 text-white border border-zinc-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 placeholder:text-zinc-500"
                                            required
                                            disabled={loading}
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                            <IoMdLock className="text-indigo-400" />
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={password}
                                                onChange={this.handleInputChange}
                                                placeholder="Enter your password"
                                                className="w-full px-4 py-3 pr-12 rounded-lg bg-zinc-800/50 text-white border border-zinc-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 placeholder:text-zinc-500"
                                                required
                                                disabled={loading}
                                                minLength={6}
                                            />
                                            <button
                                                type="button"
                                                onClick={this.togglePasswordVisibility}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                                                disabled={loading}
                                            >
                                                {showPassword ? "👁️" : "👁️‍🗨️"}
                                            </button>
                                        </div>
                                        {mode === "signup" && (
                                            <p className="text-xs text-zinc-500">
                                                Must be at least 6 characters long
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}
                            
                            {mode === "verify" && (
                                <div className="space-y-4">
                                    <div className="text-center p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/50">
                                        <IoMdCheckmarkCircle className="text-green-400 text-3xl mx-auto mb-2" />
                                        <p className="text-zinc-300 text-sm mb-1">
                                            Verification code sent to:
                                        </p>
                                        <p className="text-white font-medium">
                                            {this.state.tempEmail}
                                        </p>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                            <HiOutlineShieldCheck className="text-indigo-400" />
                                            Verification Code
                                        </label>
                                        <input
                                            type="text"
                                            name="otp"
                                            value={otp}
                                            onChange={this.handleInputChange}
                                            placeholder="000000"
                                            className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 text-white border border-zinc-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 text-center text-2xl tracking-[0.5em] placeholder:text-zinc-500 placeholder:tracking-normal placeholder:text-base"
                                            required
                                            disabled={loading}
                                            maxLength={6}
                                            pattern="[0-9]{6}"
                                        />
                                    </div>
                                </div>
                            )}
                            
                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-900/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm text-center flex items-center gap-2">
                                    <span className="text-red-500">⚠️</span>
                                    {error}
                                </div>
                            )}
                            
                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-indigo-800 disabled:to-purple-800 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100 shadow-lg hover:shadow-indigo-500/25"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        {mode === "login"
                                            ? "Signing in..."
                                            : mode === "signup"
                                            ? "Creating account..."
                                            : "Verifying..."}
                                    </span>
                                ) : (
                                    <>
                                        {mode === "login"
                                            ? "Sign In"
                                            : mode === "signup"
                                            ? "Create Account"
                                            : "Verify Email"}
                                    </>
                                )}
                            </button>
                        </form>
                        
                        {/* Footer */}
                        <div className="mt-6 pt-6 border-t border-zinc-700/50">
                            {mode !== "verify" ? (
                                <div className="text-center text-zinc-400 text-sm">
                                    {mode === "login" ? (
                                        <>
                                            Don't have an account?{" "}
                                            <button
                                                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                                                onClick={this.switchMode}
                                                type="button"
                                                disabled={loading}
                                            >
                                                Sign Up
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            Already have an account?{" "}
                                            <button
                                                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                                                onClick={this.switchMode}
                                                type="button"
                                                disabled={loading}
                                            >
                                                Sign In
                                            </button>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center space-y-2">
                                    <p className="text-zinc-400 text-xs">
                                        Didn't receive the code?
                                    </p>
                                    <div className="flex justify-center gap-4 text-xs">
                                        <button
                                            className="text-indigo-400 hover:text-indigo-300 transition-colors"
                                            onClick={() => this.setState({ mode: "signup", otp: "", error: null })}
                                            type="button"
                                            disabled={loading}
                                        >
                                            Try Again
                                        </button>
                                        <span className="text-zinc-600">•</span>
                                        <button
                                            className="text-indigo-400 hover:text-indigo-300 transition-colors"
                                            onClick={() => this.setState({ mode: "login", otp: "", error: null })}
                                            type="button"
                                            disabled={loading}
                                        >
                                            Back to Login
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthModal;