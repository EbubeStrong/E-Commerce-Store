import SearchBar from "@/components/Search/searchBar";
import Logo from "../../logo";
import Container from "../container";
import HeaderMenu from "./headerMenu";
import CartIcon from "@/components/Cart/cartIcon";
import FavouriteButton from "@/components/FavouriteDisplay/favouriteButton";
import SignIn from "@/components/Authentication/signin";
import MobileMenu from "@/components/Mobile/MobileMenu/mobileMenu";

function Header() {
    return (
        <header className="bg-white py-5 border-b-black/20">
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

                    <SignIn />
                </div>
            </Container>
        </header>
    );
}

export default Header;