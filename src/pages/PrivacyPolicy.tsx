import { Component } from "react";
import { Link } from "react-router-dom";
import { IoArrowBack, IoShieldCheckmarkOutline, IoEyeOutline, IoLockClosedOutline, IoMailOutline } from "react-icons/io5";

class PrivacyPolicy extends Component {
    componentDidMount() {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className="min-h-screen bg-gradient-to-br py-12 px-4">
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
                                <IoShieldCheckmarkOutline size={48} className="text-indigo-400" />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                            Privacy Policy
                        </h1>
                        <p className="text-zinc-400 text-lg">
                            Your privacy is important to us. This policy explains how we handle your information.
                        </p>
                        <div className="text-sm text-zinc-500 mt-4">
                            Last updated: {new Date().toLocaleDateString()}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-zinc-700 p-8 space-y-8">
                        
                        {/* Information We Collect */}
                        <section>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-4">
                                <IoEyeOutline className="text-indigo-400" />
                                Information We Collect
                            </h2>
                            <div className="space-y-4 text-zinc-300">
                                <div className="bg-zinc-700/30 rounded-lg p-4">
                                    <h3 className="font-semibold text-white mb-2">Contact Form Data</h3>
                                    <p>When you use our contact form, we collect:</p>
                                    <ul className="list-disc list-inside mt-2 space-y-1 text-zinc-400">
                                        <li>Your name</li>
                                        <li>Email address</li>
                                        <li>Message subject</li>
                                        <li>Message content</li>
                                    </ul>
                                </div>
                                
                                <div className="bg-zinc-700/30 rounded-lg p-4">
                                    <h3 className="font-semibold text-white mb-2">Analytics Data</h3>
                                    <p>We use Microsoft Clarity to understand how visitors interact with our website:</p>
                                    <ul className="list-disc list-inside mt-2 space-y-1 text-zinc-400">
                                        <li>Page views and session recordings</li>
                                        <li>Click patterns and scroll behavior</li>
                                        <li>Device and browser information</li>
                                        <li>General location data (country/city level)</li>
                                    </ul>
                                </div>

                                <div className="bg-zinc-700/30 rounded-lg p-4">
                                    <h3 className="font-semibold text-white mb-2">Technical Data</h3>
                                    <p>Automatically collected for website functionality:</p>
                                    <ul className="list-disc list-inside mt-2 space-y-1 text-zinc-400">
                                        <li>IP address</li>
                                        <li>Browser type and version</li>
                                        <li>Operating system</li>
                                        <li>Referral source</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* How We Use Information */}
                        <section>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-4">
                                <IoLockClosedOutline className="text-indigo-400" />
                                How We Use Your Information
                            </h2>
                            <div className="space-y-4 text-zinc-300">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-zinc-700/30 rounded-lg p-4">
                                        <h3 className="font-semibold text-white mb-2">Contact Communications</h3>
                                        <ul className="list-disc list-inside space-y-1 text-zinc-400">
                                            <li>Respond to your inquiries</li>
                                            <li>Provide project information</li>
                                            <li>Discuss potential collaborations</li>
                                        </ul>
                                    </div>
                                    
                                    <div className="bg-zinc-700/30 rounded-lg p-4">
                                        <h3 className="font-semibold text-white mb-2">Website Improvement</h3>
                                        <ul className="list-disc list-inside space-y-1 text-zinc-400">
                                            <li>Analyze user behavior</li>
                                            <li>Improve user experience</li>
                                            <li>Fix technical issues</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Data Security */}
                        <section>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-4">
                                <IoShieldCheckmarkOutline className="text-indigo-400" />
                                Data Security
                            </h2>
                            <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 rounded-lg p-6">
                                <p className="text-zinc-300 leading-relaxed">
                                    We implement appropriate security measures to protect your personal information:
                                </p>
                                <ul className="list-disc list-inside mt-4 space-y-2 text-zinc-400">
                                    <li>HTTPS encryption for all data transmission</li>
                                    <li>Secure API endpoints with authentication</li>
                                    <li>Regular security updates and monitoring</li>
                                    <li>Limited access to personal information</li>
                                    <li>No storage of sensitive payment information</li>
                                </ul>
                            </div>
                        </section>

                        {/* Third-Party Services */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
                            <div className="space-y-4">
                                <div className="bg-zinc-700/30 rounded-lg p-4">
                                    <h3 className="font-semibold text-white mb-2">Microsoft Clarity</h3>
                                    <p className="text-zinc-300 mb-2">
                                        We use Microsoft Clarity for analytics to improve user experience.
                                    </p>
                                    <a 
                                        href="https://privacy.microsoft.com/en-us/privacystatement" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-indigo-400 hover:text-indigo-300 transition-colors"
                                    >
                                        View Microsoft's Privacy Policy →
                                    </a>
                                </div>
                                
                                <div className="bg-zinc-700/30 rounded-lg p-4">
                                    <h3 className="font-semibold text-white mb-2">GitHub Pages</h3>
                                    <p className="text-zinc-300 mb-2">
                                        This website is hosted on GitHub Pages.
                                    </p>
                                    <a 
                                        href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-indigo-400 hover:text-indigo-300 transition-colors"
                                    >
                                        View GitHub's Privacy Policy →
                                    </a>
                                </div>
                            </div>
                        </section>

                        {/* Your Rights */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
                            <div className="bg-zinc-700/30 rounded-lg p-6">
                                <p className="text-zinc-300 mb-4">You have the right to:</p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <ul className="list-disc list-inside space-y-2 text-zinc-400">
                                        <li>Request access to your personal data</li>
                                        <li>Request correction of inaccurate data</li>
                                        <li>Request deletion of your data</li>
                                    </ul>
                                    <ul className="list-disc list-inside space-y-2 text-zinc-400">
                                        <li>Object to processing of your data</li>
                                        <li>Request data portability</li>
                                        <li>Withdraw consent at any time</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Contact Information */}
                        <section>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-4">
                                <IoMailOutline className="text-indigo-400" />
                                Contact Us
                            </h2>
                            <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 rounded-lg p-6">
                                <p className="text-zinc-300 mb-4">
                                    If you have any questions about this Privacy Policy or your personal data, please contact us:
                                </p>
                                <div className="space-y-2 text-zinc-400">
                                    <p><strong className="text-white">Email:</strong> praveensiva0820@gmail.com</p>
                                    <p><strong className="text-white">Website:</strong> www.praveensiva.me</p>
                                    <p><strong className="text-white">Response Time:</strong> Within 48 hours</p>
                                </div>
                            </div>
                        </section>

                        {/* Updates */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Policy Updates</h2>
                            <div className="bg-amber-600/10 border border-amber-500/20 rounded-lg p-6">
                                <p className="text-zinc-300">
                                    We may update this Privacy Policy from time to time. Any changes will be posted on this page 
                                    with an updated revision date. We encourage you to review this policy periodically.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

export default PrivacyPolicy;