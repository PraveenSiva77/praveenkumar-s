import { Component } from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";
import { FiGrid, FiGithub, FiExternalLink, FiArrowRight, FiCode, FiUsers } from "react-icons/fi";
import ProjectCard, { type IProject } from "../../components/projectCard";
import { fetchProjects } from "../../services/api";

export interface ILoading {
    [key: string]: any;
}
export type IError = string | null;

export interface IProjectSectionProps {}

export interface IProjectSectionState {
    loading: boolean;
    error: IError;
    projects: IProject[];
}

class ProjectSection extends Component<IProjectSectionProps, IProjectSectionState> {
    state: IProjectSectionState = {
        loading: true,
        error: null,
        projects: [],
    };

    async componentDidMount() {
        try {
            const res = await fetchProjects(3); // Only fetch 3 projects
            const projects: IProject[] = res.data.map((proj: any) => ({
                id: proj.id,
                image: proj.projectImage,
                category: proj.category?.name || "",
                title: proj.name,
                status: proj.endDate ? "Completed" : "In Progress",
                tags: proj.tags,
                collaborators: (proj.members || []).map((m: any) => ({
                    name: m.member?.name || "",
                    avatarUrl: m.member?.profileImage || "",
                    github: m.member?.githubLink,
                    linkedin: m.member?.linkedinLink,
                })),
                githubUrl: proj.githubLink,
                liveUrl: proj.liveLink,
                description: proj.description,
            }));
            this.setState({ projects, loading: false });
        } catch (error) {
            this.setState({ error: "Failed to load projects.", loading: false });
        }
    }

    render() {
        const { loading, error, projects } = this.state;

        return (
            <section id="projects" className="py-12 md:py-14 lg:py-16 px-4 w-full relative overflow-hidden">
                {/* Background Pattern */}
                {/* <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-transparent to-purple-600/5 opacity-50"></div> */}
                
                <div className="relative z-10 max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                        {/* Badge */}
                        {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-medium mb-6">
                            <HiOutlineSparkles className="text-indigo-400" />
                            Featured Work
                        </div> */}
                        
                        {/* Title */}
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                            My Recent 
                            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"> Projects</span>
                        </h2>
                        
                        {/* Description */}
                        <p className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                            Here are a few projects I've worked on recently. Each one represents a unique challenge 
                            and learning experience in my development journey.
                        </p>

                        {/* Stats */}
                        {/* <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-8 sm:mt-10">
                            <div className="flex items-center gap-2 text-zinc-500 text-sm">
                                <FiGrid className="text-indigo-400" />
                                <span>{projects.length} Featured Projects</span>
                            </div>
                            <div className="hidden sm:block w-px h-4 bg-zinc-700"></div>
                            <div className="flex items-center gap-2 text-zinc-500 text-sm">
                                <FiEye className="text-indigo-400" />
                                <span>More Available in Portfolio</span>
                            </div>
                        </div> */}
                    </div>

                    {/* Content Area */}
                    <div className="relative">
                        {/* Loading State */}
                        {loading && (
                            <div className="text-center py-16 sm:py-20">
                                <div className="inline-flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
                                    <p className="text-zinc-400 text-sm sm:text-base">Loading amazing projects...</p>
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
                                        <h3 className="text-red-400 font-semibold mb-2">Failed to Load Projects</h3>
                                        <p className="text-zinc-500 text-sm">{error}</p>
                                    </div>
                                    <button 
                                        onClick={() => window.location.reload()}
                                        className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg text-sm hover:bg-red-600/30 transition-colors"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Projects Grid */}
                        {!loading && !error && projects.length > 0 && (
                            <div className="space-y-8">
                                {/* Projects Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                                    {projects.map((project, index) => (
                                        <div
                                            key={project.id}
                                            className="opacity-0 animate-fade-in-up"
                                            style={{
                                                animationDelay: `${index * 200}ms`,
                                                animationFillMode: 'forwards'
                                            }}
                                        >
                                            <ProjectCard project={project} />
                                        </div>
                                    ))}
                                </div>

                                {/* More Projects Section */}
                                <div className="text-center pt-8 sm:pt-12 lg:pt-16">
                                    <div className="inline-flex flex-col items-center gap-6 sm:gap-8">
                                        {/* Divider */}
                                        <div className="flex items-center gap-4 w-full max-w-md">
                                            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-zinc-700"></div>
                                            <span className="text-zinc-500 text-sm">Want to see more?</span>
                                            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-zinc-700"></div>
                                        </div>

                                        {/* CTA Button */}
                                        <Link
                                            to="/all-projects"
                                            className="group inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-indigo-500/25 text-sm sm:text-base"
                                        >
                                            <FiGrid className="text-lg group-hover:rotate-12 transition-transform duration-200" />
                                            View All Projects
                                            <HiOutlineArrowRight className="text-lg group-hover:translate-x-1 transition-transform duration-200" />
                                        </Link>

                                        {/* Additional Info */}
                                        <p className="text-zinc-500 text-xs sm:text-sm max-w-md">
                                            Explore my complete portfolio with detailed case studies, 
                                            technical breakdowns, and live demos.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Empty State */}
                        {!loading && !error && projects.length === 0 && (
                            <div className="text-center py-16 sm:py-20">
                                <div className="inline-flex flex-col items-center gap-4 max-w-md mx-auto">
                                    <div className="w-16 h-16 bg-zinc-700/30 border border-zinc-600/30 rounded-full flex items-center justify-center">
                                        <FiGrid className="text-zinc-500 text-2xl" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-zinc-400 font-semibold mb-2">No Projects Yet</h3>
                                        <p className="text-zinc-500 text-sm">Check back soon for exciting new projects!</p>
                                    </div>
                                </div>
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
    `
}} />
            </section>
        );
    }
}

export default ProjectSection;