import { FaGithub, FaLinkedinIn, FaXTwitter, FaFacebookF } from "react-icons/fa6";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
    className?: string;
    iconClassName?: string;
    tooltipClassName?: string;
}

const socialLink = [
    {
        title: "Github",
        href: "https://github.com/ebubestrong",
        icon: <FaGithub className="w-5 h-5" />
    },
    {
        title: "LinkedIn",
        href: "https://www.linkedin.com/in/abrahamsamuel567/",
        icon: <FaLinkedinIn className="w-5 h-5" />
    },
    {
        title: "X (Twitter)",
        href: "https://x.com/EbubeStrong21",
        icon: <FaXTwitter className="w-5 h-5" />
    },
    {
        title: "Facebook",
        href: "https://facebook.com/abj.strong",
        icon: <FaFacebookF className="w-5 h-5" />
    },
]



function SocialMedia({ className, iconClassName, tooltipClassName }: Props) {
    return (
        <TooltipProvider>
            <div className={cn("flex items-center gap-4", className)}>
                {socialLink?.map((item) => (
                    <Tooltip key={item?.title}>
                        <TooltipTrigger
                            render={<Link href={item?.href} target="_blank" rel="noopener noreferrer" />}
                            className={cn("p-2 border rounded-full hover:text-white hover:border-shop-light-green hoverEffect", iconClassName)}
                        >
                            {item?.icon}
                        </TooltipTrigger>

                        <TooltipContent className={cn("bg-white text-darkColor font-semibold border-2 border-green-100", tooltipClassName)}>{item?.title}
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>
        </TooltipProvider>
    );
}

export default SocialMedia;