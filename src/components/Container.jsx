import React from "react";

const Container = ({children}) => {
    return (
        <div className="mx-auto px-4 w-full max-w-[1200px]">
            {children}
        </div>
    )
}

export default Container;