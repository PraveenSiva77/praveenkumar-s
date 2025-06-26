import { Component } from "react";
import { fetchProjectById } from "../services/api";
import { withRouter } from "../util/withRouter";
import { IoArrowBack } from "react-icons/io5";

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
            const id =
                this.props.params?.id || "";
            const data = await fetchProjectById(id);
            this.setState({ project: data.data, loading: false });
        } catch (error) {
            this.setState({ error: "Failed to load project.", loading: false });
        }
    }

    handleBack = () => {
        if (this.props.navigate) {
            this.props.navigate(-1);
        } else if (this.props.history) {
            this.props.history.goBack();
        } else {
            window.history.back();
        }
    };

    render() {
        const { loading, error, project } = this.state;

        if (loading) {
            return <div className="text-center text-zinc-400 py-20">Loading project...</div>;
        }
        if (error) {
            return <div className="text-center text-red-400 py-20">{error}</div>;
        }
        if (!project) {
            return null;
        }

        return (
            <div className="max-w-3xl mx-auto py-12 px-4">
                {/* Back Button */}
                <div className="mb-8">
                    <button
                        onClick={this.handleBack}
                        className="flex items-center gap-2 text-zinc-300 hover:text-white font-semibold transition-colors"
                    >
                        <IoArrowBack size={22} />
                        <span>Back</span>
                    </button>
                </div>
                <img
                    src={project.projectImage}
                    alt={project.name}
                    className="w-full rounded-xl mb-8 object-cover max-h-80"
                />
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.name}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag: string) => (
                        <span key={tag} className="bg-zinc-700 text-zinc-200 px-3 py-1 rounded-full text-sm">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="mb-4 text-zinc-400">
                    <span className="font-semibold">Category:</span> {project.category?.name}
                </div>
                <div className="mb-4 text-zinc-400">
                    <span className="font-semibold">Duration:</span>{" "}
                    {new Date(project.startDate).toLocaleDateString()} -{" "}
                    {new Date(project.endDate).toLocaleDateString()}
                </div>
                <p className="text-zinc-300 mb-8">{project.description}</p>
                <div className="flex gap-4 mb-8">
                    {project.githubLink && (
                        <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-zinc-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-zinc-700 transition"
                        >
                            GitHub
                        </a>
                    )}
                    {project.liveLink && (
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
                        >
                            Live Demo
                        </a>
                    )}
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white mb-3">Team Members</h2>
                    <div className="flex flex-wrap gap-4">
                        {project.members.map((m: any) => (
                            <div key={m.id} className="flex items-center gap-3 bg-zinc-800 rounded-lg px-4 py-2">
                                <img
                                    src={m.member.profileImage}
                                    alt={m.member.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <div className="text-white font-semibold">{m.member.name}</div>
                                    <div className="text-zinc-400 text-sm">{m.role}</div>
                                    <div className="flex gap-2 mt-1">
                                        {m.member.githubLink && (
                                            <a
                                                href={m.member.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-zinc-300 hover:text-white"
                                            >
                                                GitHub
                                            </a>
                                        )}
                                        {m.member.linkedinLink && (
                                            <a
                                                href={m.member.linkedinLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-zinc-300 hover:text-white"
                                            >
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
        );
    }
}

export default withRouter(Project);