"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTaskClassForm() {
    const [taskClassNo, setTaskClassNo] = useState("");
    const [taskClassName, setTaskClassName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        // 入力チェック
        if (!taskClassNo.trim()) {
            setError("タスク分類Noは必須です。");
            setIsSubmitting(false);
            return;
        }
        if (!taskClassName.trim()) {
            setError("タスク分類名は必須です。");
            setIsSubmitting(false);
            return;
        }

        // DB登録API呼び出し
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
            const res = await fetch(`${baseUrl}/api/taskClasses`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    task_class_no: taskClassNo,
                    task_class_name: taskClassName,
                }),
            });

            // エラー処理
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(
                    errorData.message || "新規登録に失敗しました。"
                );
            }

            // 成功処理
            router.push("/achivements/taskClasses");
            router.refresh(); // サーバーコンポネントを再フェッチ
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "予期せぬエラーが発生しました。"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto"
        >
            {error && (
                <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                    role="alert"
                >
                    <strong className="font-bold">エラー：</strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            <div className="mb-4">
                <label
                    htmlFor="taskClassNo"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    タスク分類No:
                </label>
                <input
                    type="text"
                    id="taskClassNo"
                    value={taskClassNo}
                    onChange={(e) => setTaskClassNo(e.target.value)}
                    placeholder="例) 0-99:社内作業、100-899:PJ関連、900:勉強・研修など"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="taskClassName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    タスク分類名:
                </label>
                <input
                    type="text"
                    id="taskClassName"
                    value={taskClassName}
                    onChange={(e) => setTaskClassName(e.target.value)}
                    placeholder="例) G内間接、研修など"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>
            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
                >
                    キャンセル
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                    {isSubmitting ? "登録中..." : "登録"}
                </button>
            </div>
        </form>
    );
}
