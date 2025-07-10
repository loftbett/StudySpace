import { Suspense } from "react";
import SearchForm from "../../components/SearchForm";
import TaskClassesTable from "./taskClassesTable";

interface TaskClassPagesProps {
    searchParams?: Promise<{
        task_class_no?: string;
    }>;
}

export default async function TaskClassPage({
    searchParams,
}: TaskClassPagesProps) {
    let taskClassNo = "";

    if (searchParams) {
        const sP = await searchParams;
        taskClassNo = sP?.task_class_no || "";
    }
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">タスククラス</h1>
            <Suspense fallback={<p>実績データを読み込み中...</p>}>
                <SearchForm initialTaskClassNo={taskClassNo} />
                {/* 検索フォーム */}
                <TaskClassesTable task_class_no={taskClassNo} />
            </Suspense>
        </div>
    );
}
