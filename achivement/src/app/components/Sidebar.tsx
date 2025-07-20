"use client"; // Client Component であることを宣言

import React from "react";
import clsx from "clsx";
import StyledLink from "./StyledLink";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    return (
        <>
            {/* サイドバー本体 */}
            <aside
                className={clsx(
                    "fixed top-0 left-0 h-screen w-full sm:w-64 bg-sidebar-bg text-white transition-transform duration-300 ease-in-out z-40",
                    isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
                )}
            >
                <div className="p-5 pt-16">
                    <h2 className="text-2xl font-bold mb-6 text-white sm:text-black">
                        メニュー
                    </h2>
                    <nav>
                        <ul className="list-none p-0">
                            <li className="mb-4">
                                <StyledLink
                                    href="/"
                                    className="block text-lg hover:text-blue-400"
                                    onClick={onClose}
                                >
                                    ホーム
                                </StyledLink>
                            </li>
                            <li className="mb-4">
                                <StyledLink
                                    href="/achivements"
                                    className="block text-lg hover:text-blue-400"
                                    onClick={onClose}
                                >
                                    実績管理
                                </StyledLink>
                            </li>
                            <li className="mb-4">
                                <StyledLink
                                    href="/achivements/taskClasses"
                                    className="block text-lg hover:text-blue-400"
                                    onClick={onClose}
                                >
                                    実績管理-タスククラス
                                </StyledLink>
                            </li>
                            <li className="mb-4">
                                <StyledLink
                                    href="/settings"
                                    className="block text-lg hover:text-blue-400"
                                    onClick={onClose}
                                >
                                    設定
                                </StyledLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
            {/* オーバーレイ (モバイルなどでサイドバーを開いているときに背景を黒く) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-gray-700 bg-opacity-50 z-30 sm:hidden"
                    onClick={onClose}
                ></div>
            )}
        </>
    );
};

export default Sidebar;
