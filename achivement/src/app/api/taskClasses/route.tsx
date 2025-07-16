import { NextResponse, NextRequest } from "next/server";
import postgres from "postgres";

// 環境変数からデータベースURLを取得
//const sql = postgres(process.env.DATABASE_URL_LOCAL!, { ssl: "require" });
const sql = postgres(process.env.DATABASE_URL_LOCAL!);

// 取得
export async function GET(request: NextRequest) {
    try {
        // パラメータ取得
        const searchParams = request.nextUrl.searchParams;

        const task_class_no = searchParams.get("task_class_no");
        const task_class_name = searchParams.get("task_class_name");

        let data;
        if (task_class_no) {
            // クラスNo指定の場合は、該当のデータを取得
            data =
                await sql`SELECT task_class_no,task_class_name FROM task_class
            WHERE task_class_no = ${task_class_no}
            ORDER BY task_class_no`;
        } else if (task_class_name) {
            // クラス名指定の場合は、LIKE検索
            data =
                await sql`SELECT task_class_no,task_class_name FROM task_class
            WHERE task_class_name LIKE ${"%" + task_class_name + "%"} 
            ORDER BY task_class_no`;
        } else {
            // テーブルからデータを全件取得
            data =
                await sql`SELECT task_class_no,task_class_name FROM task_class ORDER BY task_class_no`;
        }

        console.log(data);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Failed to fetch task_class:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// 新規登録
export async function POST(request: NextRequest) {
    try {
        // パラメータ取得
        const data = await request.json();

        const task_class_no = data.task_class_no;
        const task_class_name = data.task_class_name;

        if (!task_class_no || !task_class_name) {
            // 入力情報不正エラー
            console.error("パラメータエラー");
            return NextResponse.json(
                { message: "タスク分類Noかタスク分類名が指定されていません。" },
                { status: 400 }
            );
        }

        // DB登録
        const resData =
            await sql`INSERT INTO task_class (task_class_no,task_class_name)
        VALUES (${task_class_no},${task_class_name})
        RETURNING *`;

        return NextResponse.json(resData);
    } catch (error) {
        console.error("Failed to fetch taskClass:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
