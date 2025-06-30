import { Component } from "react";
import { Link as ScrollTo } from "react-scroll";
import { IoMenu, IoClose } from "react-icons/io5";

export interface ILoading {
    [key: string]: any;
}
export type IError = string | null;

export interface INavbarProps {}

export interface INavbarState {
    loading: ILoading;
    error: IError;
    mobileOpen: boolean;
}

const navItems = [
    { name: "About", href: "about" },
    { name: "Skills", href: "skills" },
    { name: "Projects", href: "projects" },
    { name: "Journey", href: "journey" },
    { name: "Contact", href: "contact" },
];

const ProfileUrl = "https://avatars.githubusercontent.com/u/141736774?v=4";

class Navbar extends Component<INavbarProps, INavbarState> {
    state: INavbarState = {
        loading: {},
        error: null,
        mobileOpen: false,
    };

    toggleMobile = () => {
        this.setState((prev) => ({ mobileOpen: !prev.mobileOpen }));
    };

    closeMobile = () => {
        this.setState({ mobileOpen: false });
    };

    render() {
        const { mobileOpen } = this.state;

        return (
            <div className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 w-full md:w-max p-2 animate-fade-in z-50 select-none">
                <div className="flex items-center justify-between mx-2 bg-zinc-800/90 backdrop-blur-md rounded-full px-1 md:p-2 shadow-lg border border-zinc-700 md:gap-2">
                    <a
                        href="/"
                        className="flex items-center space-x-2 text-white font-semibold mr-1"
                    >
                        <img
                            src={ProfileUrl}
                            alt="Profile"
                            className="w-8 h-8 rounded-full"
                        />
                    </a>
                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center">
                        {navItems.map((item) => (
                            <ScrollTo
                                key={item.name}
                                to={item.href}
                                smooth
                                duration={500}
                                offset={-80}
                                className="text-zinc-300 hover:text-white transition-colors duration-300 px-4 cursor-pointer"
                            >
                                {item.name}
                            </ScrollTo>
                        ))}
                    </div>
                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden text-zinc-300 hover:text-white p-2 rounded-full focus:outline-none"
                        onClick={this.toggleMobile}
                        aria-label="Open Menu"
                    >
                        {mobileOpen ? <IoClose size={26} /> : <IoMenu size={26} />}
                    </button>
                </div>
                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="md:hidden absolute left-0 right-0 top-16 mx-auto w-11/12 max-w-xs bg-zinc-800/95 rounded-2xl shadow-lg border border-zinc-700 flex flex-col items-center py-6 gap-2">
                        {navItems.map((item) => (
                            <ScrollTo
                                key={item.name}
                                to={item.href}
                                smooth
                                duration={500}
                                offset={-80}
                                className="text-zinc-300 hover:text-white transition-colors duration-300 py-2 px-6 w-full text-center cursor-pointer"
                                onClick={this.closeMobile}
                            >
                                {item.name}
                            </ScrollTo>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default Navbar;