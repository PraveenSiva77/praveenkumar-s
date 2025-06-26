import { Component } from "react";
import { Link } from "react-router-dom";
import profile_pic from '../../assets/profile_1.jpg'

export interface ILoading {
    [key: string]: any;
}
export type IError = string | null;

export interface IHeroProps {}

export interface IHeroState {
    loading: ILoading;
    error: IError;
}

class Hero extends Component<IHeroProps, IHeroState> {
    state: IHeroState = {
        loading: {},
        error: null,
    };

    render() {
        return (
           <div className="flex flex-col items-center justify-center min-h-screen max-w-6xl overflow-hidden px-2">

                {/* profile pic only for mobile devices */}
                <img
                    src={profile_pic}
                    alt="Profile"
                    className="md:hidden w-5/6 rounded-lg"
                />

                <div className="w-full h-px mt-8 md:mt-20 animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

                <h1 className="py-3.5 px-0.5 z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text tracking-wider">
                    Praveen Siva
                </h1>

                <div className="w-full h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

                <p className="mt-4 text-base md:text-lg text-zinc-400 animate-fade-in">
                    Full Stack Developer | AI/ML Enthusiast
                </p>

                <p className="mt-2 text-lg text-zinc-400 animate-fade-in">
                    
                    Founder of {""}
                    
                    <Link
                        to="/about"
                        className="text-zinc-200 hover:bg-gradient-to-l hover:from-[#38bdf8] hover:via-[#fb7185] hover:to-[#84cc16] hover:inline-block hover:text-transparent hover:bg-clip-text transition-colors duration-300"    
                    >  
                        Creativynx.dev
                    </Link>
                </p>

                {/* <div className="my-16 text-center animate-fade-in">
                    <h2 className="text-2xl font-semibold tracking-widest text-zinc-300">
                    AI/ML & Web Developer
                    </h2>
                    <p className="mt-2 text-lg text-zinc-400">
                    Founder of{" "}
                    <a
                        href="https://creayivynx.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-200 hover:bg-gradient-to-l hover:from-[#38bdf8] hover:via-[#fb7185] hover:to-[#84cc16] hover:inline-block hover:text-transparent hover:bg-clip-text transition-colors duration-300"
                    >
                        Creativynx.dev
                    </a>
                    </p>
                </div> */}
           </div>
        );
    }
}

export default Hero;