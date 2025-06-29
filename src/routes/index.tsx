import { createHashRouter, Outlet, useLocation } from "react-router-dom";
import Home from "../pages/home/page";
import AllProjects from "../pages/AllProjects";
import Project from "../pages/Project";
import NotFound from "../pages/NotFound";
import Footer from "../components/footer";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfServices from "../pages/TermsOfServices";
import CookiesSettings from "../pages/CookiesSettings";

// Layout component that includes footer logic
function Layout() {
    const location = useLocation();
    
    // Define routes where footer should be hidden
    const shouldHideFooter = location.pathname === '/404' || 
        location.pathname.includes('404') ||
        location.pathname === '/not-found'

    return (
        <>
            <Outlet />
            {!shouldHideFooter && <Footer />}
        </>
    )
}

// Create the hash router
export const router = createHashRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            // Home page - main landing
            {
                index: true,
                element: <Home />,
            },
            
            // Direct home page access
            {
                path: "home",
                element: <Home />,
            },
            
            // Individual project view
            {
                path: "project/:id",
                element: <Project />,
            },
            
            // Legacy route compatibility
            {
                path: "all-projects",
                element: <AllProjects />,
            },
            
            // Privacy policy page
            {
                path: "privacy-policy",
                element: <PrivacyPolicy />,
            },

            // Terms of service page
            {
                path: "terms-of-service",
                element: <TermsOfServices />,
            },

            // Cookies settings page
            {
                path: "cookies-settings",
                element: <CookiesSettings />,
            },
        ],
    },
    
    // 404 and error handling
    {
        path: "/404",
        element: <NotFound />,
    },
    {
        path: "/not-found",
        element: <NotFound />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);