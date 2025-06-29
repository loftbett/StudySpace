import { NextResponse } from "next/server";
import postgres from "postgres";

// 環境変数からデータベースURLを取得
const sql = postgres(process.env.DATABASE_URL_LOCAL!, { ssl: "require" });

// 全件取得(テスト用)
export async function fetchTaskClassALL() {
    try {
        // テーブルからデータを全件取得
        const data_all =
            await sql`SELECT task_class_no,task_class_name FROM task_class`;

        return NextResponse.json(data_all);
    } catch (error) {
        console.error("Failed to fetch task_class:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
