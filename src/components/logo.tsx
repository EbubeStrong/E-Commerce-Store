import { cn } from "cn";
import Link from "next/link";

function Logo({ className }: { className?: string }) {
    return ( 
        <Link href={"/"}>
            <h2 className={cn("text-2xl text-shop-btn-dark-green font-black tracking-wider uppercase hover:text-shop-light-green hoverEffect group font-sans", className)}>Shopcar<span className="text-shop-light-green group-hover:text-shop-btn-dark-green hoverEffect">t</span></h2>
        </Link>
     );
}

export default Logo;