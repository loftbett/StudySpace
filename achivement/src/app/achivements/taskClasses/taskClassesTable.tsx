"use client";

import type { TaskClass, TaskClassesTableProps } from "@/types";
import { useState, useEffect } from "react";
interface Props {
    task_class_no: string | null;
    taskClasses: TaskClass[];
}

export default function TaskClassesTable({
    task_class_no,
    taskClasses: initialTaskClasses,
}: Props) {
    let taskClasses: TaskClass[] = initialTaskClasses;
    let error: string | null = null;

    const [editingTaskClassNo, setEditingTaskClassNo] = useState<number | null>(null);

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
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    タスク分類No
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    タスク分類名
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {taskClasses.map((taskClass) => (
                                <tr key={taskClass.task_class_no}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {taskClass.task_class_no}
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {taskClass.task_class_name || "-"}
                                        </p>
                                    </td>
                                    <td  className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}
