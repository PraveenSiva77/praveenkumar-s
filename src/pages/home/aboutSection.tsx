import { Component } from "react";
import { SiReaddotcv } from "react-icons/si";
import { fetchAbout } from "../../services/api";
import { HiOutlineSparkles, HiOutlineDownload, HiOutlineMail } from "react-icons/hi";
import { FiAward, FiUsers, FiTrendingUp } from "react-icons/fi";

export interface ILoading {
    [key: string]: any;
}
export type IError = string | null;

export interface IAboutSectionProps {}

export interface IAboutSectionState {
    loading: boolean;
    error: IError;
    about: any | null;
}

class AboutSection extends Component<IAboutSectionProps, IAboutSectionState> {
    state: IAboutSectionState = {
        loading: true,
        error: null,
        about: null,
    };

    async componentDidMount() {
        try {
            const res = await fetchAbout();
            this.setState({ about: res.data, loading: false });
        } catch (error) {
            this.setState({ error: "Failed to load about info.", loading: false });
        }
    }

    render() {
        const { loading, error, about } = this.state;

        return (
            <section id="about" className="py-12 px-4 w-full max-w-6xl relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-transparent to-purple-600/5 opacity-50"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                            About{" "}
                            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"> Me</span>
                        </h2>
                        <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
                            Passionate developer crafting digital experiences with modern technologies
                        </p>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="text-center py-16 sm:py-20">
                            <div className="inline-flex flex-col items-center gap-4">
                                <div className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
                                <p className="text-zinc-400 text-base sm:text-lg">Loading about information...</p>
                            </div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="text-center py-16 sm:py-20">
                            <div className="inline-flex flex-col items-center gap-4 max-w-md mx-auto">
                                <div className="w-16 h-16 bg-red-600/10 border border-red-500/20 rounded-full flex items-center justify-center">
                                    <span className="text-red-400 text-2xl">⚠️</span>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-red-400 font-semibold mb-2">Failed to Load</h3>
                                    <p className="text-zinc-500 text-sm">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Main Content */}
                    {!loading && !error && about && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
                            {/* Profile Image Section */}
                            <div className="order-1 lg:order-1 flex justify-center lg:justify-start">
                                <div className="relative group">
                                    {/* Floating Background Elements */}
                                    {/* <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500 animate-pulse"></div> */}
                                    
                                    {/* Image Container */}
                                    <div className="flex flex-col items-center justify-center gap-8">
                                        <div className="relative">
                                            <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl group-hover:scale-105 transition-all duration-500">
                                                <img
                                                    src={about.image}
                                                    alt={about.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                {/* Overlay Gradient */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                            </div>
                                            
                                            {/* Floating Badge */}
                                            {/* <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-2xl border-4 border-zinc-900 group-hover:scale-110 transition-transform duration-300">
                                                <span className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                                    Available for Work
                                                </span>
                                            </div> */}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                                            <a
                                                href="#contact"
                                                className="group flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-indigo-500/25"
                                            >
                                                <HiOutlineMail className="group-hover:scale-110 transition-transform duration-200" size={20} />
                                                <span>Get in Touch</span>
                                            </a>

                                            {about.cv && (
                                                <a
                                                    href={about.cv}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group flex items-center justify-center gap-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 hover:border-zinc-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                                                >
                                                    <HiOutlineDownload className="group-hover:scale-110 transition-transform duration-200" size={20} />
                                                    <span>Download CV</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="order-1 lg:order-2 space-y-8">
                                {/* Name and Roles */}
                                <div className="space-y-6">

                                    {/* Description */}
                                    <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-6 sm:p-8">
                                        <p className="text-zinc-300 leading-relaxed text-base sm:text-lg whitespace-pre-line">
                                            {about.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                                    <div className="group bg-gradient-to-br from-zinc-800/30 to-zinc-900/30 backdrop-blur-sm border border-zinc-700/40 rounded-xl p-6 hover:border-indigo-500/50 transition-all duration-300 hover:scale-105">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-indigo-600/20 border border-indigo-500/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                                <FiTrendingUp className="text-indigo-400" size={20} />
                                            </div>
                                            <h4 className="text-2xl sm:text-3xl font-bold text-white">3+</h4>
                                        </div>
                                        <p className="text-zinc-400 text-sm font-medium">Years Experience</p>
                                    </div>

                                    <div className="group bg-gradient-to-br from-zinc-800/30 to-zinc-900/30 backdrop-blur-sm border border-zinc-700/40 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-purple-600/20 border border-purple-500/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                                <FiAward className="text-purple-400" size={20} />
                                            </div>
                                            <h4 className="text-2xl sm:text-3xl font-bold text-white">20+</h4>
                                        </div>
                                        <p className="text-zinc-400 text-sm font-medium">Projects Completed</p>
                                    </div>

                                    <div className="group bg-gradient-to-br from-zinc-800/30 to-zinc-900/30 backdrop-blur-sm border border-zinc-700/40 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300 hover:scale-105">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-green-600/20 border border-green-500/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                                <FiUsers className="text-green-400" size={20} />
                                            </div>
                                            <h4 className="text-2xl sm:text-3xl font-bold text-white">100%</h4>
                                        </div>
                                        <p className="text-zinc-400 text-sm font-medium">Client Satisfaction</p>
                                    </div>
                                </div>

                                
                            </div>
                        </div>
                    )}
                </div>
            </section>
        );
    }
}

export default AboutSection;