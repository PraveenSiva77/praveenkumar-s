import { Component } from "react";
import { Link } from "react-router-dom";
import { 
    IoArrowBack, 
    IoBookOutline, 
    IoToggleOutline,
    IoShieldCheckmarkOutline,
    IoAnalyticsOutline,
    IoSettingsOutline,
    IoInformationCircleOutline,
    IoSaveOutline
} from "react-icons/io5";

interface CookieSettings {
    essential: boolean;
    analytics: boolean;
    preferences: boolean;
}

interface CookiesSettingsState {
    settings: CookieSettings;
    hasChanges: boolean;
    showSaveSuccess: boolean;
}

class CookiesSettings extends Component<{}, CookiesSettingsState> {
    state: CookiesSettingsState = {
        settings: {
            essential: true, // Always true, can't be disabled
            analytics: this.getStoredPreference('analytics', true),
            preferences: this.getStoredPreference('preferences', true),
        },
        hasChanges: false,
        showSaveSuccess: false,
    };

    componentDidMount() {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }

    getStoredPreference(key: string, defaultValue: boolean): boolean {
        try {
            const stored = localStorage.getItem(`cookie_${key}`);
            return stored !== null ? JSON.parse(stored) : defaultValue;
        } catch {
            return defaultValue;
        }
    }

    handleToggle = (cookieType: keyof CookieSettings) => {
        if (cookieType === 'essential') return; // Can't disable essential cookies

        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                [cookieType]: !prevState.settings[cookieType]
            },
            hasChanges: true,
            showSaveSuccess: false
        }));
    };

    handleSave = () => {
        const { settings } = this.state;
        
        try {
            // Save preferences to localStorage
            localStorage.setItem('cookie_analytics', JSON.stringify(settings.analytics));
            localStorage.setItem('cookie_preferences', JSON.stringify(settings.preferences));
            
            // Apply settings immediately
            this.applyCookieSettings(settings);
            
            this.setState({ 
                hasChanges: false, 
                showSaveSuccess: true 
            });

            // Hide success message after 3 seconds
            setTimeout(() => {
                this.setState({ showSaveSuccess: false });
            }, 3000);
        } catch (error) {
            console.error('Failed to save cookie settings:', error);
        }
    };

    applyCookieSettings = (settings: CookieSettings) => {
        // Handle Microsoft Clarity analytics
        if (!settings.analytics) {
            // Disable Clarity if user opts out
            try {
                // @ts-ignore
                if (window.clarity) {
                    // @ts-ignore
                    window.clarity('stop');
                }
            } catch (error) {
                console.log('Clarity not available or already stopped');
            }
        }
        
        // You can add more cookie handling logic here
    };

    handleAcceptAll = () => {
        const allAccepted: CookieSettings = {
            essential: true,
            analytics: true,
            preferences: true,
        };

        this.setState({ settings: allAccepted, hasChanges: true }, () => {
            this.handleSave();
        });
    };

    handleRejectOptional = () => {
        const onlyEssential: CookieSettings = {
            essential: true,
            analytics: false,
            preferences: false,
        };

        this.setState({ settings: onlyEssential, hasChanges: true }, () => {
            this.handleSave();
        });
    };

    render() {
        const { settings, hasChanges, showSaveSuccess } = this.state;

        return (
            <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <div className="mb-8">
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-zinc-300 hover:text-white font-semibold transition-colors hover:translate-x-[-4px] duration-200"
                        >
                            <IoArrowBack size={22} />
                            <span>Back to Home</span>
                        </Link>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="flex justify-center mb-4">
                            <div className="p-4 bg-indigo-600/20 rounded-full">
                                <IoBookOutline size={48} className="text-indigo-400" />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                            Cookie Settings
                        </h1>
                        <p className="text-zinc-400 text-lg">
                            Manage your cookie preferences and privacy settings for this website.
                        </p>
                    </div>

                    {/* Success Message */}
                    {showSaveSuccess && (
                        <div className="mb-8 p-4 bg-green-600/20 border border-green-500/50 rounded-lg flex items-center gap-3">
                            <IoShieldCheckmarkOutline className="text-green-400" size={24} />
                            <span className="text-green-300 font-medium">Settings saved successfully!</span>
                        </div>
                    )}

                    {/* Content */}
                    <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-zinc-700 p-8 space-y-8">
                        
                        {/* What are cookies */}
                        <section>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-4">
                                <IoInformationCircleOutline className="text-indigo-400" />
                                What are Cookies?
                            </h2>
                            <div className="bg-zinc-700/30 rounded-lg p-6">
                                <p className="text-zinc-300 leading-relaxed">
                                    Cookies are small text files that are stored on your device when you visit our website. 
                                    They help us provide you with a better experience by remembering your preferences and 
                                    analyzing how you use our site to improve our services.
                                </p>
                            </div>
                        </section>

                        {/* Cookie Categories */}
                        <section>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
                                <IoSettingsOutline className="text-indigo-400" />
                                Cookie Categories
                            </h2>
                            
                            <div className="space-y-6">
                                {/* Essential Cookies */}
                                <div className="bg-zinc-700/30 rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <IoShieldCheckmarkOutline className="text-green-400" size={24} />
                                            <h3 className="text-xl font-semibold text-white">Essential Cookies</h3>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-zinc-400">Always Active</span>
                                            <div className="w-12 h-6 bg-green-600 rounded-full flex items-center justify-end px-1">
                                                <div className="w-4 h-4 bg-white rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-zinc-300 mb-3">
                                        These cookies are necessary for the website to function properly. They enable core 
                                        functionality such as security, network management, and accessibility.
                                    </p>
                                    <div className="text-sm text-zinc-400">
                                        <strong>Examples:</strong> Authentication tokens, security settings, basic site functionality
                                    </div>
                                </div>

                                {/* Analytics Cookies */}
                                <div className="bg-zinc-700/30 rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <IoAnalyticsOutline className="text-blue-400" size={24} />
                                            <h3 className="text-xl font-semibold text-white">Analytics Cookies</h3>
                                        </div>
                                        <button
                                            onClick={() => this.handleToggle('analytics')}
                                            className="flex items-center gap-2 group"
                                        >
                                            <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">
                                                {settings.analytics ? 'Enabled' : 'Disabled'}
                                            </span>
                                            <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                                                settings.analytics ? 'bg-indigo-600 justify-end' : 'bg-zinc-600 justify-start'
                                            }`}>
                                                <div className="w-4 h-4 bg-white rounded-full transition-transform"></div>
                                            </div>
                                        </button>
                                    </div>
                                    <p className="text-zinc-300 mb-3">
                                        These cookies help us understand how visitors interact with our website by collecting 
                                        and reporting information anonymously. We use Microsoft Clarity for analytics.
                                    </p>
                                    <div className="text-sm text-zinc-400">
                                        <strong>Purpose:</strong> Page views, click tracking, user behavior analysis, website improvement
                                    </div>
                                </div>

                                {/* Preference Cookies */}
                                <div className="bg-zinc-700/30 rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <IoToggleOutline className="text-purple-400" size={24} />
                                            <h3 className="text-xl font-semibold text-white">Preference Cookies</h3>
                                        </div>
                                        <button
                                            onClick={() => this.handleToggle('preferences')}
                                            className="flex items-center gap-2 group"
                                        >
                                            <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">
                                                {settings.preferences ? 'Enabled' : 'Disabled'}
                                            </span>
                                            <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                                                settings.preferences ? 'bg-indigo-600 justify-end' : 'bg-zinc-600 justify-start'
                                            }`}>
                                                <div className="w-4 h-4 bg-white rounded-full transition-transform"></div>
                                            </div>
                                        </button>
                                    </div>
                                    <p className="text-zinc-300 mb-3">
                                        These cookies allow the website to remember choices you make and provide enhanced, 
                                        more personal features based on your preferences.
                                    </p>
                                    <div className="text-sm text-zinc-400">
                                        <strong>Examples:</strong> Language preferences, theme settings, form data, user interface customizations
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Cookie Details */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Detailed Cookie Information</h2>
                            <div className="bg-zinc-700/30 rounded-lg p-6">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-zinc-600">
                                                <th className="text-left py-3 px-2 text-white font-semibold">Cookie Name</th>
                                                <th className="text-left py-3 px-2 text-white font-semibold">Purpose</th>
                                                <th className="text-left py-3 px-2 text-white font-semibold">Duration</th>
                                                <th className="text-left py-3 px-2 text-white font-semibold">Type</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-zinc-300">
                                            <tr className="border-b border-zinc-700">
                                                <td className="py-3 px-2 font-mono text-xs">token</td>
                                                <td className="py-3 px-2">User authentication</td>
                                                <td className="py-3 px-2">Session</td>
                                                <td className="py-3 px-2">
                                                    <span className="bg-green-600/20 text-green-400 px-2 py-1 rounded text-xs">Essential</span>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-zinc-700">
                                                <td className="py-3 px-2 font-mono text-xs">_clck</td>
                                                <td className="py-3 px-2">Microsoft Clarity analytics</td>
                                                <td className="py-3 px-2">1 year</td>
                                                <td className="py-3 px-2">
                                                    <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs">Analytics</span>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-zinc-700">
                                                <td className="py-3 px-2 font-mono text-xs">cookie_preferences</td>
                                                <td className="py-3 px-2">Store cookie settings</td>
                                                <td className="py-3 px-2">1 year</td>
                                                <td className="py-3 px-2">
                                                    <span className="bg-purple-600/20 text-purple-400 px-2 py-1 rounded text-xs">Preference</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>

                        {/* Action Buttons */}
                        <section>
                            <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-white mb-4">Save Your Preferences</h3>
                                <div className="flex flex-wrap gap-4">
                                    <button
                                        onClick={this.handleSave}
                                        disabled={!hasChanges}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                                            hasChanges 
                                                ? 'bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105' 
                                                : 'bg-zinc-600 text-zinc-400 cursor-not-allowed'
                                        }`}
                                    >
                                        <IoSaveOutline size={20} />
                                        Save Settings
                                    </button>
                                    
                                    <button
                                        onClick={this.handleAcceptAll}
                                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
                                    >
                                        <IoShieldCheckmarkOutline size={20} />
                                        Accept All
                                    </button>
                                    
                                    <button
                                        onClick={this.handleRejectOptional}
                                        className="flex items-center gap-2 bg-zinc-600 hover:bg-zinc-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
                                    >
                                        Reject Optional
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Additional Information */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Additional Information</h2>
                            <div className="space-y-4">
                                <div className="bg-zinc-700/30 rounded-lg p-6">
                                    <h3 className="font-semibold text-white mb-3">Browser Settings</h3>
                                    <p className="text-zinc-300 mb-4">
                                        You can also control cookies through your browser settings. Most browsers allow you to:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 text-zinc-400">
                                        <li>View and delete existing cookies</li>
                                        <li>Block cookies from all or specific websites</li>
                                        <li>Set alerts when cookies are being sent</li>
                                        <li>Choose to accept or reject cookies before they are stored</li>
                                    </ul>
                                </div>
                                
                                <div className="bg-amber-600/10 border border-amber-500/20 rounded-lg p-6">
                                    <h3 className="font-semibold text-white mb-3">Important Note</h3>
                                    <p className="text-zinc-300">
                                        Disabling certain cookies may affect the functionality of this website. 
                                        Essential cookies cannot be disabled as they are necessary for the site to work properly.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

export default CookiesSettings;