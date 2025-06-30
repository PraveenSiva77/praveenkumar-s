import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import { fetchProjectById } from "../services/api"; // Ensure this path is correct
import { useParams, useNavigate } from "react-router-dom";
import {
  IoArrowBack,
  IoCodeSlashOutline,
  IoLogoGithub,
  IoLogoLinkedin,
  IoPeopleOutline,
  IoCheckmarkCircle,
  IoAlertCircle,
} from "react-icons/io5";
import {
  FiExternalLink,
  FiGithub,
  FiUser,
  FiCalendar,
  FiTag,
  FiFolder,
  FiClock,
  FiUsers,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";

// Consider defining types in a separate file if they are shared across multiple components
interface ProjectData {
  id: string;
  name: string;
  description: string;
  projectImage: string; // Ensure this holds the full, absolute URL to the image
  startDate: string;
  endDate?: string;
  liveLink?: string;
  githubLink?: string;
  category?: { name: string };
  tags: string[];
  members: {
    id: string;
    role: string;
    member: {
      name: string;
      profileImage: string;
      githubLink?: string;
      linkedinLink?: string;
    };
  }[];
}

const Project: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [project, setProject] = useState<ProjectData | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const getProject = async () => {
      try {
        if (!id) {
          setError("Project ID is missing.");
          setLoading(false);
          return;
        }
        const data = await fetchProjectById(id);
        setProject(data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to load project. Please try again.");
        setLoading(false);
      }
    };

    getProject();
  }, [id]);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const generateMetaTags = useCallback(
    (project: ProjectData) => {
      // Ensure the URL is absolute and canonical for social sharing
      const currentUrl = window.location.href; // This will give the full URL like "https://yourdomain.com/projects/123"

      const description =
        project.description.length > 155
          ? `${project.description.substring(0, 155)}...`
          : project.description;

      const keywords = project.tags.join(", ");
      const teamMembers = project.members.map((m) => m.member.name).join(", ");
      const status = project.endDate ? "Completed" : "In Progress";

      const enhancedDescription = `${description} | Built with ${project.tags
        .slice(0, 3)
        .join(", ")} | Team: ${teamMembers} | Status: ${status}`;

      // Ensure project.projectImage is an absolute URL (e.g., https://yourdomain.com/images/project1.jpg)
      // If it's a relative path, prepend your base URL:
      const absoluteProjectImage = new URL(project.projectImage, window.location.origin).href;

      return {
        title: `${project.name} - Project Showcase`,
        description: enhancedDescription,
        keywords: `${keywords}, project, portfolio, development, ${
          project.category?.name || "software"
        }`,
        image: absoluteProjectImage, // This is the key for displaying the image
        url: currentUrl,
        siteName: "Developer Portfolio", // Your portfolio's name
        type: "article", // Or "website", "product", etc.
        author: teamMembers, // Or a single author name if applicable
        publishedTime: project.startDate,
        modifiedTime: project.endDate || project.startDate,
        section: project.category?.name || "Projects",
        tags: project.tags,
      };
    },
    [] // No dependencies, as project data is passed directly
  );

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading Project...</title>
          <meta name="description" content="Loading project details..." />
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-zinc-400 text-lg">Loading project details...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Helmet>
          <title>Project Not Found</title>
          <meta name="description" content="The requested project could not be found." />
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-red-600/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <IoAlertCircle className="text-red-400 text-2xl" />
            </div>
            <h2 className="text-red-400 text-xl font-semibold mb-2">Failed to Load Project</h2>
            <p className="text-zinc-500 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  if (!project) {
    return null; // Should ideally not happen after loading/error checks, but good for type safety
  }

  const metaTags = generateMetaTags(project);

  return (
    <>
      {/* Dynamic Meta Tags using react-helmet */}
      <Helmet>
        {/* Basic Meta Tags for SEO */}
        <title>{metaTags.title}</title>
        <meta name="description" content={metaTags.description} />
        <meta name="keywords" content={metaTags.keywords} />
        <meta name="author" content={metaTags.author} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={metaTags.url} />

        {/* Open Graph / Facebook / LinkedIn / WhatsApp */}
        <meta property="og:type" content={metaTags.type} />
        <meta property="og:title" content={metaTags.title} />
        <meta property="og:description" content={metaTags.description} />
        <meta property="og:image" content={metaTags.image} />
        <meta property="og:url" content={metaTags.url} />
        <meta property="og:site_name" content={metaTags.siteName} />
        <meta property="og:locale" content="en_US" />

        {/* Specific Open Graph for Images (Highly Recommended) */}
        {/* These dimensions are common for a good preview on Facebook/LinkedIn */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {/* Ensure the actual image at metaTags.image is close to these dimensions */}
        <meta property="og:image:alt" content={`${project.name} project screenshot`} />
        <meta property="og:image:type" content="image/jpeg" /> {/* Or image/png */}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" /> {/* Shows image prominently */}
        <meta name="twitter:title" content={metaTags.title} />
        <meta name="twitter:description" content={metaTags.description} />
        <meta name="twitter:image" content={metaTags.image} />
        <meta name="twitter:url" content={metaTags.url} />
        {/* Replace with your actual Twitter handle */}
        <meta name="twitter:site" content="@praveenkumar_s7" /> 
        <meta name="twitter:creator" content="@praveenkumar_s7" />

        {/* Open Graph Article properties (useful for blog posts, projects as articles) */}
        <meta property="article:author" content={metaTags.author} />
        <meta property="article:published_time" content={metaTags.publishedTime} />
        <meta property="article:modified_time" content={metaTags.modifiedTime} />
        <meta property="article:section" content={metaTags.section} />
        {metaTags.tags.map((tag: string) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#4f46e5" />
        <meta name="msapplication-TileColor" content="#4f46e5" />

        {/* Schema.org structured data (for rich snippets in search results) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork", // Or "SoftwareSourceCode", "WebPage", "Product" etc.
            name: project.name,
            description: project.description,
            image: project.projectImage,
            url: metaTags.url,
            author: project.members.map((m) => ({
              "@type": "Person",
              name: m.member.name,
              jobTitle: m.role,
            })),
            dateCreated: project.startDate,
            dateModified: project.endDate || project.startDate,
            genre: project.category?.name || "Software Development",
            keywords: project.tags.join(", "), // Schema.org prefers comma-separated string for keywords
            programmingLanguage: project.tags, // If tags represent technologies/languages
            creator: {
              "@type": "Organization", // Or "Person" if it's your individual portfolio
              name: metaTags.siteName,
            },
            // Add more relevant properties as needed for CreativeWork
            // e.g., funding: { "@type": "Grant", name: "Grant Name" }
            // or if it's an application: applicationCategory: "DeveloperTool"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <div className="relative z-10">
          {/* Header with Back Button */}
          <div className="sticky top-0 z-20 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <button
                onClick={handleBack}
                className="group flex items-center gap-3 text-zinc-300 hover:text-white font-semibold transition-all duration-200 hover:translate-x-[-4px]"
              >
                <div className="p-2 bg-zinc-800/50 rounded-lg group-hover:bg-zinc-700/50 transition-colors">
                  <IoArrowBack size={18} />
                </div>
                <span className="text-sm sm:text-base">Back to Projects</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-zinc-800/60 via-zinc-800/40 to-zinc-900/60 backdrop-blur-sm rounded-3xl border border-zinc-700/50 overflow-hidden shadow-2xl mb-8">
              {/* Project Image */}
              <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
                <img
                  src={project.projectImage}
                  alt={`${project.name} project screenshot`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/50 to-transparent" />

                {/* Social Share Button */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        // The Web Share API generally pulls the preview image from the URL's
                        // Open Graph tags. You don't typically pass image files directly
                        // unless you're sharing a file itself.
                        navigator.share({
                          title: metaTags.title,
                          text: `Check out my project: ${metaTags.description}`,
                          url: metaTags.url,
                          // images: [metaTags.image] // Not directly supported for image URLs, expects Blobs/Files
                        }).catch((error) => console.error("Error sharing:", error));
                      } else {
                        // Fallback for browsers/environments that don't support Web Share API
                        navigator.clipboard.writeText(metaTags.url);
                        alert("Link copied to clipboard! You can paste it to share.");
                      }
                    }}
                    className="flex items-center gap-2 px-3 py-2 bg-zinc-800/80 backdrop-blur-sm border border-zinc-600/50 text-zinc-300 rounded-full text-sm font-medium hover:bg-zinc-700/80 transition-colors"
                  >
                    <FiExternalLink size={14} />
                    <span className="hidden sm:inline">Share Project</span>
                  </button>
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                  <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-sm border text-sm font-medium ${
                      project.endDate
                        ? "bg-green-600/20 border-green-500/30 text-green-400"
                        : "bg-blue-600/20 border-blue-500/30 text-blue-400"
                    }`}
                  >
                    {project.endDate ? (
                      <>
                        <IoCheckmarkCircle size={16} />
                        <span className="hidden sm:inline">Completed</span>
                      </>
                    ) : (
                      <>
                        <FiClock size={16} />
                        <span className="hidden sm:inline">In Progress</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="mb-4">
                  <div className="hidden md:flex items-center gap-2 text-indigo-400 text-sm font-medium mb-3">
                    <HiOutlineSparkles />
                    Featured Project
                  </div>
                  <h1 className="hidden md:block text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                    {project.name}
                  </h1>
                </div>

                {/* Tags (visible on larger screens) */}
                <div className="hidden md:flex flex-wrap gap-2">
                  {project.tags.slice(0, 4).map((tag: string) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1.5 bg-zinc-800/80 backdrop-blur-sm border border-zinc-600/50 text-zinc-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-zinc-700/80 transition-colors"
                    >
                      <FiTag size={12} />
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="flex items-center gap-1.5 bg-zinc-800/80 backdrop-blur-sm border border-zinc-600/50 text-zinc-400 px-3 py-1.5 rounded-full text-sm font-medium">
                      +{project.tags.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Project Description */}
                <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-6 sm:p-8">
                  <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-white mb-6">
                    <div className="p-2 bg-indigo-600/20 border border-indigo-500/30 rounded-lg">
                      <IoCodeSlashOutline size={24} />
                    </div>
                    About This Project
                  </h2>
                  <p className="text-zinc-300 leading-relaxed text-base sm:text-lg">
                    {project.description}
                  </p>
                </div>

                {/* Team Members */}
                <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-6 sm:p-8">
                  <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-white mb-6">
                    <div className="p-2 bg-purple-600/20 border border-purple-500/30 rounded-lg">
                      <IoPeopleOutline size={24} />
                    </div>
                    Team Members
                    <span className="text-sm font-normal text-zinc-400">
                      ({project.members.length})
                    </span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.members.map((m) => (
                      <div
                        key={m.id}
                        className="group flex items-center gap-4 bg-zinc-700/30 hover:bg-zinc-700/50 rounded-xl p-4 transition-all duration-200 border border-zinc-600/30 hover:border-zinc-500/50"
                      >
                        <div className="relative flex-shrink-0">
                          <img
                            src={m.member.profileImage}
                            alt={m.member.name}
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-zinc-600 group-hover:border-zinc-500 transition-colors"
                          />
                          <div className="absolute -bottom-1 -right-1 p-1 bg-indigo-600 rounded-full border-2 border-zinc-800">
                            <FiUser size={10} />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-semibold text-sm sm:text-base truncate">
                            {m.member.name}
                          </div>
                          <div className="text-indigo-400 text-xs sm:text-sm font-medium mb-2 truncate">
                            {m.role}
                          </div>
                          <div className="flex gap-3">
                            {m.member.githubLink && (
                              <a
                                href={m.member.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors text-xs"
                              >
                                <IoLogoGithub size={14} />
                                <span className="hidden sm:inline">GitHub</span>
                              </a>
                            )}
                            {m.member.linkedinLink && (
                              <a
                                href={m.member.linkedinLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-zinc-400 hover:text-blue-400 transition-colors text-xs"
                              >
                                <IoLogoLinkedin size={14} />
                                <span className="hidden sm:inline">LinkedIn</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Project Details */}
                <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-6">Project Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-zinc-700/50 rounded-lg mt-0.5">
                        <FiFolder size={16} />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs text-zinc-500 uppercase tracking-wide">
                          Category
                        </span>
                        <div className="text-white font-semibold">
                          {project.category?.name || "Uncategorized"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-zinc-700/50 rounded-lg mt-0.5">
                        <FiCalendar size={16} />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs text-zinc-500 uppercase tracking-wide">
                          Duration
                        </span>
                        <div className="text-white font-semibold text-sm">
                          {new Date(project.startDate).toLocaleDateString()} -{" "}
                          {project.endDate ? new Date(project.endDate).toLocaleDateString() : "Ongoing"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-zinc-700/50 rounded-lg mt-0.5">
                        <FiUsers size={16} />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs text-zinc-500 uppercase tracking-wide">
                          Team Size
                        </span>
                        <div className="text-white font-semibold">
                          {project.members.length} member
                          {project.members.length !== 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-indigo-500/25"
                    >
                      <FiExternalLink size={20} />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-3 bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
                    >
                      <FiGithub size={20} />
                      <span>View Source</span>
                    </a>
                  )}
                </div>

                {/* All Tags */}
                <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1.5 bg-zinc-700/50 border border-zinc-600/50 text-zinc-300 px-3 py-2 rounded-lg text-sm font-medium hover:bg-zinc-600/50 transition-colors"
                      >
                        <FiTag size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;