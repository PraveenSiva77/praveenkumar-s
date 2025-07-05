import { Component } from "react";
// import { Link } from "react-router-dom";
import { fetchAbout } from "../../services/api";

export interface ILoading {
    [key: string]: any;
}
export type IError = string | null;

export interface IHeroProps {}

export interface IHeroState {
    loading: boolean;
    error: IError;
    about: any | null;
}

class Hero extends Component<IHeroProps, IHeroState> {
    state: IHeroState = {
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

        // Loading state
        if (loading) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen max-w-6xl overflow-hidden px-2">
                    <div className="animate-pulse space-y-6 w-full flex flex-col items-center">
                        {/* Profile pic skeleton for mobile */}
                        <div className="md:hidden w-5/6 h-64 bg-zinc-800 rounded-lg"></div>
                        
                        {/* Divider skeleton */}
                        <div className="w-full h-px bg-zinc-800 mt-8 md:mt-20"></div>
                        
                        {/* Name skeleton */}
                        <div className="h-16 sm:h-20 md:h-32 bg-zinc-800 rounded-lg w-3/4"></div>
                        
                        {/* Divider skeleton */}
                        <div className="w-full h-px bg-zinc-800"></div>
                        
                        {/* Text skeletons */}
                        <div className="h-6 bg-zinc-800 rounded w-1/2"></div>
                        <div className="h-6 bg-zinc-800 rounded w-1/3"></div>
                    </div>
                </div>
            );
        }

        // Error state
        if (error) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen max-w-6xl overflow-hidden px-2">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-600/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-red-400 text-2xl">⚠️</span>
                        </div>
                        <h2 className="text-red-400 text-xl font-semibold mb-2">Failed to Load</h2>
                        <p className="text-zinc-500 text-sm mb-4">{error}</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-colors text-sm"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        // Main content with fetched data
        return (
            <div className="flex flex-col items-center justify-center min-h-screen max-w-6xl overflow-hidden px-2">
                {/* Profile pic only for mobile devices - using dynamic image */}
                {about?.image && (
                    <img
                        src={about.image}
                        alt={about.name || "Profile"}
                        className="md:hidden w-5/6 rounded-lg object-cover shadow-2xl border border-zinc-700/50"
                        loading="lazy"
                    />
                )}

                <div className="w-full h-px mt-8 md:mt-20 animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

                {/* Dynamic name from API */}
                <h1 className="py-3.5 px-0.5 z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text tracking-wider">
                    {about?.name || "Praveen Siva"}
                </h1>

                <div className="w-full h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

                {/* Dynamic roles from API */}
                <p className="mt-4 text-base md:text-lg text-zinc-400 animate-fade-in text-center">
                    {about?.roles ? about.roles.join(" | ") : "Full Stack Developer | AI/ML Enthusiast"}
                </p>

                {/* Dynamic tagline or company info */}
                {/* <p className="mt-2 text-lg text-zinc-400 animate-fade-in text-center">
                    {about?.tagline || (
                        <>
                            Founder of{" "}
                            <Link
                                to="/about"
                                className="text-zinc-200 hover:bg-gradient-to-l hover:from-[#38bdf8] hover:via-[#fb7185] hover:to-[#84cc16] hover:inline-block hover:text-transparent hover:bg-clip-text transition-colors duration-300"
                            >
                                Creativynx.dev
                            </Link>
                        </>
                    )}
                </p> */}

                {/* Optional: Display a short bio if available */}
                {about?.shortBio && (
                    <p className="mt-4 text-sm md:text-base text-zinc-500 animate-fade-in text-center max-w-2xl leading-relaxed">
                        {about.shortBio}
                    </p>
                )}
            </div>
        );
    }
}

export default Hero;