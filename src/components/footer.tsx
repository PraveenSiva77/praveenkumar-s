import { Component } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { fetchLinks } from "../services/api";
import { Link } from "react-router-dom";

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
            <footer className="w-full border-t border-zinc-800/50 py-8 mt-20">
                <div className="px-4">
                    {/* Main Content */}
                    <div className="text-center mb-8">
                        {/* Profile Section */}
                        <div className="flex flex-col items-center gap-4 mb-6">
                            <img 
                                src={ProfileUrl}
                                alt="Profile" 
                                className="w-16 h-16 object-cover rounded-full border-2 border-zinc-700/50"    
                            />
                            <div className="space-y-1">
                                <h3 className="text-zinc-200 text-xl font-semibold">
                                    {BrandName}
                                </h3>
                                <p className="text-zinc-400 text-sm">
                                    {BrandDescription}
                                </p>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex justify-center gap-4 text-zinc-400 mb-8">
                            {links.portal && (
                                <a 
                                    href={links.portal} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-800/30 hover:bg-zinc-700/50 hover:text-white transition-all duration-200"
                                    title="Portal"
                                >
                                    <FaXTwitter size={18} />
                                </a>
                            )}
                            {links.instagram && (
                                <a 
                                    href={links.instagram} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-800/30 hover:bg-zinc-700/50 hover:text-white transition-all duration-200"
                                    title="Instagram"
                                >
                                    <FaInstagram size={18} />
                                </a>
                            )}
                            {links.linkedin && (
                                <a 
                                    href={links.linkedin} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-800/30 hover:bg-zinc-700/50 hover:text-white transition-all duration-200"
                                    title="LinkedIn"
                                >
                                    <FaLinkedin size={18} />
                                </a>
                            )}
                            {links.github && (
                                <a 
                                    href={links.github} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-800/30 hover:bg-zinc-700/50 hover:text-white transition-all duration-200"
                                    title="GitHub"
                                >
                                    <FaGithub size={18} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full border-t border-zinc-800/50 pt-6">
                        {/* Bottom Section */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="text-zinc-500 text-xs">
                                © {new Date().getFullYear()} <span className="hover:text-indigo-500 cursor-pointer">{BrandName}</span>. All rights reserved.
                            </div>
                            <div className="flex gap-4 text-zinc-400 text-xs">
                                <Link to="/privacy-policy" className="hover:text-white">
                                    Privacy Policy
                                </Link>

                                <Link to="/terms-of-service" className="hover:text-white">
                                    Terms of Service
                                </Link>

                                <Link to="/cookies-settings" className="hover:text-white">
                                    Cookies Settings
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;