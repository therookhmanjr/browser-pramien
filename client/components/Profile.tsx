import { getData } from "@/essentials";

interface ProfileProps {
    children: React.ReactNode;
    className?: string;
}



export const Profile: React.FC<ProfileProps> = async ({
    children,
    className
}) => {
    const token = global.window?.localStorage.getItem('token')
    const results = await getData(`http://localhost:8080/api/getUser`, {token: token}, "POST").then(res => res.results);
    return (
        <div className={className}>
            
            {children}
        </div>
    )
};