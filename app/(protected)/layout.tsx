import Navbar from "@/components/navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

function ProtectedLayout({ children }: ProtectedLayoutProps) {
    return <div>{children}</div>;
}

export default ProtectedLayout;
