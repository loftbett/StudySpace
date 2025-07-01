import { NextResponse } from "next/server";
import postgres from "postgres";

// 環境変数からデータベースURLを取得
//const sql = postgres(process.env.DATABASE_URL_LOCAL!, { ssl: "require" });
const sql = postgres(process.env.DATABASE_URL_LOCAL!);

// 全件取得(テスト用)
export async function GET(request: Request) {
    try {
        // パラメータ取得
        const { searchParams } = new URL(request.url);
        const task_class_no = searchParams.get("task_class_no");
        const task_class_name = searchParams.get("task_class_name");

        let data_all;
        if (task_class_no) {
            // クラスNo指定の場合は、該当のデータを取得
            data_all =
                (await sql`SELECT task_class_no,task_class_name FROM task_class
            WHERE task_class_no = `) +
                task_class_no +
                ";";
        } else if (task_class_name) {
            // クラス名指定の場合は、LIKE検索
            data_all =
                (await sql`SELECT task_class_no,task_class_name FROM task_class
            WHERE task_class_name = `) +
                task_class_name +
                ";";
        } else {
            // テーブルからデータを全件取得
            data_all =
                await sql`SELECT task_class_no,task_class_name FROM task_class`;
        }

        return NextResponse.json(data_all);
    } catch (error) {
        console.error("Failed to fetch task_class:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
