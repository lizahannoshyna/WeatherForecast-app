import React from "react";

const Container = ({children}) => {
    return (
        <div className="container mx-auto px-4 w-full max-w-[1140px]">
            {children}
        </div>
    )
}

export default Container;