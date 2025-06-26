import { Component } from "react";
import { fetchProjectById } from "../services/api";
import { withRouter } from "../util/withRouter";
import { 
    IoArrowBack, 
    IoCalendarOutline, 
    IoTimeOutline,
    IoCodeSlashOutline,
    IoLinkOutline,
    IoLogoGithub,
    IoLogoLinkedin,
    IoPeopleOutline,
    IoFolderOpenOutline
} from "react-icons/io5";
import { FiExternalLink, FiGithub, FiUser, FiCalendar, FiTag, FiFolder } from "react-icons/fi";

export interface ILoading {
    [key: string]: any;
}
export type IError = string | null;

export interface IProjectProps {
    params?: { [key: string]: string };
    navigate?: (to: string) => void;
    history?: any;
}

export interface IProjectState {
    loading: boolean;
    error: IError;
    project: any | null;
}

class Project extends Component<IProjectProps, IProjectState> {
    state: IProjectState = {
        loading: true,
        error: null,
        project: null,
    };

    async componentDidMount() {
        try {
            // Get project ID from route params if available, fallback to a default
            const id = this.props.params?.id || "";
            const data = await fetchProjectById(id);
            this.setState({ project: data.data, loading: false });
        } catch (error) {
            this.setState({ error: "Failed to load project.", loading: false });
        }
    }

    handleBack = () => {
        if (this.props.navigate) {
            this.props.navigate(-1 as any);
        } else if (this.props.history) {
            this.props.history.goBack();
        } else {
            window.history.back();
        }
    };

    render() {
        const { loading, error, project } = this.state;

        if (loading) {
            return (
                <div className="flex items-center justify-center py-20 text-zinc-400">
                    <IoTimeOutline className="animate-spin mr-2" size={24} />
                    Loading project...
                </div>
            );
        }
        if (error) {
            return (
                <div className="flex items-center justify-center py-20 text-red-400">
                    <IoFolderOpenOutline className="mr-2" size={24} />
                    {error}
                </div>
            );
        }
        if (!project) {
            return null;
        }

        return (
            <div className="min-h-screen p-6">
                {/* Back Button */}
                <div className="mb-8">
                    <button
                        onClick={this.handleBack}
                        className="flex items-center gap-2 text-zinc-300 hover:text-white font-semibold transition-colors hover:translate-x-[-4px] duration-200"
                    >
                        <IoArrowBack size={22} />
                        <span>Back to Projects</span>
                    </button>
                </div>
                <div className="max-w-4xl mx-auto py-8">

                    <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-zinc-700 overflow-hidden">
                        {/* Project Image */}
                        <div className="relative">
                            <img
                                src={project.projectImage}
                                alt={project.name}
                                className="w-full h-80 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
                        </div>

                        <div className="p-8">
                            {/* Project Title and Tags */}
                            <div className="mb-6">
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                                    {project.name}
                                </h1>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map((tag: string) => (
                                        <span 
                                            key={tag} 
                                            className="flex items-center gap-1 bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 px-3 py-1 rounded-full text-sm font-medium"
                                        >
                                            <FiTag size={12} />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Project Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="flex items-center gap-3 text-zinc-400">
                                    <div className="p-2 bg-zinc-700 rounded-lg">
                                        <FiFolder size={20} />
                                    </div>
                                    <div>
                                        <span className="text-sm text-zinc-500">Category</span>
                                        <div className="text-white font-semibold">{project.category?.name}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-zinc-400">
                                    <div className="p-2 bg-zinc-700 rounded-lg">
                                        <FiCalendar size={20} />
                                    </div>
                                    <div>
                                        <span className="text-sm text-zinc-500">Duration</span>
                                        <div className="text-white font-semibold">
                                            {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-4">
                                    <IoCodeSlashOutline size={24} />
                                    About This Project
                                </h2>
                                <p className="text-zinc-300 leading-relaxed text-lg">{project.description}</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4 mb-8">
                                {project.githubLink && (
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
                                    >
                                        <FiGithub size={20} />
                                        View Source
                                    </a>
                                )}
                                {project.liveLink && (
                                    <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
                                    >
                                        <FiExternalLink size={20} />
                                        Live Demo
                                    </a>
                                )}
                            </div>

                            {/* Team Members */}
                            <div>
                                <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-6">
                                    <IoPeopleOutline size={24} />
                                    Team Members
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.members.map((m: any) => (
                                        <div 
                                            key={m.id} 
                                            className="flex items-center gap-4 bg-zinc-700/50 hover:bg-zinc-700 rounded-xl p-4 transition-all duration-200 border border-zinc-600"
                                        >
                                            <div className="relative">
                                                <img
                                                    src={m.member.profileImage}
                                                    alt={m.member.name}
                                                    className="w-12 h-12 rounded-full object-cover border-2 border-zinc-600"
                                                />
                                                <div className="absolute -bottom-1 -right-1 p-1 bg-indigo-600 rounded-full">
                                                    <FiUser size={12} />
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-white font-semibold text-lg">{m.member.name}</div>
                                                <div className="text-indigo-400 text-sm font-medium mb-2">{m.role}</div>
                                                <div className="flex gap-3">
                                                    {m.member.githubLink && (
                                                        <a
                                                            href={m.member.githubLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors text-sm"
                                                        >
                                                            <IoLogoGithub size={16} />
                                                            GitHub
                                                        </a>
                                                    )}
                                                    {m.member.linkedinLink && (
                                                        <a
                                                            href={m.member.linkedinLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-1 text-zinc-400 hover:text-blue-400 transition-colors text-sm"
                                                        >
                                                            <IoLogoLinkedin size={16} />
                                                            LinkedIn
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Project);