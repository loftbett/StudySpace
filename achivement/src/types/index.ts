/**
 *  DBテーブル用定義
 */
// タスク分類テーブルの項目定義
export interface TaskClass {
    task_class_no: number;
    task_class_name: string;
}

/**
 *  各ページ用Props
 */
// タスク分類表の検索用props
export interface TaskClassesTableProps {
    task_class_no: string | null;
}

// タスク分類ページの検索パラメータ
export interface TaskClassPagesProps {
    searchParams?: Promise<{
        task_class_no?: string;
    }>;
}

// タスク分類編集用Props
export interface EditTaskClassProps {
    taskClass: TaskClass;
}