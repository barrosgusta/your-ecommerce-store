import { cn } from "@/lib/utils";
import { MouseEventHandler, ReactElement } from "react";

type IconButtonProps = {
    icon: ReactElement;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function IconButton({ icon, className, onClick }: IconButtonProps) {
    return (
        <button
            onClick={onClick}
            className={cn("rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition", className)}
        >
            {icon}
        </button>
    )
}