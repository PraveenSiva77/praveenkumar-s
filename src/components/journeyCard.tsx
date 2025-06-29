import { Component } from "react";
import { FiExternalLink, FiCalendar } from "react-icons/fi";
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
}

class JourneyCard extends Component<IJourneyCardProps, IJourneyCardState> {
    state: IJourneyCardState = {
        loading: {},
        error: null,
    };

    render() {
        const { date, title, org, orgUrl, logo, description, tags } = this.props;

        return (
            <div className="relative mb-8 sm:mb-12 w-full">
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
                        <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 backdrop-blur-sm border border-zinc-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl hover:border-zinc-600/50 hover:shadow-2xl transition-all duration-300 group">
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
                                <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium">
                                    <FiCalendar className="text-indigo-500 flex-shrink-0" />
                                    <span>{date}</span>
                                </div>
                                
                                {/* Organization Link - Mobile */}
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
                            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 line-clamp-2">
                                {description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag, index) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-zinc-700/50 to-zinc-600/50 text-zinc-300 rounded-full text-xs sm:text-sm font-medium border border-zinc-600/30 hover:border-zinc-500/50 hover:from-zinc-600/50 hover:to-zinc-500/50 transition-all duration-200"
                                        style={{
                                            animationDelay: `${index * 100}ms`
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Hover Effect Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default JourneyCard;