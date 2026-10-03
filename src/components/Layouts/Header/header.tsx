import SearchBar from "@/components/Search/searchBar";
import Logo from "../../logo";
import Container from "../container";
import HeaderMenu from "./headerMenu";
import CartIcon from "@/components/Cart/cartIcon";
import FavouriteButton from "@/components/FavouriteDisplay/favouriteButton";
import SignIn from "@/components/Authentication/signin";
import MobileMenu from "@/components/Screen/Mobile/MobileMenu/mobileMenu";
import { currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, Show, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Logs } from "lucide-react";
import { getMyOrders } from "@/sanity/queries";


const Header = async() => {
    const user = await currentUser();
    // console.log("Current User:", user); // Log the current user to the console

    let orders = null;
    if (user) {
        orders = await getMyOrders(user.id);
        // console.log("User Orders:", orders); // Log the user's orders to the console
    }

    return (
        <header className="bg-white/60 py-5 sticky top-0 z-50 backdrop-blur-md">
            <Container className="flex items-center justify-between text-lightColor">

                <div className="flex w-auto md:w-1/3 items-center justify-start gap-2.5 md:gap-0">
                    <MobileMenu />
                    <Logo />
                </div>

                <HeaderMenu />

                <div className="flex items-center gap-5 w-auto md:w-1/3 justify-end">
                    <SearchBar />
                    <CartIcon />
                    <FavouriteButton />

                    {user && (
                        <Link
                            href={"/orders"}
                            className="group relative hover:text-shop-light-green hoverEffect"
                        >
                            <Logs />
                            <span className="absolute -top-1 -right-1 bg-shop-dark-green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
                                {orders?.length ? orders?.length : 0}
                            </span>
                        </Link>
                    )}

                    <ClerkLoaded>
                        <Show when="signed-in">
                            <UserButton/>
                        </Show>

                        {!user && <SignIn />}
                    </ClerkLoaded>
                </div>
            </Container>
        </header>
    );
}

export default Header;