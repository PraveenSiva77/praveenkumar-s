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
const BrandName = "My Script";
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
                        <div className="flex-1 flex flex-col gap-2 min-w-[220px]">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="bg-white rounded-lg">
                                    <img 
                                        src={ProfileUrl}
                                        alt="Profile" 
                                        className="w-10 h-10 object-cover rounded-full"    
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white text-xl font-bold tracking-wider">
                                        {BrandName}
                                    </span>
                                    <span className="text-zinc-300/60 text-xs">
                                        {BrandDescription}
                                    </span>
                                </div>
                            </div>
                            <p className="text-zinc-400 text-sm mb-4">
                                Welcome to {BrandName}, a collection showcasing my journey in technology and AI. Here, you'll discover how I approach problem-solving with a creative mindset, translating intricate requirements into robust and efficient code. Each project reflects my enthusiasm for learning, building, and delivering intelligent solutions that drive real-world value.
                            </p>
                            <div className="flex gap-4 text-zinc-400 text-xl mb-4">
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
                        {/* Center/Right: Links */}
                        <div className="flex-1 flex flex-wrap gap-12 justify-between">
                            <div>
                                <h4 className="text-white font-semibold mb-3">Portfolio</h4>
                                <ul className="space-y-2 text-zinc-400 text-sm">
                                    <li><Link to="/all-projects" className="hover:text-white">Projects</Link></li>
                                    <li><Link to="/products" className="hover:text-white">Pricing</Link></li>
                                    <li><Link to="/roadmaps" className="hover:text-white">Roadmaps</Link></li>
                                    <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold mb-3">Resources</h4>
                                <ul className="space-y-2 text-zinc-400 text-sm">
                                    <li><Link to="/snippets" className="hover:text-white">Code Snippets</Link></li>
                                    <li><Link to="/tutorials" className="hover:text-white">Tutorials</Link></li>
                                    <li><Link to="/resume.pdf" className="hover:text-white" target="_blank" rel="noopener noreferrer">Resume</Link></li>
                                    <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold mb-3">Quick Links</h4>
                                <ul className="space-y-2 text-zinc-400 text-sm">
                                    <li><Link to="/about" className="hover:text-white">About Me</Link></li>
                                    <li><Link to="/journey" className="hover:text-white">My Journey</Link></li>
                                    <li><Link to="/skills" className="hover:text-white">My Skills</Link></li>
                                    <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr className="my-8 border-zinc-800" />
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-zinc-500 text-xs">
                            © {new Date().getFullYear()} <span className="hover:text-indigo-500 cursor-pointer">Praveen Siva</span>. All rights reserved.
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