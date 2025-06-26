import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

/**
 * HOC to inject router props into class components (React Router v6+)
 */
export function withRouter(Component: any) {
    function ComponentWithRouterProp(props: any) {
        const navigate = useNavigate();
        const location = useLocation();
        const params = useParams();
        return React.createElement(Component, { ...props, navigate, location, params });
    }
    return ComponentWithRouterProp;
}