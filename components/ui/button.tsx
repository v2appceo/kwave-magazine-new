import * as React from "react";

import { cn } from "@/lib/utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    variant?: "default" | "outline" | "ghost" | "link" | "gradient" | "pill";
    size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
        // If asChild is true, we would need @radix-ui/react-slot, but let's keep it simple for now and not rely on it unless installed.
        // Actually, I didn't install @radix-ui/react-slot. I'll remove asChild support for now to avoid errors, or just render 'button'.
        const Comp = "button";

        return (
            <Comp
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    {
                        "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
                        "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
                        "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
                        "text-primary underline-offset-4 hover:underline": variant === "link",
                        "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50": variant === "gradient",
                        "bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-full": variant === "pill",
                        "h-10 px-4 py-2": size === "default",
                        "h-9 rounded-md px-3": size === "sm",
                        "h-11 rounded-md px-8": size === "lg",
                        "h-10 w-10": size === "icon",
                    },
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
