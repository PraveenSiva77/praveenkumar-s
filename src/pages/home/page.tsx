import { Component } from "react";
import Hero from "./hero";
import Particles from "../../components/particles";
import Navbar from "../../components/navbar";
import AboutSection from "./aboutSection";
import SkillSection from "./skillSection";
import ProjectSection from "./projectSection";
import JourneySection from "./journeySection";
import GetInTouch from "./getInTouch";
import Footer from "../../components/footer";

export interface ILoading {
    [key: string]: any;
}
export type IError = string | null;

export interface IHomeProps {}

export interface IHomeState {
    loading: ILoading;
    error: IError;
}

class Home extends Component<IHomeProps, IHomeState> {
    state: IHomeState = {
        loading: {},
        error: null,
    };

    render() {
        return (
            <div className="relative flex flex-col items-center justify-center h-full overflow-x-hidden">

                <Particles
                    className="w-full h-full absolute top-0 left-0 animate-fade-in -z-0 pointer-events-none overflow-hidden"
                    quantity={150}
                />                

                <Navbar />
                <Hero />
                <AboutSection />
                <SkillSection />
                <ProjectSection />
                <JourneySection />
                <GetInTouch />
               
            </div>
        );
    }
}

export default Home;