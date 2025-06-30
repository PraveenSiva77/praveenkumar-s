import { Component } from "react";
import { HiOutlineBriefcase, HiOutlineAcademicCap } from "react-icons/hi";
import JourneyCard from "../../components/journeyCard";
import { fetchEducation, fetchExperience } from "../../services/api";

export interface ILoading {
    [key: string]: any;
}
export type IError = string | null;

export interface IJourneySectionProps {}

export interface IJourneySectionState {
    loading: ILoading;
    error: IError;
    tab: "Experience" | "Education";
    experience: any[];
    education: any[];
}

class JourneySection extends Component<IJourneySectionProps, IJourneySectionState> {
    state: IJourneySectionState = {
        loading: { Experience: false, Education: false },
        error: null,
        tab: "Experience",
        experience: [],
        education: [],
    };

    componentDidMount() {
        this.loadExperience();
        this.loadEducation();
    }

    async loadExperience() {
        this.setState((s) => ({
            loading: { ...s.loading, Experience: true },
            error: null,
        }));
        try {
            const res = await fetchExperience();
            const experience = res.data.map((exp: any) => ({
                date: `${exp.startDate ? new Date(exp.startDate).toLocaleString('default', { month: 'short', year: 'numeric' }) : ""} - ${exp.endDate ? new Date(exp.endDate).toLocaleString('default', { month: 'short', year: 'numeric' }) : "Present"}`,
                title: exp.role?.trim() || "",
                org: exp.companyName,
                orgUrl: exp.companyLink,
                logo: exp.logo,
                description: exp.description,
                tags: exp.skills,
            }));
            this.setState((s) => ({
                experience,
                loading: { ...s.loading, Experience: false },
            }));
        } catch (error) {
            this.setState((s) => ({
                error: "Failed to load experience.",
                loading: { ...s.loading, Experience: false },
            }));
        }
    }

    async loadEducation() {
        this.setState((s) => ({
            loading: { ...s.loading, Education: true },
            error: null,
        }));
        try {
            const res = await fetchEducation();
            const education = res.data.map((edu: any) => ({
                date: `${edu.startDate ? new Date(edu.startDate).getFullYear() : ""} - ${edu.endDate ? new Date(edu.endDate).getFullYear() : ""}`,
                title: edu.courseName,
                org: edu.institutionName,
                orgUrl: edu.institutionLink,
                logo: edu.logo,
                description: edu.description,
                tags: [edu.grade],
            }));
            this.setState((s) => ({
                education,
                loading: { ...s.loading, Education: false },
            }));
        } catch (error) {
            this.setState((s) => ({
                error: "Failed to load education.",
                loading: { ...s.loading, Education: false },
            }));
        }
    }

    setTab = (tab: "Experience" | "Education") => {
        this.setState({ tab, error: null });
    };

    render() {
        const { tab, loading, error, experience, education } = this.state;
        const items = tab === "Experience" ? experience : education;

        return (
            <section id="journey" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 w-full relative overflow-hidden">
                {/* Background Pattern */}
                {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-indigo-600/5 opacity-50"></div> */}
                
                <div className="relative z-10 max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        {/* Badge */}
                        {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-6">
                            <HiOutlineSparkles className="text-purple-400" />
                            Career Path
                        </div> */}
                        
                        {/* Title */}
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                            My 
                            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"> Journey</span>
                        </h2>
                        
                        {/* Description */}
                        <p className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                            Taught by books, trained by bugs. Here's how I learned and grew throughout my career.
                        </p>

                        {/* Stats */}
                        {/* <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-8 sm:mt-10">
                            <div className="flex items-center gap-2 text-zinc-500 text-sm">
                                <HiOutlineBriefcase className="text-purple-400" />
                                <span>{experience.length} Experience{experience.length !== 1 ? 's' : ''}</span>
                            </div>
                            <div className="hidden sm:block w-px h-4 bg-zinc-700"></div>
                            <div className="flex items-center gap-2 text-zinc-500 text-sm">
                                <HiOutlineAcademicCap className="text-purple-400" />
                                <span>{education.length} Education{education.length !== 1 ? 's' : ''}</span>
                            </div>
                        </div> */}
                    </div>

                    {/* Tabs Section */}
                    <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16">
                        <div className="relative bg-gradient-to-r from-zinc-900/60 via-zinc-800/60 to-zinc-900/60 backdrop-blur-md border border-zinc-700/30 rounded-2xl p-1 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
                            <div className="relative flex">
                                <button
                                    className={`relative flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 z-10 text-sm sm:text-base min-w-[120px] sm:min-w-[140px] group
                                        ${tab === "Experience"
                                            ? "text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg"
                                            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/20"}
                                    `}
                                    onClick={() => this.setTab("Experience")}
                                >
                                    <HiOutlineBriefcase className={`text-lg flex-shrink-0 transition-all duration-300 ${
                                        tab === "Experience" ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                                    }`} />
                                    <span className="hidden sm:inline font-medium">Experience</span>
                                    <span className="sm:hidden font-medium">Work</span>
                                </button>
                                
                                <button
                                    className={`relative flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 z-10 text-sm sm:text-base min-w-[120px] sm:min-w-[140px] group
                                        ${tab === "Education"
                                            ? "text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg"
                                            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/20"}
                                    `}
                                    onClick={() => this.setTab("Education")}
                                >
                                    <HiOutlineAcademicCap className={`text-lg flex-shrink-0 transition-all duration-300 ${
                                        tab === "Education" ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                                    }`} />
                                    <span className="hidden sm:inline font-medium">Education</span>
                                    <span className="sm:hidden font-medium">Study</span>
                                </button>
                            </div>

                            {/* Subtle glow effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="relative w-full flex items-center justify-center">
                        {/* Loading State */}
                        {loading[tab] && (
                            <div className="text-center py-16 sm:py-20">
                                <div className="inline-flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 border-4 border-purple-600/20 border-t-purple-600 rounded-full animate-spin"></div>
                                    <p className="text-zinc-400 text-sm sm:text-base">
                                        Loading {tab.toLowerCase()}...
                                    </p>
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
                                        <h3 className="text-red-400 font-semibold mb-2">Failed to Load {tab}</h3>
                                        <p className="text-zinc-500 text-sm">{error}</p>
                                    </div>
                                    <button 
                                        onClick={() => tab === "Experience" ? this.loadExperience() : this.loadEducation()}
                                        className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg text-sm hover:bg-red-600/30 transition-colors"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Timeline */}
                        {!loading[tab] && !error && (
                            <div className="relative">
                                {/* Main Timeline Line - Desktop */}
                                <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 via-indigo-500/30 to-transparent"></div>
                                
                                {items.length > 0 ? (
                                    <div className="space-y-8 sm:space-y-12">
                                        {items.map((item, idx) => (
                                            <div
                                                key={`${tab}-${idx}`}
                                                className="opacity-0 animate-fade-in-up"
                                                style={{
                                                    animationDelay: `${idx * 200}ms`,
                                                    animationFillMode: 'forwards'
                                                }}
                                            >
                                                <JourneyCard
                                                    date={item.date}
                                                    title={item.title}
                                                    org={item.org}
                                                    orgUrl={item.orgUrl}
                                                    logo={item.logo}
                                                    description={item.description}
                                                    tags={item.tags}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    /* Empty State */
                                    <div className="text-center py-16 sm:py-20">
                                        <div className="inline-flex flex-col items-center gap-4 max-w-md mx-auto">
                                            <div className="w-16 h-16 bg-zinc-700/30 border border-zinc-600/30 rounded-full flex items-center justify-center">
                                                {tab === "Experience" ? (
                                                    <HiOutlineBriefcase className="text-zinc-500 text-2xl" />
                                                ) : (
                                                    <HiOutlineAcademicCap className="text-zinc-500 text-2xl" />
                                                )}
                                            </div>
                                            <div className="text-center">
                                                <h3 className="text-zinc-400 font-semibold mb-2">No {tab} Yet</h3>
                                                <p className="text-zinc-500 text-sm">
                                                    {tab === "Experience" 
                                                        ? "Professional experience will be added soon!"
                                                        : "Educational background will be updated soon!"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Add the fade-in animation styles */}
                <style dangerouslySetInnerHTML={{
    __html: `
        @keyframes fade-in-up {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.6s ease-out;
        }
    `}} />
            </section>
        );
    }
}

export default JourneySection;