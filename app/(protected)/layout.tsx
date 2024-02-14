import Navbar from "./settings/_components/navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

function ProtectedLayout({ children }: ProtectedLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen gap-y-10 items-center justify-center overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
            <Navbar />
            <div className="flex-grow">{children}</div>
        </div>
    );
}

export default ProtectedLayout;
