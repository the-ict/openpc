interface ComponentCardProps {
    item: {
        id: number;
        name: string;
        img: string;
        price: number;
    };
};

export default function ComponentCard({ item }: ComponentCardProps) {
    return (
        <div className="bg-[#333] cursor-pointer rounded-lg px-2 py-4 flex items-end gap-4 justify-between">
            <div className="flex items-start gap-3 h-full">
                <img src={item.img} alt={item.name} className="h-full w-[50%] object-contain" />
                <div className="flex flex-col items-start gap-3">
                    <h3 className="font-bold text-white line-clamp-2">{item.name}</h3>
                    <p className="text-white">{item.price}$</p>
                </div>
            </div>
            <button className="bg-[#E4E728] font-bold text-black px-4 py-2 rounded-lg cursor-pointer">Choose</button>
        </div>
    );
}