"use client";

import React, { ReactNode, useState } from "react";
import clsx from "clsx";
import Sidebar from "./Sidebar";
import ToggleButton from "./ToggleButton";

/**
 *  サイドバーとメインコンテンツで状態管理を行う接続用コンポーネント
 */

interface ProviderProps {
    children: ReactNode;
}

const Providers: React.FC<ProviderProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="flex min-h-screen">
            {/* トグルボタン*/}
            <ToggleButton isOpen={isSidebarOpen} onToggle={toggleSidebar} />
            {/* サイドバー */}
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
            {/* メインコンテンツ */}
            <main
                className={clsx(
                    "flex-grow p-8 transition-all duration-300 ease-in-out",
                    // large screenでサイドバーを開いている場合
                    "lg:ml-64",
                    //サイドバーが開いているときにコンテンツに重ならないように調整
                    isSidebarOpen && "lg:ml-64"
                )}
            >
                <div className="pt-16 lg:pt-0">{children}</div>
            </main>
        </div>
    );
};

export default Providers;
