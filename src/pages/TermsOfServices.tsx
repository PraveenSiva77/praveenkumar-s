import { Component } from "react";
import { Link } from "react-router-dom";
import { 
    IoArrowBack, 
    IoDocumentTextOutline, 
    IoShieldCheckmarkOutline, 
    IoWarningOutline,
    IoMailOutline,
    IoCodeSlashOutline,
    IoGlobeOutline
} from "react-icons/io5";

class TermsOfServices extends Component {
    componentDidMount() {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }

    render() {
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
                                <IoDocumentTextOutline size={48} className="text-indigo-400" />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                            Terms of Service
                        </h1>
                        <p className="text-zinc-400 text-lg">
                            Please read these terms carefully before using our website and services.
                        </p>
                        <div className="text-sm text-zinc-500 mt-4">
                            Last updated: {new Date().toLocaleDateString()}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-zinc-700 p-8 space-y-8">
                        
                        {/* Acceptance of Terms */}
                        <section>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-4">
                                <IoShieldCheckmarkOutline className="text-indigo-400" />
                                Acceptance of Terms
                            </h2>
                            <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 rounded-lg p-6">
                                <p className="text-zinc-300 leading-relaxed">
                                    By accessing and using this website (www.praveensiva.me), you accept and agree to be bound by 
                                    the terms and provision of this agreement. If you do not agree to abide by the above, 
                                    please do not use this service.
                                </p>
                            </div>
                        </section>

                        {/* Website Purpose */}
                        <section>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-4">
                                <IoCodeSlashOutline className="text-indigo-400" />
                                Website Purpose
                            </h2>
                            <div className="space-y-4 text-zinc-300">
                                <p>This portfolio website serves the following purposes:</p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-zinc-700/30 rounded-lg p-4">
                                        <h3 className="font-semibold text-white mb-2">Professional Showcase</h3>
                                        <ul className="list-disc list-inside space-y-1 text-zinc-400">
                                            <li>Display my technical skills and expertise</li>
                                            <li>Showcase completed projects and work</li>
                                            <li>Share my professional experience</li>
                                            <li>Provide contact information</li>
                                        </ul>
                                    </div>
                                    
                                    <div className="bg-zinc-700/30 rounded-lg p-4">
                                        <h3 className="font-semibold text-white mb-2">Business Communication</h3>
                                        <ul className="list-disc list-inside space-y-1 text-zinc-400">
                                            <li>Facilitate client inquiries</li>
                                            <li>Enable project discussions</li>
                                            <li>Professional networking</li>
                                            <li>Career opportunities</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Use License */}
                        <section>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-4">
                                <IoGlobeOutline className="text-indigo-400" />
                                Use License
                            </h2>
                            <div className="space-y-4">
                                <div className="bg-zinc-700/30 rounded-lg p-6">
                                    <h3 className="font-semibold text-white mb-3">Permission is granted to:</h3>
                                    <ul className="list-disc list-inside space-y-2 text-zinc-300">
                                        <li>View and browse the website content</li>
                                        <li>Use the contact form for legitimate business inquiries</li>
                                        <li>Share links to the website for professional purposes</li>
                                        <li>Download publicly available resources (if any)</li>
                                    </ul>
                                </div>
                                
                                <div className="bg-red-600/10 border border-red-500/20 rounded-lg p-6">
                                    <h3 className="font-semibold text-white mb-3">You may NOT:</h3>
                                    <ul className="list-disc list-inside space-y-2 text-zinc-300">
                                        <li>Modify or copy the materials without permission</li>
                                        <li>Use the materials for commercial purposes without consent</li>
                                        <li>Attempt to reverse engineer any software or code</li>
                                        <li>Remove any copyright or proprietary notations</li>
                                        <li>Use automated systems to scrape content</li>
                                        <li>Submit spam or malicious content through forms</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Intellectual Property */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
                            <div className="space-y-4">
                                <div className="bg-zinc-700/30 rounded-lg p-6">
                                    <h3 className="font-semibold text-white mb-3">Website Content</h3>
                                    <p className="text-zinc-300 mb-4">
                                        All content on this website, including but not limited to text, graphics, logos, 
                                        images, audio clips, digital downloads, and software, is the property of 
                                        Praveenkumar S or its content suppliers.
                                    </p>
                                    <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-lg p-4">
                                        <p className="text-zinc-300">
                                            <strong className="text-white">Note:</strong> Project images and descriptions 
                                            showcase work completed as part of professional or educational activities. 
                                            Some projects may be collaborative works with appropriate attribution.
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="bg-zinc-700/30 rounded-lg p-6">
                                    <h3 className="font-semibold text-white mb-3">Third-Party Content</h3>
                                    <p className="text-zinc-300">
                                        This website may contain links to third-party websites or use third-party 
                                        libraries and frameworks. The use of such content is governed by their 
                                        respective licenses and terms.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Contact Form Terms */}
                        <section>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-4">
                                <IoMailOutline className="text-indigo-400" />
                                Contact Form Usage
                            </h2>
                            <div className="bg-zinc-700/30 rounded-lg p-6">
                                <p className="text-zinc-300 mb-4">
                                    By using the contact form, you agree to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-zinc-300">
                                    <li>Provide accurate and truthful information</li>
                                    <li>Use the form only for legitimate business inquiries</li>
                                    <li>Respect response times and communication preferences</li>
                                    <li>Not submit spam, advertisements, or malicious content</li>
                                    <li>Understand that responses are not guaranteed</li>
                                </ul>
                                
                                <div className="mt-4 p-4 bg-blue-600/10 border border-blue-500/20 rounded-lg">
                                    <p className="text-zinc-300">
                                        <strong className="text-white">Privacy:</strong> Information submitted through 
                                        the contact form is handled according to our Privacy Policy.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Disclaimer */}
                        <section>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-4">
                                <IoWarningOutline className="text-yellow-400" />
                                Disclaimer
                            </h2>
                            <div className="bg-yellow-600/10 border border-yellow-500/20 rounded-lg p-6">
                                <div className="space-y-4 text-zinc-300">
                                    <p>
                                        The information on this website is provided on an "as is" basis. To the fullest extent 
                                        permitted by law, this Company:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2">
                                        <li>Excludes all representations and warranties relating to this website and its contents</li>
                                        <li>Does not guarantee the accuracy, completeness, or timeliness of information</li>
                                        <li>Excludes all liability for damages arising from the use of this website</li>
                                        <li>Does not guarantee uninterrupted access to the website</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Professional Services */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Professional Services</h2>
                            <div className="space-y-4">
                                <div className="bg-zinc-700/30 rounded-lg p-6">
                                    <h3 className="font-semibold text-white mb-3">Service Inquiries</h3>
                                    <p className="text-zinc-300 mb-4">
                                        This website serves as a portfolio and initial point of contact. Any professional 
                                        services or project work will be governed by separate agreements.
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-zinc-400">
                                        <li>Project scope and deliverables will be defined separately</li>
                                        <li>Payment terms and conditions will be established per project</li>
                                        <li>Intellectual property rights will be addressed in project contracts</li>
                                        <li>No services are automatically provided through website contact</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Limitation of Liability */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
                            <div className="bg-red-600/10 border border-red-500/20 rounded-lg p-6">
                                <p className="text-zinc-300 leading-relaxed">
                                    In no event shall Praveenkumar S or its suppliers be liable for any damages 
                                    (including, without limitation, damages for loss of data or profit, or due to 
                                    business interruption) arising out of the use or inability to use the materials 
                                    on this website, even if authorized representative has been notified orally or 
                                    in writing of the possibility of such damage.
                                </p>
                            </div>
                        </section>

                        {/* Governing Law */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
                            <div className="bg-zinc-700/30 rounded-lg p-6">
                                <p className="text-zinc-300">
                                    These terms and conditions are governed by and construed in accordance with the 
                                    laws of India, and you irrevocably submit to the exclusive jurisdiction of the 
                                    courts in that state or location.
                                </p>
                            </div>
                        </section>

                        {/* Changes to Terms */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
                            <div className="bg-amber-600/10 border border-amber-500/20 rounded-lg p-6">
                                <p className="text-zinc-300">
                                    We reserve the right to revise these terms of service at any time without notice. 
                                    By using this website, you are agreeing to be bound by the then current version 
                                    of these terms of service.
                                </p>
                            </div>
                        </section>

                        {/* Contact Information */}
                        <section>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-4">
                                <IoMailOutline className="text-indigo-400" />
                                Contact Information
                            </h2>
                            <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 rounded-lg p-6">
                                <p className="text-zinc-300 mb-4">
                                    If you have any questions about these Terms of Service, please contact us:
                                </p>
                                <div className="space-y-2 text-zinc-400">
                                    <p><strong className="text-white">Email:</strong> sivak00763@gmail.com</p>
                                    <p><strong className="text-white">Website:</strong> www.praveensiva.me</p>
                                    <p><strong className="text-white">Response Time:</strong> Within 48 hours</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

export default TermsOfServices;