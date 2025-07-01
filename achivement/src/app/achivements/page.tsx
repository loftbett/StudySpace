import StyledLink from "../components/StyledLink";

export default function AchivementsPage() {
    return (
        <>
            <h1 className="text-3xl font-bold mb-4">App Router 設定画面</h1>
            <p className="text-gray-700">これは設定ページのコンテンツです。</p>

            <StyledLink href="/achivements/taskClasses">
                タスククラス
            </StyledLink>
        </>
    );
}
