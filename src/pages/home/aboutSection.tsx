import { Component } from "react";
import { SiReaddotcv } from "react-icons/si";
import { fetchAbout } from "../../services/api";

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
            <div id="about" className="py-16 md:py-32 max-w-6xl mx-auto w-full">
                <div className="px-4">
                    {loading && (
                        <div className="text-center text-zinc-400">Loading about...</div>
                    )}
                    {error && (
                        <div className="text-center text-red-400">{error}</div>
                    )}
                    {!loading && !error && about && (
                        <div className="flex flex-col-reverse md:flex-row-reverse items-center gap-12 md:gap-16">
                            {/* Right Column: Text Content */}
                            <div className="w-full md:w-1/2">
                                <h2 className="text-3xl md:text-4xl font-bold text-white">
                                    {about.name}
                                </h2>
                                <div className="flex flex-wrap gap-2 mt-2 mb-4">
                                    {about.roles.map((role: string) => (
                                        <span
                                            key={role}
                                            className="bg-indigo-600/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold"
                                        >
                                            {role}
                                        </span>
                                    ))}
                                </div>
                                <p className="mt-4 text-zinc-400 whitespace-pre-line">
                                    {about.description}
                                </p>

                                {/* Stats Row (optional, static or dynamic) */}
                                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mt-8">
                                    <div>
                                        <h3 className="text-3xl font-bold text-white">3+</h3>
                                        <p className="text-zinc-400 mt-1">Years of Experience</p>
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-white">20+</h3>
                                        <p className="text-zinc-400 mt-1">Successful Projects</p>
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-white">100%</h3>
                                        <p className="text-zinc-400 mt-1">Client Satisfaction</p>
                                    </div>
                                </div>

                                {/* Call to Action */}
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <a
                                        href="#contact"
                                        className="mt-8 inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors w-full sm:w-auto text-center"
                                    >
                                        Get in Touch
                                    </a>

                                    {/* Download CV */}
                                    {about.cv && (
                                        <a
                                            href={about.cv}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-2 sm:mt-8 inline-block text-white hover:text-indigo-600 hover:border border-indigo-600 font-semibold px-6 py-3 rounded-lg transition-colors duration-300 cursor-pointer w-full sm:w-auto text-center"
                                        >
                                            <SiReaddotcv className="inline-block mr-2" />
                                            Download CV
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Left Column: Image */}
                            <div className="w-max relative h-64 sm:h-80 md:h-96 flex items-center justify-center">
                                <div className="relative w-3/4 h-full flex items-center justify-center">
                                    {/* Decorative Gradient Ring */}
                                    <div className="absolute w-56 h-56 sm:w-64 sm:h-64 md:w-full md:h-full rounded-full bg-gradient-to-tr from-indigo-500/30 via-purple-500/20 to-pink-500/20 blur-2xl z-0 animate-pulse" />
                                    {/* Profile Image with subtle hover effect */}
                                    <img
                                        src={about.image}
                                        alt={about.name}
                                        className="relative z-10 aspect-square rounded-2xl shadow-2xl object-cover border-4 border-indigo-600/60 hover:scale-105 transition-transform duration-300 bg-zinc-900"
                                    />
                                    {/* Floating badge */}
                                    {/* <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-10 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg border-2 border-zinc-900">
                                        Let’s Connect!
                                    </span> */}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default AboutSection;