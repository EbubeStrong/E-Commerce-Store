import { useOutsideClick } from "@/components/hooks";
import Logo from "@/components/logo";
import SocialMedia from "@/components/socialMedia";
import { headerData } from "@/constants/data";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SideMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

function SideMenu({ isOpen, onClose }: SideMenuProps) {
    const pathname = usePathname();
    const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);

    return ( 
        <div className={`fixed inset-y-0 h-screen left-0 z-50 w-full shadow-2xl bg-darkColor/30 ${isOpen ? 'translate-x-0' : '-translate-x-full'} hoverEffect`}>
            <div ref={sidebarRef} className="min-w-70 max-w-95 bg-darkColor shadow-2xl h-screen p-10 border-r border-r-shop-light-green flex flex-col gap-6">
                <div className="flex items-center justify-between gap-5">
                    <Logo className="text-white" spanColor="group-hover:text-white" />
                    <button className="hover:text-shop-light-green hoverEffect" onClick={onClose}>
                        <X />
                    </button>
                </div>

                <div className="flex flex-col space-y-3.5 font-semibold tracking-wide">
                    {headerData?.map((item) => (
                        <Link href={item.href} key={item.title} className={`inline-flex items-center w-fit hover:text-shop-light-green hoverEffect relative group ${pathname === item.href && "text-shop-light-green"}`}>
                            {item.title}
                            <span className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-shop-light-green group-hover:w-1/2 hoverEffect group-hover:left-0 ${pathname === item.href && "w-1/2"}`}/>
                            <span className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-shop-light-green group-hover:w-1/2 hoverEffect group-hover:right-0 ${pathname === item.href && "w-1/2"}`}/>
                        </Link>
                    ))}
                </div>

                <SocialMedia />
            </div>
        </div>
     );
}

export default SideMenu;