import { SearchForm } from "@/components/homepage/search-form";
import { Poppins } from "next/font/google";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

export default function Home() {
    return (
        <main className="flex flex-col items-center">
            <div className="flex flex-col items-center">
                <h1 className="font-bold text-5xl w-full text-center mt-40">
                    Redefine Documents
                </h1>
                <p className="font-medium text-2xl w-full text-center mt-2">
                    Search outstanding documents like never before!
                </p>
                <SearchForm />
            </div>
        </main>
    );
}
