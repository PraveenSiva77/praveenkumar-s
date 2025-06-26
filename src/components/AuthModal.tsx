import { Component, ChangeEvent, FormEvent } from "react";
import { loginUser, registerUser, verifyUser } from "../services/api";

export interface ILoading {
    [key: string]: any;
}
export type IError = string | null;

export interface IAuthModalProps {
    onClose?: () => void;
    onAuthSuccess?: (token?: string) => void;
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
    };

    handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ [e.target.name]: e.target.value } as any);
    };

    switchMode = () => {
        this.setState((s) => ({
            mode: s.mode === "login" ? "signup" : "login",
            error: null,
        }));
    };

    handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        this.setState({ loading: true, error: null });

        try {
            if (this.state.mode === "login") {
                const data = await loginUser(this.state.email, this.state.password);
                // Store token if needed
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                this.setState({ loading: false });
                if (this.props.onAuthSuccess) this.props.onAuthSuccess(data.token);
                if (this.props.onClose) this.props.onClose();
            } else if (this.state.mode === "signup") {
                await registerUser(this.state.name, this.state.email, this.state.password);
                // Save for verification step
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
                // After verification, auto-login
                const data = await loginUser(this.state.tempEmail, this.state.tempPassword);
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                this.setState({ loading: false });
                if (this.props.onAuthSuccess) this.props.onAuthSuccess(data.token);
                if (this.props.onClose) this.props.onClose();
            }
        } catch (error: any) {
            this.setState({ error: error.message || "Authentication failed", loading: false });
        }
    };

    render() {
        const { onClose } = this.props;
        const { loading, error, mode, email, password, name, otp } = this.state;

        return (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <div className="bg-zinc-900 rounded-xl shadow-xl p-8 w-full max-w-sm relative">
                    {onClose && (
                        <button
                            className="absolute top-3 right-3 text-zinc-400 hover:text-white text-xl"
                            onClick={onClose}
                        >
                            ×
                        </button>
                    )}
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">
                        {mode === "login"
                            ? "Login"
                            : mode === "signup"
                            ? "Sign Up"
                            : "Verify Email"}
                    </h2>
                    <form onSubmit={this.handleSubmit} className="flex flex-col gap-4">
                        {mode === "signup" && (
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={this.handleInputChange}
                                placeholder="Name"
                                className="px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
                                required
                            />
                        )}
                        {(mode === "login" || mode === "signup") && (
                            <>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={this.handleInputChange}
                                    placeholder="Email"
                                    className="px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={this.handleInputChange}
                                    placeholder="Password"
                                    className="px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
                                    required
                                />
                            </>
                        )}
                        {mode === "verify" && (
                            <input
                                type="text"
                                name="otp"
                                value={otp}
                                onChange={this.handleInputChange}
                                placeholder="Enter OTP sent to your email"
                                className="px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
                                required
                            />
                        )}
                        {error && (
                            <div className="text-red-400 text-sm text-center">{error}</div>
                        )}
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors"
                            disabled={loading}
                        >
                            {loading
                                ? mode === "login"
                                    ? "Logging in..."
                                    : mode === "signup"
                                    ? "Signing up..."
                                    : "Verifying..."
                                : mode === "login"
                                ? "Login"
                                : mode === "signup"
                                ? "Sign Up"
                                : "Verify"}
                        </button>
                    </form>
                    {mode !== "verify" && (
                        <div className="mt-4 text-center text-zinc-400 text-sm">
                            {mode === "login" ? (
                                <>
                                    Don't have an account?{" "}
                                    <button
                                        className="text-indigo-400 hover:underline"
                                        onClick={this.switchMode}
                                    >
                                        Sign Up
                                    </button>
                                </>
                            ) : (
                                <>
                                    Already have an account?{" "}
                                    <button
                                        className="text-indigo-400 hover:underline"
                                        onClick={this.switchMode}
                                    >
                                        Login
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default AuthModal;