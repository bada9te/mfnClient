import { TLang } from "@/types/language";
import { useEffect, useState } from "react";


export default function SwitchLocaleItem({locale, handleSelect, selected, title, localeDescription, svg}: {
    title: string;
    locale: TLang, 
    handleSelect: (a: TLang) => void,
    selected: string | null;
    localeDescription: string;
    svg: React.ReactNode;
}) {
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        setIsSelected(locale === selected);
    }, [selected, locale]);

    return (
        <div className={`card w-full md:w-[150px] shadow-xl rounded-xl ${selected === locale ? 'bg-base-100' : 'bg-base-300'} hover:bg-base-100 cursor-pointer `} onClick={() => handleSelect(locale)}>
            <div className="h-[40px] bg-base-200 rounded-lg flex flex-row justify-between items-center px-2">
                <p className="font-bold text-base-content">{title}</p>
                {
                    isSelected
                    ?
                    <input 
                        type="radio" 
                        className="radio w-4 h-4" 
                        checked
                        readOnly
                    />
                    :
                    <input 
                        type="radio" 
                        className="radio w-4 h-4" 
                        checked={false}
                        readOnly
                    />
                }
            </div>
            <div className="h-[120px] rounded-b-xl flex justify-center items-center flex-col p-2 gap-3">
                {svg}
                <p className="text-gray-400 font-medium text-[40px]">{localeDescription}</p>
            </div>
        </div>
    );
}