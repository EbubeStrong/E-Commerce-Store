"use client";
import { Button } from "@/components/ui/button";
import { AlignLeft } from "lucide-react";
import SideMenu from "../SideBarMenu/sideMenu";
import { useState } from "react";

function MobileMenu() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return ( 
        <>
        <Button variant="outline" className="bg-transparent hover:bg-transparent hover:cursor-pointer md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
            <AlignLeft className="hoverEffect hover:text-darkColor"/>
        </Button>

        <div className="md:hidden">
            <SideMenu 
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            />
        </div>

        </>
     );
}

export default MobileMenu;