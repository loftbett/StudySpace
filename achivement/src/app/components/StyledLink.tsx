import clsx from "clsx";
import Link from "next/link";

/**
 * サイドバー用のボタン
 */

interface StyledLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export default function StyledLink({
    href,
    children,
    className,
}: StyledLinkProps) {
    return (
        <Link
            href={href}
            className={clsx(
                "rounded-full", //
                "border",
                "border-solid",
                "border-transparent",
                "transition-colors",
                "flex",
                "items-center",
                "justify-center",
                "bg-foreground",
                "text-background",
                "hover:bg-[#383838]", // ライトモード時のマウスオーバー時の背景色
                "dark:hover:bg-[#ccc]", // ダークモード時のマウスオーバー時の背景色
                "font-medium",
                "text-sm",
                "sm:text-base",
                "h-10",
                "sm:h-12",
                "px-4",
                "sm:px-5",
                "sm:w-auto",
                className
            )}
        >
            {children}
        </Link>
    );
}
