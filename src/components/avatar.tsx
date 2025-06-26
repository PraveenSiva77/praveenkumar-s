import { Component } from "react";

export interface ILoading {
    [key: string]: any;
}
export type IError = string | null;

export interface IAvatarProps {
    src?: string; // Single avatar image URL
    alt?: string;
    size?: number; // Avatar size in px
    list?: { src: string; alt?: string }[]; // List of avatars
    max?: number; // Max avatars to show in list
    className?: string;
}

export interface IAvatarState {
    loading: ILoading;
    error: IError;
}

class Avatar extends Component<IAvatarProps, IAvatarState> {
    state: IAvatarState = {
        loading: {},
        error: null,
    };

    render() {
        const { src, alt, size = 48, list, max = 4, className = "" } = this.props;

        if (list && list.length > 0) {
            // Show avatar group
            return (
                <div className={`flex -space-x-3 ${className}`}>
                    {list.slice(0, max).map((item, idx) => (
                        <img
                            key={idx}
                            src={item.src}
                            alt={item.alt || "Avatar"}
                            className="rounded-full border-2 border-zinc-900 object-cover"
                            style={{ width: size, height: size, zIndex: list.length - idx }}
                        />
                    ))}
                    {list.length > max && (
                        <span
                            className="flex items-center justify-center rounded-full bg-zinc-700 text-white text-xs font-semibold border-2 border-zinc-900"
                            style={{ width: size, height: size, zIndex: 0 }}
                        >
                            +{list.length - max}
                        </span>
                    )}
                </div>
            );
        }

        // Single avatar
        return (
            <img
                src={src}
                alt={alt || "Avatar"}
                className={`rounded-full object-cover border-2 border-zinc-900 ${className}`}
                style={{ width: size, height: size }}
            />
        );
    }
}

export default Avatar;