import { Component } from "react";
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
        this.setState({ tab });
    };

    render() {
        const { tab, loading, error, experience, education } = this.state;
        const items = tab === "Experience" ? experience : education;

        return (
            <div id="journey" className="py-16 md:py-24 max-w-6xl">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-white text-center mb-2">My Journey</h2>
                    <p className="text-zinc-400 text-center mb-8">
                        Taught by books, trained by bugs, Here is how I learned.
                    </p>

                    {/* Tabs */}
                    <div className="flex justify-center mb-4">
                        <div className="w-max flex items-center justify-center mb-12 p-1 bg-zinc-900 rounded-full relative">
                            {/* Animated background highlight */}
                            <span
                                className={`absolute top-1 left-1 h-[calc(100%-0.5rem)] w-1/2 rounded-full bg-indigo-600 transition-all duration-300 z-0
                                            ${tab === "Experience" ? "translate-x-0" : "translate-x-full"}
                                `}
                                style={{
                                    width: "calc(50% - 0.25rem)",
                                    zIndex: 0,
                                }}
                            />
                            <button
                                className={`relative px-6 py-2 rounded-full font-semibold transition-colors cursor-pointer z-10
                                        ${tab === "Experience"
                                        ? "text-white"
                                        : "text-zinc-500 hover:text-white"}
                                `}
                                onClick={() => this.setTab("Experience")}
                            >
                                Experience
                            </button>
                            <button
                                className={`relative px-6 py-2 rounded-full font-semibold transition-colors cursor-pointer z-10
                                        ${tab === "Education"
                                        ? "text-white"
                                        : "text-zinc-500 hover:text-white"}
                                `}
                                onClick={() => this.setTab("Education")}
                            >
                                Education
                            </button>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="relative pl-7">
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-zinc-700 rounded-full" />
                        {loading[tab] ? (
                            <div className="text-center text-zinc-400 py-8">Loading {tab.toLowerCase()}...</div>
                        ) : error ? (
                            <div className="text-center text-red-400 py-8">{error}</div>
                        ) : (
                            items.map((item, idx) => (
                                <JourneyCard
                                    key={idx}
                                    date={item.date}
                                    title={item.title}
                                    org={item.org}
                                    orgUrl={item.orgUrl}
                                    logo={item.logo}
                                    description={item.description}
                                    tags={item.tags}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default JourneySection;