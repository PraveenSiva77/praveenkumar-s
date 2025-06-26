import { Component } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { fetchLinks } from "../services/api";

export interface IFooterProps {}

export interface IFooterState {
    links: {
        linkedin?: string;
        github?: string;
        instagram?: string;
        portal?: string;
    };
}

const ProfileUrl = "https://avatars.githubusercontent.com/u/141736774?v=4";
const BrandName = "Praveen Siva";
const BrandDescription = "Solving Problems with Code";

class Footer extends Component<IFooterProps, IFooterState> {
    state: IFooterState = {
        links: {},
    };

    async componentDidMount() {
        try {
            const res = await fetchLinks();
            this.setState({ links: res.data || {} });
        } catch {
            // fallback: keep empty links
        }
    }

    render() {
        const { links } = this.state;
        return (
            <footer className="w-full border-t border-zinc-800 pt-12 pb-6 mt-12">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
                        {/* Left: Logo and Description */}
                        <div className="flex-1 flex flex-col items-center gap-2 min-w-[220px]">
                            <div className="flex flex-col items-center justify-center gap-2 mb-2">
                                <div className="bg-white rounded-lg">
                                    <img 
                                        src={ProfileUrl}
                                        alt="Profile" 
                                        className="w-20 h-20 object-cover rounded-full"    
                                    />
                                </div>
                                <div className="flex flex-col items-center justify-cente gap-1 mt-1">
                                    <span className="text-zinc-200 text-3xl font-bold tracking-wider">
                                        {BrandName}
                                    </span>
                                    <span className="text-zinc-300/60 text-md tracking-wider">
                                        {BrandDescription}
                                    </span>
                                </div>
                            </div>
                            <p className="text-zinc-600 text-base mb-4 max-w-4xl text-center">
                                Welcome to {BrandName}, a collection showcasing my journey in technology and AI. Here, you'll discover how I approach problem-solving with a creative mindset, translating intricate requirements into robust and efficient code. Each project reflects my enthusiasm for learning, building, and delivering intelligent solutions that drive real-world value.
                            </p>
                            <div className="flex gap-6 text-zinc-400 text-xl mb-4">
                                {links.portal && (
                                    <a href={links.portal} target="_blank" rel="noopener noreferrer" className="hover:text-white" title="Portal">
                                        <FaXTwitter />
                                    </a>
                                )}
                                {links.instagram && (
                                    <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white" title="Instagram">
                                        <FaInstagram />
                                    </a>
                                )}
                                {links.linkedin && (
                                    <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white" title="LinkedIn">
                                        <FaLinkedin />
                                    </a>
                                )}
                                {links.github && (
                                    <a href={links.github} target="_blank" rel="noopener noreferrer" className="hover:text-white" title="GitHub">
                                        <FaGithub />
                                    </a>
                                )}
                            </div>
                        </div>
                       
                    </div>
                    <hr className="my-8 border-zinc-800" />
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-zinc-500 text-xs">
                            © {new Date().getFullYear()} <span className="hover:text-indigo-500 cursor-pointer">{BrandName}</span>. All rights reserved.
                        </div>
                        <div className="flex gap-4 text-zinc-400 text-xs">
                            <a href="#" className="hover:text-white">Privacy Policy</a>
                            <a href="#" className="hover:text-white">Terms of Service</a>
                            <a href="#" className="hover:text-white">Cookies Settings</a>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;