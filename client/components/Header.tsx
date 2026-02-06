"use client";

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}



export const Header: React.FC<HeaderProps> = ({
    children,
    className
}) => {
    
    return (
        <div className={className}>
            
            {children}
        </div>
    )
};