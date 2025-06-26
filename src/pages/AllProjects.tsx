import { Component, type ChangeEvent } from "react";
import { fetchProjects } from "../services/api";
import ProjectCard, { type IProject } from "../components/projectCard";
import { IoArrowBack, IoSearch } from "react-icons/io5";
// import { withRouter } from "../util/withRouter";

import Particles from "../components/particles";

export interface ILoading {
    [key: string]: any;
}
export type IError = string | null;

export interface IAllProjectsProps {
    navigate?: (to: string) => void;
    history?: any;
}

export interface IAllProjectsState {
    loading: boolean;
    error: IError;
    projects: IProject[];
    allProjects: IProject[];
    page: number;
    totalPages: number;
    categories: string[];
    selectedCategory: string;
    search: string;
}

const PAGE_LIMIT = 6;

class AllProjects extends Component<IAllProjectsProps, IAllProjectsState> {
    state: IAllProjectsState = {
        loading: true,
        error: null,
        projects: [],
        allProjects: [],
        page: 1,
        totalPages: 1,
        categories: [],
        selectedCategory: "All",
        search: "",
    };

    async fetchAndSetProjects(page: number) {
        this.setState({ loading: true, error: null });
        try {
            const res = await fetchProjects(100, page); // Fetch all for filtering/search
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

            // Get unique categories
            const categories = Array.from(
                new Set(projects.map((p) => p.category).filter(Boolean))
            );

            this.setState({
                allProjects: projects,
                projects: projects,
                loading: false,
                totalPages: Math.ceil(projects.length / PAGE_LIMIT),
                page: 1,
                categories,
                selectedCategory: "All",
                search: "",
            });
        } catch (error) {
            this.setState({ error: "Failed to load projects.", loading: false });
        }
    }

    async componentDidMount() {
        await this.fetchAndSetProjects(1);
    }

    handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > this.state.totalPages) return;
        this.setState({ page: newPage });
    };

    handleBack = () => {
        if (this.props.navigate) {
            this.props.navigate(-1 as any);
        } else if (this.props.history) {
            this.props.history.goBack();
        } else {
            window.history.back();
        }
    };

    handleCategoryChange = (category: string) => {
        this.setState(
            { selectedCategory: category, page: 1 },
            this.filterAndSearchProjects
        );
    };

    handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ search: e.target.value, page: 1 }, this.filterAndSearchProjects);
    };

    filterAndSearchProjects = () => {
        const { allProjects, selectedCategory, search } = this.state;
        let filtered = allProjects;

        if (selectedCategory !== "All") {
            filtered = filtered.filter((p) => p.category === selectedCategory);
        }

        if (search.trim()) {
            const s = search.trim().toLowerCase();
            filtered = filtered.filter(
                (p) =>
                    p.title.toLowerCase().includes(s) ||
                    p.tags.some((tag) => tag.toLowerCase().includes(s)) ||
                    p.category.toLowerCase().includes(s)
            );
        }

        this.setState({
            projects: filtered,
            totalPages: Math.max(1, Math.ceil(filtered.length / PAGE_LIMIT)),
            page: 1,
        });
    };

    render() {
        const {
            loading,
            error,
            projects,
            page,
            totalPages,
            categories,
            selectedCategory,
            search,
        } = this.state;

        // Pagination logic
        const paginatedProjects = projects.slice(
            (page - 1) * PAGE_LIMIT,
            page * PAGE_LIMIT
        );

        return (
            <div className="relative flex flex-col items-center justify-center h-full p-4 overflow-x-hidden">

                <Particles
                    className="w-full h-full absolute top-0 left-0 animate-fade-in -z-0 pointer-events-none overflow-hidden"
                    quantity={150}
                />     

                {/* Navigation Bar */}
                <div className="mb-8 flex w-full p-6">
                    <button
                        onClick={this.handleBack}
                        className="flex items-center gap-2 text-zinc-300 hover:text-white font-semibold transition-colors"
                    >
                        <IoArrowBack size={22} />
                        <span>Back</span>
                    </button>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">All Projects</h1>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    <button
                        className={`px-5 py-2 rounded-full font-semibold transition-colors ${
                            selectedCategory === "All"
                                ? "bg-indigo-600 text-white"
                                : "bg-zinc-100 text-zinc-700"
                        }`}
                        onClick={() => this.handleCategoryChange("All")}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`px-5 py-2 rounded-full font-semibold transition-colors ${
                                selectedCategory === cat
                                    ? "bg-indigo-600 text-white"
                                    : "bg-zinc-100 text-zinc-700"
                            }`}
                            onClick={() => this.handleCategoryChange(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="flex justify-center mb-10 w-full">
                    <div className="relative w-full max-w-3xl">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                            <IoSearch size={22} />
                        </span>
                        <input
                            type="text"
                            value={search}
                            onChange={this.handleSearchChange}
                            placeholder="Search projects by name, technology, etc..."
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-zinc-700 text-lg bg-white"
                        />
                    </div>
                </div>

                {loading && (
                    <div className="text-center text-zinc-400">Loading projects...</div>
                )}
                {error && (
                    <div className="text-center text-red-400">{error}</div>
                )}
                {!loading && !error && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
                            {paginatedProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-12">
                                <button
                                    className="px-4 py-2 rounded bg-zinc-700 text-white font-semibold disabled:opacity-50"
                                    onClick={() => this.handlePageChange(page - 1)}
                                    disabled={page === 1}
                                >
                                    Previous
                                </button>
                                <span className="mx-2 text-zinc-300">
                                    Page {page} of {totalPages}
                                </span>
                                <button
                                    className="px-4 py-2 rounded bg-zinc-700 text-white font-semibold disabled:opacity-50"
                                    onClick={() => this.handlePageChange(page + 1)}
                                    disabled={page === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                        {paginatedProjects.length === 0 && (
                            <div className="text-center text-zinc-400 mt-12">No projects found.</div>
                        )}
                    </>
                )}
            </div>
        );
    }
}

export default AllProjects;