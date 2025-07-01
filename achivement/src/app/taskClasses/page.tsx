import { Suspense } from "react";
import SearchForm from "../components/SearchForm";

interface TaskClassPagesProps {
    searchParams?: {
        task_class_no?: string;
    };
}

export default async function TaskClassPage({
    searchParams,
}: TaskClassPagesProps) {
    const taskClassNo = searchParams?.task_class_no || "";

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">タスククラス</h1>
            <Suspense fallback={<p>実績データを読み込み中...</p>}>
                <SearchForm initialTaskClassNo={taskClassNo} />{" "}
                {/* 検索フォーム */}
            </Suspense>
        </div>
    );
}
