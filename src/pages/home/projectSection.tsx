import { Component } from "react";
import { Link } from "react-router-dom";
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
            <div id="projects" className="py-16 md:py-24">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">My Recent Work</h2>
                        <p className="text-zinc-400 mt-2">Here are a few projects I've worked on recently.</p>
                    </div>

                    {/* Projects Grid */}
                    {loading && (
                        <div className="text-center text-zinc-400">Loading projects...</div>
                    )}
                    {error && (
                        <div className="text-center text-red-400">{error}</div>
                    )}
                    {!loading && !error && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {projects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    )}

                    {/* More Projects Button */}
                    <div className="text-center mt-16">
                        <Link
                            to="/all-projects"
                            className="inline-block bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
                        >
                            More Projects
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectSection;