import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

function SignIn() {
    return ( 
        <SignInButton mode="modal">
            <Button className="text-sm font-semibold hover:text-darkColor hoverEffect hover:cursor-pointer bg-transparent text-lightColor hover:bg-transparent">Login</Button>
        </SignInButton>
     );
}

export default SignIn;