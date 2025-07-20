import StyledLink from "../components/StyledLink";

export default function AchivementsPage() {
    return (
        <>
            <h1 className="text-3xl font-bold mb-4">実績管理</h1>

            <h2 className="text-2xl font-bold mt-4">マスタ管理</h2>
            <div className="grid grid-cols-1 gap-4 mt-4">
            <StyledLink href="/achivements">
                タスク種類
            </StyledLink>
            <StyledLink href="/achivements/taskClasses">
                タスク分類
            </StyledLink>
        </div>
        </>
    );
}
