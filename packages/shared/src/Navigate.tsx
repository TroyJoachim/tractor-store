import React from 'react';

export const navigate = (path: string, e: React.MouseEvent<HTMLAnchorElement> | null = null) => {
    if (e) e.preventDefault();
    document.dispatchEvent(
        new CustomEvent('shell:navigate', { detail: { path }, bubbles: true, composed: true })
    );
};

type NavigateProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { path: string };

const Navigate: React.FC<NavigateProps> = ({ path = '#', children, onClick, ...rest }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (onClick) onClick(e);
        if (!e.defaultPrevented) {
            navigate(path, e);
        }
    };

    return (
        <a href={path} onClick={handleClick} {...rest}>
            {children}
        </a>
    );
};

export default Navigate;
