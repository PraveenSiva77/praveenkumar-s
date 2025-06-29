import { Component } from "react";
import { fetchProjectById } from "../services/api";
import { withRouter } from "../util/withRouter";
import { 
    IoArrowBack,  
    IoTimeOutline,
    IoCodeSlashOutline,
    IoLogoGithub,
    IoLogoLinkedin,
    IoPeopleOutline,
    IoFolderOpenOutline,
    IoCheckmarkCircle,
    IoAlertCircle
} from "react-icons/io5";
import { FiExternalLink, FiGithub, FiUser, FiCalendar, FiTag, FiFolder, FiClock, FiUsers } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";

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
        
        window.scrollTo(0, 0);

        try {
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
                <div className="min-h-screen flex items-center justify-center p-4">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-zinc-400 text-lg">Loading project details...</p>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="min-h-screen flex items-center justify-center p-4">
                    <div className="text-center max-w-md">
                        <div className="w-16 h-16 bg-red-600/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <IoAlertCircle className="text-red-400 text-2xl" />
                        </div>
                        <h2 className="text-red-400 text-xl font-semibold mb-2">Failed to Load Project</h2>
                        <p className="text-zinc-500 mb-6">{error}</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        if (!project) {
            return null;
        }

        return (
            <div className="min-h-screen">
                {/* Background Pattern */}
                {/* <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-transparent to-purple-600/5 opacity-50"></div> */}
                
                <div className="relative z-10">
                    {/* Header with Back Button */}
                    <div className="sticky top-0 z-20 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800/50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                            <button
                                onClick={this.handleBack}
                                className="group flex items-center gap-3 text-zinc-300 hover:text-white font-semibold transition-all duration-200 hover:translate-x-[-4px]"
                            >
                                <div className="p-2 bg-zinc-800/50 rounded-lg group-hover:bg-zinc-700/50 transition-colors">
                                    <IoArrowBack size={18} />
                                </div>
                                <span className="text-sm sm:text-base">Back to Projects</span>
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                        {/* Hero Section */}
                        <div className="relative bg-gradient-to-br from-zinc-800/60 via-zinc-800/40 to-zinc-900/60 backdrop-blur-sm rounded-3xl border border-zinc-700/50 overflow-hidden shadow-2xl mb-8">
                            {/* Project Image */}
                            <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
                                <img
                                    src={project.projectImage}
                                    alt={project.name}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/50 to-transparent" />
                                
                                {/* Status Badge */}
                                <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                                    <div className={`flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-sm border text-sm font-medium ${
                                        project.endDate 
                                            ? "bg-green-600/20 border-green-500/30 text-green-400"
                                            : "bg-blue-600/20 border-blue-500/30 text-blue-400"
                                    }`}>
                                        {project.endDate ? (
                                            <>
                                                <IoCheckmarkCircle size={16} />
                                                <span className="hidden sm:inline">Completed</span>
                                            </>
                                        ) : (
                                            <>
                                                <FiClock size={16} />
                                                <span className="hidden sm:inline">In Progress</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Project Info Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium mb-3">
                                        <HiOutlineSparkles />
                                        Featured Project
                                    </div>
                                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                        {project.name}
                                    </h1>
                                </div>
                                
                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.slice(0, 4).map((tag: string) => (
                                        <span 
                                            key={tag} 
                                            className="flex items-center gap-1.5 bg-zinc-800/80 backdrop-blur-sm border border-zinc-600/50 text-zinc-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-zinc-700/80 transition-colors"
                                        >
                                            <FiTag size={12} />
                                            {tag}
                                        </span>
                                    ))}
                                    {project.tags.length > 4 && (
                                        <span className="flex items-center gap-1.5 bg-zinc-800/80 backdrop-blur-sm border border-zinc-600/50 text-zinc-400 px-3 py-1.5 rounded-full text-sm font-medium">
                                            +{project.tags.length - 4} more
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Project Description */}
                                <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-6 sm:p-8">
                                    <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-white mb-6">
                                        <div className="p-2 bg-indigo-600/20 border border-indigo-500/30 rounded-lg">
                                            <IoCodeSlashOutline size={24} />
                                        </div>
                                        About This Project
                                    </h2>
                                    <p className="text-zinc-300 leading-relaxed text-base sm:text-lg">{project.description}</p>
                                </div>

                                {/* Team Members */}
                                <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-6 sm:p-8">
                                    <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-white mb-6">
                                        <div className="p-2 bg-purple-600/20 border border-purple-500/30 rounded-lg">
                                            <IoPeopleOutline size={24} />
                                        </div>
                                        Team Members
                                        <span className="text-sm font-normal text-zinc-400">({project.members.length})</span>
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {project.members.map((m: any) => (
                                            <div 
                                                key={m.id} 
                                                className="group flex items-center gap-4 bg-zinc-700/30 hover:bg-zinc-700/50 rounded-xl p-4 transition-all duration-200 border border-zinc-600/30 hover:border-zinc-500/50"
                                            >
                                                <div className="relative flex-shrink-0">
                                                    <img
                                                        src={m.member.profileImage}
                                                        alt={m.member.name}
                                                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-zinc-600 group-hover:border-zinc-500 transition-colors"
                                                    />
                                                    <div className="absolute -bottom-1 -right-1 p-1 bg-indigo-600 rounded-full border-2 border-zinc-800">
                                                        <FiUser size={10} />
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-white font-semibold text-sm sm:text-base truncate">{m.member.name}</div>
                                                    <div className="text-indigo-400 text-xs sm:text-sm font-medium mb-2 truncate">{m.role}</div>
                                                    <div className="flex gap-3">
                                                        {m.member.githubLink && (
                                                            <a
                                                                href={m.member.githubLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors text-xs"
                                                            >
                                                                <IoLogoGithub size={14} />
                                                                <span className="hidden sm:inline">GitHub</span>
                                                            </a>
                                                        )}
                                                        {m.member.linkedinLink && (
                                                            <a
                                                                href={m.member.linkedinLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-1 text-zinc-400 hover:text-blue-400 transition-colors text-xs"
                                                            >
                                                                <IoLogoLinkedin size={14} />
                                                                <span className="hidden sm:inline">LinkedIn</span>
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Project Details */}
                                <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-6">
                                    <h3 className="text-lg font-bold text-white mb-6">Project Details</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-zinc-700/50 rounded-lg mt-0.5">
                                                <FiFolder size={16} />
                                            </div>
                                            <div className="flex-1">
                                                <span className="text-xs text-zinc-500 uppercase tracking-wide">Category</span>
                                                <div className="text-white font-semibold">{project.category?.name || "Uncategorized"}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-zinc-700/50 rounded-lg mt-0.5">
                                                <FiCalendar size={16} />
                                            </div>
                                            <div className="flex-1">
                                                <span className="text-xs text-zinc-500 uppercase tracking-wide">Duration</span>
                                                <div className="text-white font-semibold text-sm">
                                                    {new Date(project.startDate).toLocaleDateString()} - {project.endDate ? new Date(project.endDate).toLocaleDateString() : "Ongoing"}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-zinc-700/50 rounded-lg mt-0.5">
                                                <FiUsers size={16} />
                                            </div>
                                            <div className="flex-1">
                                                <span className="text-xs text-zinc-500 uppercase tracking-wide">Team Size</span>
                                                <div className="text-white font-semibold">{project.members.length} member{project.members.length !== 1 ? 's' : ''}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    {project.liveLink && (
                                        <a
                                            href={project.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-indigo-500/25"
                                        >
                                            <FiExternalLink size={20} />
                                            <span>Live Demo</span>
                                        </a>
                                    )}
                                    {project.githubLink && (
                                        <a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center gap-3 bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
                                        >
                                            <FiGithub size={20} />
                                            <span>View Source</span>
                                        </a>
                                    )}
                                </div>

                                {/* All Tags */}
                                <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-6">
                                    <h3 className="text-lg font-bold text-white mb-4">Technologies</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag: string) => (
                                            <span 
                                                key={tag} 
                                                className="flex items-center gap-1.5 bg-zinc-700/50 border border-zinc-600/50 text-zinc-300 px-3 py-2 rounded-lg text-sm font-medium hover:bg-zinc-600/50 transition-colors"
                                            >
                                                <FiTag size={12} />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
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