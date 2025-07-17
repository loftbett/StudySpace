import { Suspense } from "react";
import SearchForm from "../../components/SearchForm";
import TaskClassesTable from "./taskClassesTable";
import Link from "next/link";
import type { TaskClass, TaskClassPagesProps } from "@/types";

async function getTaskClasses(
    taskClassNo: string | null): Promise<TaskClass[]> {
        // APIルートのURLを構築
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const url = new URL(`${baseUrl}/api/taskClasses`);
        if(taskClassNo) {
            url.searchParams.append("task_class_no", taskClassNo);
        }

        const res = await fetch(url.toString(), {
            cache: "no-store", // 常に最新データ取得
        });

        if(!res.ok) {
            // エラーハンドリング
            console.error("Failed to fetch task_class:", res.statusText);
            throw new Error("タスク分類データの取得に失敗しました。");
        }
        return res.json();
    }


export default async function TaskClassPage({
    searchParams,
}: TaskClassPagesProps) {
    let taskClassNo = "";

    if (searchParams) {
        const sP = await searchParams;
        taskClassNo = sP?.task_class_no || "";
    }
    const taskClasses = await getTaskClasses(taskClassNo);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">タスク分類</h1>
                            </div>
            <div className="flex justify-between items-center mb-2">
                <Link
                    href="/achivements/taskClasses/new"
                    className="px-8 py-2 border border-transparent rounded-md shadow-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    新規
                </Link></div>

            <Suspense fallback={<p>実績データを読み込み中...</p>}>
                {/* 検索フォーム */}
                <SearchForm initialTaskClassNo={taskClassNo} />
                
                <TaskClassesTable task_class_no={taskClassNo} taskClasses={taskClasses} />
            </Suspense>
        </div>
    );
}
