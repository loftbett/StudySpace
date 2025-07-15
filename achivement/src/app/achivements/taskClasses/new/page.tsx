import CreateTaskClassForm from "./CreateTaskClassForm";

export default function NewTaskClassPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">タスク分類 新規登録</h1>
            <CreateTaskClassForm />
        </div>
    )
}