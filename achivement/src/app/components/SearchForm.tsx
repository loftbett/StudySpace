"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface SearchFormProps {
    initialTaskClassNo: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ initialTaskClassNo }) => {
    const [taskClassNo, setTaskClassNo] = useState(initialTaskClassNo);
    const router = useRouter();
    const searchParams = useSearchParams();

    // URLのtaskClassNoパラメータが変更された場合に、入力フィールドを更新
    useEffect(() => {
        const currentTaskClassNo = searchParams.get("task_class_no") || "";
        setTaskClassNo(currentTaskClassNo);
    }, [searchParams]); // searchParamが変更されたときに実行

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const current = new URLSearchParams(Array.from(searchParams.entries())); // 現在のパラメータをコピー

        if (taskClassNo) {
            current.set("task_class_no", taskClassNo);
        } else {
            current.delete("task_class_no");
        }

        // URLを更新し、Next.jsにページ全体のリフレッシュを指示
        router.push(`?${current.toString()}`);
    };

    const handleClear = () => {
        setTaskClassNo("");
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.delete("task_class_no");
        router.push(`${current.toString()}`);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-end gap-4"
        >
            <div className="flex-grow w-full sm:w-auto">
                <label
                    htmlFor="taskClassNo"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    タスククラスNoで検索:
                </label>
                <input
                    type="text"
                    id="taskClassNo"
                    value={taskClassNo}
                    onChange={(e) => setTaskClassNo(e.target.value)}
                    placeholder="例: 123（空のまま検索で全件表示）"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
                <button
                    type="submit"
                    className="flex-shrink-0 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    検索
                </button>
                <button
                    type="button"
                    onClick={handleClear}
                    className="flex-shrink-0 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    クリア
                </button>
            </div>
        </form>
    );
};

export default SearchForm;
