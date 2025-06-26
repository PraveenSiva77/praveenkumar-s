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

class GetInTouch extends Component<IGetInTouchProps, IGetInTouchState> {
    state: IGetInTouchState = {
        loading: {},
        error: null,
        isLoggedIn: !!localStorage.getItem("token"),
        showAuth: false,
        name: getUserFromStorage()?.name || "",
        email: getUserFromStorage()?.email || "",
        subject: "",
        message: "",
        success: null,
    };

    handleLogin = () => {
        this.setState({ showAuth: true });
    };

    handleAuthSuccess = (token?: string) => {
        if (token) localStorage.setItem("token", token);
        // Get user info from localStorage (set in AuthModal)
        const user = getUserFromStorage();
        this.setState({
            isLoggedIn: true,
            showAuth: false,
            name: user?.name || "",
            email: user?.email || "",
        });
    };

    handleAuthClose = () => {
        this.setState({ showAuth: false });
    };

    handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({ [e.target.name]: e.target.value } as any);
    };

    handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        this.setState({ loading: { ...this.state.loading, send: true }, error: null, success: null });
        try {
            const token = localStorage.getItem("token");
            const { name, email, subject, message } = this.state;
            await sendContact(
                { name, email, subject, message },
                token || undefined
            );
            this.setState({
                loading: { ...this.state.loading, send: false },
                success: "Message sent successfully!",
                subject: "",
                message: "",
            });
        } catch (error: any) {
            this.setState({
                loading: { ...this.state.loading, send: false },
                error: error.message || "Failed to send message.",
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
                                    className="bg-zinc-900 text-white px-4 py-3 rounded-lg border border-zinc-700 focus:outline-none focus:border-indigo-500"
                                    required
                                />
                                <textarea
                                    name="message"
                                    value={message}
                                    onChange={this.handleInputChange}
                                    placeholder="Your Message"
                                    rows={5}
                                    className="bg-zinc-900 text-white px-4 py-3 rounded-lg border border-zinc-700 focus:outline-none focus:border-indigo-500"
                                    required
                                />
                                {error && (
                                    <div className="text-red-400 text-center">{error}</div>
                                )}
                                {success && (
                                    <div className="text-green-400 text-center">{success}</div>
                                )}
                                <button
                                    type="submit"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors"
                                    disabled={loading.send}
                                >
                                    {loading.send ? "Sending..." : "Send Message"}
                                </button>
                                <p className="flex items-center justify-center text-zinc-400 text-xs">
                                    <IoIosLock className="inline-block mr-1 text-indigo-400" />
                                    I respect your privacy. Your information will not be shared with anyone.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        );
    }
}

export default GetInTouch;