import { Component } from "react";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import { FiSend, FiUser, FiMail, FiMessageSquare } from "react-icons/fi";

// Fix the interface and type definitions
export interface IGetInTouchProps {}

export interface IGetInTouchState {
    name: string;
    message: string;
    loading: boolean;
    error: string | null;
    success: boolean;
}

class GetInTouch extends Component<IGetInTouchProps, IGetInTouchState> {
    state: IGetInTouchState = {
        name: "",
        message: "",
        loading: false,
        error: null,
        success: false,
    };

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, message, loading } = this.state;
        
        if (loading) return;
        
        if (!name.trim() || !message.trim()) {
            this.setState({ 
                error: "Please fill in all required fields.",
                success: false 
            });
            return;
        }

        this.setState({ loading: true, error: null, success: false });

        try {
            // Simulate API call since sendContactMessage doesn't exist
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            this.setState({
                success: true,
                loading: false,
                name: "",
                message: "",
                error: null,
            });
        } catch (error) {
            this.setState({
                error: "Failed to send message. Please try again.",
                loading: false,
                success: false,
            });
        }
    };

    render() {
        const { name, message, loading, error, success } = this.state;

        return (
            <section id="contact" className="py-16 sm:py-20 lg:py-24 px-4 w-full relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-transparent to-purple-600/5 opacity-50"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-medium mb-6">
                            <HiOutlineMail className="text-indigo-400" />
                            Let's Connect
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                            Get In 
                            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"> Touch</span>
                        </h2>
                        <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
                            Have a project in mind? Let's discuss how we can work together.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                                    Let's Start a Conversation
                                </h3>
                                <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
                                    I'm always interested in new opportunities and exciting projects. 
                                    Whether you have a question or just want to say hi, feel free to reach out!
                                </p>
                            </div>

                            {/* Contact Details */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 backdrop-blur-sm border border-zinc-700/50 rounded-xl hover:border-zinc-600/50 transition-all duration-300">
                                    <div className="p-3 bg-indigo-600/20 border border-indigo-500/30 rounded-lg">
                                        <HiOutlineMail className="text-indigo-400" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Email</h4>
                                        <p className="text-zinc-400">your.email@example.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 backdrop-blur-sm border border-zinc-700/50 rounded-xl hover:border-zinc-600/50 transition-all duration-300">
                                    <div className="p-3 bg-purple-600/20 border border-purple-500/30 rounded-lg">
                                        <HiOutlinePhone className="text-purple-400" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Phone</h4>
                                        <p className="text-zinc-400">+1 (555) 123-4567</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 backdrop-blur-sm border border-zinc-700/50 rounded-xl hover:border-zinc-600/50 transition-all duration-300">
                                    <div className="p-3 bg-green-600/20 border border-green-500/30 rounded-lg">
                                        <HiOutlineLocationMarker className="text-green-400" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Location</h4>
                                        <p className="text-zinc-400">Your City, Country</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-6 sm:p-8">
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                                Send a Message
                            </h3>

                            {/* Success Message */}
                            {success && (
                                <div className="mb-6 p-4 bg-green-600/20 border border-green-500/30 rounded-lg">
                                    <p className="text-green-400 font-medium">
                                        ✅ Message sent successfully! I'll get back to you soon.
                                    </p>
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="mb-6 p-4 bg-red-600/20 border border-red-500/30 rounded-lg">
                                    <p className="text-red-400 font-medium">
                                        ❌ {error}
                                    </p>
                                </div>
                            )}

                            <form onSubmit={this.handleSubmit} className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" className="block text-zinc-300 font-medium mb-2">
                                        Your Name *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                                            <FiUser size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={name}
                                            onChange={this.handleInputChange}
                                            placeholder="Enter your full name"
                                            className="w-full pl-11 pr-4 py-3 bg-zinc-700/50 border border-zinc-600/50 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label htmlFor="message" className="block text-zinc-300 font-medium mb-2">
                                        Your Message *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-3 text-zinc-400">
                                            <FiMessageSquare size={18} />
                                        </div>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={message}
                                            onChange={this.handleInputChange}
                                            placeholder="Tell me about your project or just say hello..."
                                            rows={5}
                                            className="w-full pl-11 pr-4 py-3 bg-zinc-700/50 border border-zinc-600/50 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 resize-none"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-zinc-600 disabled:to-zinc-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-indigo-500/25"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FiSend size={20} />
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default GetInTouch;