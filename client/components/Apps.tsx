"use client";

interface AppsProps {
    children: React.ReactNode;
    className?: string;
}



export const Apps: React.FC<AppsProps> = ({
    children,
    className
}) => {
    
    return (
        <div className={className}>
            
            {children}
        </div>
    )
};