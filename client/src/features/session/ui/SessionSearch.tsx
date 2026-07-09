import { Search } from "lucide-react";

export default function SessionSearch() {
    return (
        <div className="fixed bottom-10 left-0 right-0 w-screen flex items-center justify-center">
            <form className="w-[60%] relative">
                <input type="text" placeholder="Sessiyalarni qidirish..." className="bg-[#111] text-[#FFFFFF] rounded-full py-3 px-5 w-full outline-none" />
                <Search className="absolute right-5 top-1/2 transform -translate-y-1/2 text-[#FFFFFF] cursor-pointer" />
            </form>
        </div>
    )
};