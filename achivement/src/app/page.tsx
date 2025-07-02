import Image from "next/image";
import StyledLink from "./components/StyledLink";
import clsx from "clsx";

export default function Home() {
    return (
        <div
            className={clsx(
                "grid", // グリッドレイアウト化
                "grid-rows-[20px_1fr_20px]", // グリッドの行のサイズ
                "items-center", // グリッドアイテムを垂直方向にセンター寄せ
                "justify-items-center", // グリッドアイテムを水平方向にセンター寄せ
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
                    "flex", // div要素を立て並び
                    "flex-wrap", // 画面幅が足りない場合、折り返し
                    "justify-center", // コンテンツを中央寄せ
                    "gap-8", // 要素間のスペース
                    "row-start-2", // 要素の行の開始位置
                    "items-start", //
                    "sm:items-center" // sm(640px)を超えると左端になる
                )}
            >
                <div className="flex flex-col items-center gap-2">
                    <Image
                        src="/メイン.png"
                        width={180}
                        height={180}
                        className="mt-6 rounded-lg shadow-lg"
                        objectFit="contain" // 画像のアスペクト比を維持して表示
                        alt="実績管理"
                    />
                    <StyledLink href="/achivements">実績管理</StyledLink>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Image
                        src="/メイン.png"
                        width={180}
                        height={180}
                        className="mt-6 rounded-lg shadow-lg"
                        objectFit="contain" // 画像のアスペクト比を維持して表示
                        alt="実績管理(タスククラス一覧)"
                    />
                    <StyledLink href="/achivements/taskClasses">
                        実績管理(タスククラス一覧)
                    </StyledLink>
                </div>
            </main>
        </div>
    );
}
