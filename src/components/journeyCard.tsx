import { Component } from "react";
import { FiExternalLink } from "react-icons/fi";

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
            <div className="relative mb-12 flex items-start">
                {/* Logo */}
                <div className="absolute -left-9">
                    {orgUrl ? (
                        <a href={orgUrl} target="_blank" rel="noopener noreferrer">
                            <img
                                src={logo}
                                alt={title}
                                className="w-12 h-12 rounded-full border-2 border-zinc-900 shadow-lg bg-zinc-800 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer hover:border-zinc-300"
                            />
                        </a>
                    ) : (
                        <img
                            src={logo}
                            alt={title}
                            className="w-12 h-12 rounded-full border-2 border-zinc-900 shadow-lg bg-zinc-800 object-cover"
                        />
                    )}
                </div>
                {/* Content */}
                <div className="ml-6 flex-1 md:bg-zinc-800/30 md:p-6 rounded-xl shadow-lg md:border border-zinc-700">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-indigo-400 font-semibold text-sm">{date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mt-1">{title}</h3>
                    <div className="flex items-center gap-2 text-zinc-300 font-semibold mb-2">
                        <span className="line-clamp-1">{org}</span>
                        {orgUrl && (
                            <a href={orgUrl} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
                                <FiExternalLink />
                            </a>
                        )}
                    </div>
                    <p className="text-zinc-400 mb-3">{description}</p>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="bg-zinc-700 text-zinc-200 px-3 py-1 rounded-full text-xs font-semibold"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default JourneyCard;