import { twMerge } from "tailwind-merge";


interface BoxProps {
    children?: React.ReactNode;
    className?: string;
}



export const Box: React.FC<BoxProps> = ({
    children,
    className
}) => {

    return (
        <div className={twMerge(`
            bg-[#2b2a33]
            rounded-lg
            h-fit
            w-full
        `, className)}>
            {children}
        </div>
    )
};