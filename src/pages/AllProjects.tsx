import { Component, type ChangeEvent } from "react";
import { fetchProjects } from "../services/api";
import ProjectCard, { type IProject } from "../components/projectCard";
import { IoArrowBack, IoSearch, IoGrid } from "react-icons/io5";
// import { HiOutlineSparkles } from "react-icons/hi";
import { FiFilter, FiGrid, FiList } from "react-icons/fi";
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
    viewMode: 'grid' | 'list';
    showFilters: boolean;
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
        viewMode: 'grid',
        showFilters: false,
    };

    async fetchAndSetProjects(page: number) {
        this.setState({ loading: true, error: null });
        try {
            const res = await fetchProjects(100, page);
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

        // Reset scroll position to top on mount
        window.scrollTo(0, 0);

        await this.fetchAndSetProjects(1);
    }

    handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > this.state.totalPages) return;
        this.setState({ page: newPage });
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
            { selectedCategory: category, page: 1, showFilters: false },
            this.filterAndSearchProjects
        );
    };

    handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ search: e.target.value, page: 1 }, this.filterAndSearchProjects);
    };

    toggleFilters = () => {
        this.setState(s => ({ showFilters: !s.showFilters }));
    };

    toggleViewMode = () => {
        this.setState(s => ({ viewMode: s.viewMode === 'grid' ? 'list' : 'grid' }));
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
            viewMode,
            showFilters,
        } = this.state;

        const paginatedProjects = projects.slice(
            (page - 1) * PAGE_LIMIT,
            page * PAGE_LIMIT
        );

        return (
            <div className="min-h-screen relative overflow-hidden">
                {/* Background Effects */}
                <Particles
                    className="w-full h-full absolute top-0 left-0 animate-fade-in -z-0 pointer-events-none"
                    quantity={100}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-transparent to-purple-600/5 opacity-50"></div>

                <div className="relative z-10">
                    {/* Header */}
                    <div className="sticky top-0 z-20 border-b border-zinc-800/50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                            <div className="flex items-center justify-between mb-4 sm:mb-6">
                                <button
                                    onClick={this.handleBack}
                                    className="group flex items-center gap-3 text-zinc-300 hover:text-white font-semibold transition-all duration-200 hover:translate-x-[-4px]"
                                >
                                    <div className="p-2 bg-zinc-800/50 rounded-lg group-hover:bg-zinc-700/50 transition-colors">
                                        <IoArrowBack size={18} />
                                    </div>
                                    <span className="text-sm sm:text-base">Back</span>
                                </button>

                                {/* View Controls - Desktop */}
                                <div className="hidden sm:flex items-center gap-2">
                                    <button
                                        onClick={this.toggleViewMode}
                                        className={`p-2 rounded-lg transition-colors ${
                                            viewMode === 'grid'
                                                ? 'bg-indigo-600 text-white'
                                                : 'bg-zinc-800/50 text-zinc-400 hover:text-white'
                                        }`}
                                        title="Grid view"
                                        aria-label="Grid view"
                                    >
                                        <FiGrid size={18} />
                                    </button>
                                    <button
                                        onClick={this.toggleViewMode}
                                        className={`p-2 rounded-lg transition-colors ${
                                            viewMode === 'list'
                                                ? 'bg-indigo-600 text-white'
                                                : 'bg-zinc-800/50 text-zinc-400 hover:text-white'
                                        }`}
                                        title="List view"
                                        aria-label="List view"
                                    >
                                        <FiList size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Title and Badge */}
                            <div className="text-center">
                                {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-medium mb-4">
                                    <HiOutlineSparkles className="text-indigo-400" />
                                    Portfolio
                                </div> */}
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                                    All Projects
                                </h1>
                                <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
                                    Explore my complete collection of projects, from web applications to mobile apps.
                                </p>
                                
                                {/* Stats */}
                                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-6">
                                    <div className="flex items-center gap-2 text-zinc-500 text-sm">
                                        <IoGrid className="text-indigo-400" />
                                        <span>{projects.length} Total Projects</span>
                                    </div>
                                    <div className="hidden sm:block w-px h-4 bg-zinc-700"></div>
                                    <div className="flex items-center gap-2 text-zinc-500 text-sm">
                                        <FiFilter className="text-indigo-400" />
                                        <span>{categories.length} Categories</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                        {/* Search and Filters */}
                        <div className="mb-8 sm:mb-12 space-y-6">
                            {/* Search Bar */}
                            <div className="relative max-w-2xl mx-auto">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                                    <IoSearch size={20} />
                                </div>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={this.handleSearchChange}
                                    placeholder="Search projects by name, technology, category..."
                                    className="w-full pl-12 pr-4 py-4 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                                />
                            </div>

                            {/* Filter Toggle - Mobile */}
                            <div className="flex justify-center sm:hidden">
                                <button
                                    onClick={this.toggleFilters}
                                    className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-300 hover:text-white transition-colors"
                                >
                                    <FiFilter size={16} />
                                    <span>Filters</span>
                                    <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                                        {selectedCategory !== "All" ? 1 : 0}
                                    </span>
                                </button>
                            </div>

                            {/* Category Filters */}
                            <div className={`${showFilters ? 'block' : 'hidden'} sm:block`}>
                                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                                    <button
                                        className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base ${
                                            selectedCategory === "All"
                                                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                                                : "bg-zinc-800/50 text-zinc-300 hover:text-white hover:bg-zinc-700/50 border border-zinc-700"
                                        }`}
                                        onClick={() => this.handleCategoryChange("All")}
                                    >
                                        All
                                        <span className="ml-2 text-xs opacity-75">
                                            ({this.state.allProjects.length})
                                        </span>
                                    </button>
                                    {categories.map((cat) => {
                                        const count = this.state.allProjects.filter(p => p.category === cat).length;
                                        return (
                                            <button
                                                key={cat}
                                                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base ${
                                                    selectedCategory === cat
                                                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                                                        : "bg-zinc-800/50 text-zinc-300 hover:text-white hover:bg-zinc-700/50 border border-zinc-700"
                                                }`}
                                                onClick={() => this.handleCategoryChange(cat)}
                                            >
                                                {cat}
                                                <span className="ml-2 text-xs opacity-75">
                                                    ({count})
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="space-y-8">
                            {/* Loading State */}
                            {loading && (
                                <div className="text-center py-16 sm:py-20">
                                    <div className="inline-flex flex-col items-center gap-4">
                                        <div className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
                                        <p className="text-zinc-400 text-base sm:text-lg">Loading amazing projects...</p>
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
                                            onClick={() => this.fetchAndSetProjects(1)}
                                            className="px-6 py-3 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-colors"
                                        >
                                            Try Again
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Projects Grid/List */}
                            {!loading && !error && paginatedProjects.length > 0 && (
                                <>
                                    <div className="flex items-center justify-between mb-6">
                                        <p className="text-zinc-400 text-sm sm:text-base">
                                            Showing {(page - 1) * PAGE_LIMIT + 1}-{Math.min(page * PAGE_LIMIT, projects.length)} of {projects.length} projects
                                        </p>
                                        
                                        {/* View Toggle - Mobile */}
                                        <div className="flex sm:hidden items-center gap-1 bg-zinc-800/50 rounded-lg p-1">
                                            <button
                                                onClick={this.toggleViewMode}
                                                className={`p-2 rounded transition-colors ${
                                                    viewMode === 'grid'
                                                        ? 'bg-indigo-600 text-white'
                                                        : 'text-zinc-400'
                                                }`}
                                                title="Grid view"
                                                aria-label="Grid view"
                                            >
                                                <FiGrid size={16} />
                                            </button>
                                            <button
                                                onClick={this.toggleViewMode}
                                                className={`p-2 rounded transition-colors ${
                                                    viewMode === 'list'
                                                        ? 'bg-indigo-600 text-white'
                                                        : 'text-zinc-400'
                                                }`}
                                                title="List view"
                                                aria-label="List view"
                                            >
                                                <FiList size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className={`grid gap-6 sm:gap-8 ${
                                        viewMode === 'grid' 
                                            ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                                            : 'grid-cols-1 max-w-4xl mx-auto'
                                    }`}>
                                        {paginatedProjects.map((project, index) => (
                                            <div
                                                key={project.id}
                                                className="opacity-0 animate-fade-in-up"
                                                style={{
                                                    animationDelay: `${index * 100}ms`,
                                                    animationFillMode: 'forwards'
                                                }}
                                            >
                                                <ProjectCard project={project} />
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Empty State */}
                            {!loading && !error && paginatedProjects.length === 0 && (
                                <div className="text-center py-16 sm:py-20">
                                    <div className="inline-flex flex-col items-center gap-4 max-w-md mx-auto">
                                        <div className="w-16 h-16 bg-zinc-700/30 border border-zinc-600/30 rounded-full flex items-center justify-center">
                                            <IoSearch className="text-zinc-500 text-2xl" />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="text-zinc-400 font-semibold mb-2">No Projects Found</h3>
                                            <p className="text-zinc-500 text-sm mb-4">
                                                {search ? `No projects match "${search}"` : "No projects in this category"}
                                            </p>
                                            {(search || selectedCategory !== "All") && (
                                                <button
                                                    onClick={() => {
                                                        this.setState({ search: "", selectedCategory: "All" }, this.filterAndSearchProjects);
                                                    }}
                                                    className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                                                >
                                                    Clear filters
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Pagination */}
                            {!loading && !error && totalPages > 1 && (
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 sm:pt-12">
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-800/50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors disabled:text-zinc-500"
                                            onClick={() => this.handlePageChange(page - 1)}
                                            disabled={page === 1}
                                        >
                                            Previous
                                        </button>
                                        
                                        {/* Page Numbers */}
                                        <div className="hidden sm:flex items-center gap-1 mx-4">
                                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                let pageNum;
                                                if (totalPages <= 5) {
                                                    pageNum = i + 1;
                                                } else {
                                                    if (page <= 3) pageNum = i + 1;
                                                    else if (page >= totalPages - 2) pageNum = totalPages - 4 + i;
                                                    else pageNum = page - 2 + i;
                                                }
                                                
                                                return (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() => this.handlePageChange(pageNum)}
                                                        className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                                                            page === pageNum
                                                                ? 'bg-indigo-600 text-white'
                                                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                                                        }`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        
                                        <button
                                            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-800/50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors disabled:text-zinc-500"
                                            onClick={() => this.handlePageChange(page + 1)}
                                            disabled={page === totalPages}
                                        >
                                            Next
                                        </button>
                                    </div>
                                    
                                    <div className="text-zinc-500 text-sm">
                                        Page {page} of {totalPages}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Add the fade-in animation styles */}
                <style>{`
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
                `}</style>
            </div>
        );
    }
}

export default AllProjects;