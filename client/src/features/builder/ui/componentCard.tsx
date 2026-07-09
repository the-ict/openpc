import { IModel } from "@/src/shared/config/api/model/model.model";
import { UPLOAD_URL } from "@/src/shared/config/URLS";

interface ComponentCardProps {
    item: IModel;
    onClick?: () => void;
    onChoose?: (model: IModel) => void;
};

export default function ComponentCard({ item, onClick, onChoose }: ComponentCardProps) {
    const imageUrl = UPLOAD_URL + item.image;

    return (
        <div 
            onClick={onClick}
            className="bg-[#1a1a1a] hover:bg-[#222] cursor-pointer rounded-xl p-4 transition-all duration-200 border border-[#333] hover:border-[#555] group"
        >
            <div className="flex items-start gap-4">
                <div className="relative w-24 h-24 shrink-0 bg-[#111] rounded-lg overflow-hidden">
                    <img 
                        src={imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" 
                        crossOrigin="anonymous" 
                        onError={(e) => {
                            e.currentTarget.src = '/placeholder.png';
                        }}
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-white text-sm line-clamp-2 group-hover:text-[#E4E728] transition-colors">{item.name}</h3>
                        <span className="text-xs px-2 py-1 rounded bg-[#E4E728]/10 text-[#E4E728] font-medium whitespace-nowrap">
                            {item.brand}
                        </span>
                    </div>
                    <p className="text-neutral-400 text-xs mb-2">{item.type}</p>
                    <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-[#E4E728]">${item.price}</p>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onChoose) onChoose(item);
                            }}
                            className="px-3 cursor-pointer py-1.5 bg-[#E4E728] hover:bg-[#C4D335] text-black text-xs font-semibold rounded-lg transition-colors"
                        >
                            Tanlash
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};