import { Button } from "@/components/ui/button";
import { AlignLeft } from "lucide-react";

function MobileMenu() {
    return ( 
        <Button variant="outline" className="bg-transparent hover:bg-transparent hover:cursor-pointer md:hidden ">
            <AlignLeft className="hoverEffect hover:text-darkColor"/>
        </Button>
     );
}

export default MobileMenu;