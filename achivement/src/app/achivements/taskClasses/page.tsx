interface TaskClass {
    task_class_no: number;
    task_class_name: string | null;
}

async function getAllTaskClass(): Promise<TaskClass[]> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/taskClasses`, {
        cache: "no-store", // 開発中はキャッシュを無効化
    });

    if (!res.ok) {
        // エラーハンドリング
        console.error("Failed to fetch task_class:", res.statusText);
        throw new Error("Failed to fetch task_class");
    }
    return res.json();
}

export default async function TaskClassPage() {
    let taskClasses: TaskClass[] = [];
    let error: string | null = null;

    try {
        taskClasses = await getAllTaskClass();
    } catch (err) {
        error = err instanceof Error ? err.message : "Unknown error occurred.";
        console.error("Error fetching task_class");
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">タスククラス</h1>
            {error && (
                <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                    role="alert"
                >
                    <strong className="font-bold">エラー:</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            )}
            {taskClasses.length === 0 && !error ? (
                <p className="text-gray-600">実績データがありません。</p>
            ) : (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    タスク分類No
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    タスク分類名
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
