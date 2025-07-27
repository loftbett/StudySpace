"use client";

import type { TaskClass, TaskClassesTableProps } from "@/types";
import { useState, useEffect } from "react";
import { Pencil, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
interface Props {
    taskClasses: TaskClass[];
}

export default function TaskClassesTable({
    taskClasses: initialTaskClasses,
}: Props) {
    const router = useRouter();

    let taskClasses: TaskClass[] = initialTaskClasses;

    const [editingTaskClassNo, setEditingTaskClassNo] = useState<number | null>(null);
    const [editingTaskClassName, setEditingTaskClassName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // エディットモード切替
    const handleEditClick = (taskClass: TaskClass) => {
        setEditingTaskClassNo(taskClass.task_class_no);
        setEditingTaskClassName(taskClass.task_class_name || "");
        setError(null);
    };

    // エディットキャンセル
    const handleCancelClick = () => {
        setEditingTaskClassNo(null);
        setEditingTaskClassName("");
        setError(null);
    };

    // 保存処理
    const handleSaveClick = async (taskClassNo: number) => {
        if (!editingTaskClassName.trim()) {
            setError("タスク分類名は必須です。");
            return;
        }
        setIsSubmitting(true);
        setError(null);

        try {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
            const res = await fetch(`${baseUrl}/api/taskClasses`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    task_class_no: taskClassNo,
                    task_class_name: editingTaskClassName,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "更新に失敗しました。");
            }

            setEditingTaskClassNo(null);
            router.refresh(); // データを再フェッチしてUIを更新
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "予期せぬエラーが発生しました。"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {error && (
                <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                    role="alert"
                >
                    <strong className="font-bold">エラー:</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            )}
            {initialTaskClasses.length === 0 && !error ? (
                <p className="text-gray-600">実績データがありません。</p>
            ) : (
                <div className="mt-6 overflow-x-auto overflow-y-auto max-h-[70vh] bg-white shadow-md rounded-lg">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="sticky top-0 px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-24">
                                    操作
                                </th>
                                <th className="sticky top-0 px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    タスク分類No
                                </th>
                                <th className="sticky top-0 px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    タスク分類名
                                </th>
                            </tr>
                        </thead>
                            {initialTaskClasses.map((taskClass) => {
                                const isCurrentEditing =
                                    editingTaskClassNo === taskClass.task_class_no;
                                return (
                                <tr key={taskClass.task_class_no}>
                                    <td className="px-2 py-3 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex items-center gap-2">
                                            {isCurrentEditing ? (
                                                <>
                                                    <button
                                                        onClick={() => handleSaveClick(taskClass.task_class_no)}
                                                        disabled={isSubmitting}
                                                        className="text-green-600 hover:text-green-800 disabled:opacity-50"
                                                    >
                                                        <Save size={20} />
                                                    </button>
                                                    <button
                                                        onClick={handleCancelClick}
                                                        className="text-gray-600 hover:text-gray-800"
                                                    >
                                                        <X size={20} />
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => handleEditClick(taskClass)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    <Pencil size={20} />
                                                </button>
                                            )}
                                        </div>
                                    </td>

                                    {/* タスク分類NO */}
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {taskClass.task_class_no}
                                        </p>
                                    </td>

                                    {/* タスク分類名 */}
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {isCurrentEditing ? (
                                            <input
                                                type="text"
                                                value={editingTaskClassName}
                                                onChange={(e) => setEditingTaskClassName(e.target.value)}
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md"
                                                autoFocus
                                            />
                                        ) : (
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {taskClass.task_class_name || "-"}
                                            </p>
                                        )}
                                    </td>
                                </tr>
                            )})}
                    </table>
                </div>
            )}
        </>
    );
}
