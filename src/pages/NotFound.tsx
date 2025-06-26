import { Component } from "react";
import { IoArrowBack } from "react-icons/io5";

import Particles from "../components/particles";

export interface ILoading {
    [key: string]: any;
}
export type IError = string | null;

export interface INotFoundProps {}

export interface INotFoundState {
    loading: ILoading;
    error: IError;
}

class NotFound extends Component<INotFoundProps, INotFoundState> {
    state: INotFoundState = {
        loading: {},
        error: null,
    };

    handleBack = () => {
        window.history.back();
    };

    render() {
        return (
            <div className="relative flex flex-col items-center justify-center min-h-screen overflow-x-hidden">

                <Particles
                    className="w-full h-full absolute top-0 left-0 animate-fade-in -z-0 pointer-events-none overflow-hidden"
                    quantity={150}
                />  

                <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-white mb-2">Page Not Found</h2>
                <p className="text-zinc-400 mb-8">
                    Sorry, the page you are looking for does not exist or has been moved.
                </p>
                <button
                    onClick={this.handleBack}
                    className="flex items-center gap-2 bg-zinc-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-zinc-700 transition"
                >
                    <IoArrowBack size={20} />
                    Go Back
                </button>
            </div>
        );
    }
}

export default NotFound;