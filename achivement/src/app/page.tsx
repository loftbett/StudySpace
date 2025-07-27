import Image from "next/image";
import StyledLink from "./components/StyledLink";
import clsx from "clsx";

export default function Home() {
    return (
        <div
            className={clsx(
                "grid",
                "grid-rows-[20px_1fr_20px]",
                "items-center",
                "justify-items-center",
                "min-h-screen",
                "p-8",
                "pb-20",
                "gap-16",
                "sm:p-20",
                "font-[family-name:var(--font-geist-sans)]"
            )}
        >
            <main
                className={clsx(
                    "flex",
                    "flex-wrap",
                    "justify-center",
                    "gap-8",
                    "row-start-2",
                    "items-start",
                    "sm:items-center"
                )}
            >
                <div className="flex flex-col items-center gap-2">
                    <Image
                        src="/メイン.png"
                        width={180}
                        height={180}
                        className="mt-6 rounded-lg shadow-lg"
                        objectFit="contain"
                        alt="実績管理"
                    />
                    <StyledLink href="/achivements">実績管理</StyledLink>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Image
                        src="/おやすみ.png"
                        width={180}
                        height={180}
                        className="mt-6 rounded-lg shadow-lg"
                        objectFit="contain"
                        alt="未定"
                    />
                    <StyledLink href="/">
                        未定
                    </StyledLink>
                </div>
            </main>
        </div>
    );
}
