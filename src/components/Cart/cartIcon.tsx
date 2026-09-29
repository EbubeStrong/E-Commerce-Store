"use client"
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import useStore from "../../../store";


function CartIcon() {
    const {items} = useStore()
    return ( 
        <Link href="/cart" className="group relative">
            <ShoppingBag className="w-5 h-5 hover:text-shop-light-green hoverEffect" />
            <span className="absolute -top-1 -right-1 bg-shop-dark-green text-white text-xs font-semibold rounded-full w-3.5 h-3.5 flex items-center justify-center">
               {items?.length ? items?.length : 0}
            </span>
        </Link>
     );
}

export default CartIcon;