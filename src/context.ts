import React from "react";

interface SiteContext {
    user?: {
        username: string;
    };
};

export const Context = React.createContext({} as SiteContext);
