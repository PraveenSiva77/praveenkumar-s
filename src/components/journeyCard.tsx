import { Component } from "react";
import { FiExternalLink, FiCalendar, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

export interface ILoading {
    [key: string]: any;
}
export type IError = string | null;

export interface IJourneyCardProps {
    date: string;
    title: string;
    org: string;
    orgUrl?: string;
    logo: string;
    description: string;
    tags: string[];
}

export interface IJourneyCardState {
    loading: ILoading;
    error: IError;
    isExpanded: boolean;
}

class JourneyCard extends Component<IJourneyCardProps, IJourneyCardState> {
    state: IJourneyCardState = {
        loading: {},
        error: null,
        isExpanded: false,
    };

    toggleExpanded = () => {
        this.setState(prevState => ({
            isExpanded: !prevState.isExpanded
        }));
    };

    render() {
        const { date, title, org, orgUrl, logo, description, tags } = this.props;
        const { isExpanded } = this.state;
        
        // Determine if we should show the expand button
        const shouldShowExpandButton = description.length > 150 || tags.length > 4;
        const displayedTags = isExpanded ? tags : tags.slice(0, 4);
        const hasMoreTags = tags.length > 4;

        return (
            <div className="relative mb-8 sm:mb-12 w-full md:max-w-3xl">
                {/* Timeline Line - Hidden on mobile */}
                <div className="hidden sm:block absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500/50 to-transparent"></div>
                
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    {/* Logo Section */}
                    <div className="flex-shrink-0 relative">
                        <div className="relative group">
                            {orgUrl ? (
                                <a 
                                    href={orgUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-zinc-700/50 shadow-xl bg-zinc-800 overflow-hidden group-hover:border-indigo-500/50 group-hover:shadow-indigo-500/20 transition-all duration-300 group-hover:scale-105">
                                        <img
                                            src={logo}
                                            alt={org}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                    </div>
                                </a>
                            ) : (
                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-zinc-700/50 shadow-xl bg-zinc-800 overflow-hidden">
                                    <img
                                        src={logo}
                                        alt={org}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            )}
                            
                            {/* Timeline Dot - Hidden on mobile */}
                            <div className="hidden sm:block absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-indigo-500 rounded-full border-4 border-zinc-900 shadow-lg"></div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 w-full md:min-w-xl">
                        <div className="relative bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 backdrop-blur-sm border border-zinc-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl hover:border-zinc-600/50 hover:shadow-2xl transition-all duration-300 group">
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
                                <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium">
                                    <FiCalendar className="text-indigo-500 flex-shrink-0" />
                                    <span>{date}</span>
                                </div>
                                
                                {/* Organization Link */}
                                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                                    <HiOutlineOfficeBuilding className="text-zinc-500 flex-shrink-0" />
                                    <span className="truncate">{org}</span>
                                    {orgUrl && (
                                        <a 
                                            href={orgUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="text-zinc-500 hover:text-indigo-400 transition-colors flex-shrink-0"
                                            aria-label={`Visit ${org} website`}
                                        >
                                            <FiExternalLink size={14} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4 leading-tight group-hover:text-indigo-100 transition-colors duration-200">
                                {title}
                            </h3>

                            {/* Description */}
                            <div className="mb-4 sm:mb-6">
                                <p className={`text-zinc-300 text-sm sm:text-base leading-relaxed transition-all duration-300 ${
                                    isExpanded ? '' : 'line-clamp-3'
                                }`}>
                                    {description}
                                </p>
                                
                                {/* Description fade overlay when collapsed */}
                                {!isExpanded && description.length > 150 && (
                                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-zinc-800/40 to-transparent pointer-events-none"></div>
                                )}
                            </div>

                            {/* Tags */}
                            <div className="mb-4">
                                <div className="flex flex-wrap gap-2">
                                    {displayedTags.map((tag, index) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-zinc-700/50 to-zinc-600/50 text-zinc-300 rounded-full text-xs sm:text-sm font-medium border border-zinc-600/30 hover:border-zinc-500/50 hover:from-zinc-600/50 hover:to-zinc-500/50 transition-all duration-200 animate-fade-in"
                                            style={{
                                                animationDelay: `${index * 50}ms`
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    
                                    {/* Show remaining tags count when collapsed */}
                                    {!isExpanded && hasMoreTags && (
                                        <span className="inline-flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-indigo-300 rounded-full text-xs sm:text-sm font-medium border border-indigo-500/30">
                                            +{tags.length - 4} more
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Show More/Less Button */}
                            {shouldShowExpandButton && (
                                <button
                                    onClick={this.toggleExpanded}
                                    className="group/btn w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-zinc-700/30 to-zinc-600/30 hover:from-indigo-600/20 hover:to-purple-600/20 border border-zinc-600/30 hover:border-indigo-500/40 rounded-lg text-zinc-300 hover:text-indigo-300 text-sm font-medium transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                >
                                    <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
                                    <div className="group-hover/btn:scale-110 transition-transform duration-200">
                                        {isExpanded ? (
                                            <FiChevronUp size={16} />
                                        ) : (
                                            <FiChevronDown size={16} />
                                        )}
                                    </div>
                                </button>
                            )}

                            {/* Hover Effect Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl pointer-events-none"></div>
                        </div>
                    </div>
                </div>

                {/* Animation Styles */}
                <style>{`
                    @keyframes fade-in {
                        from {
                            opacity: 0;
                            transform: translateY(10px) scale(0.95);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0) scale(1);
                        }
                    }
                    
                    .animate-fade-in {
                        animation: fade-in 0.3s ease-out forwards;
                        opacity: 0;
                    }
                    
                    .line-clamp-3 {
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                `}</style>
            </div>
        );
    }
}

export default JourneyCard;