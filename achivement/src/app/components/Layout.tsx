import { ReactNode, useState } from "react";
import ToggleButton from "./ToggleButton";
import Sidebar from "./Sidebar";
import clsx from "clsx";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="flex min-h-screen">
            {/*トグルボタン */}
            <ToggleButton isOpen={isSidebarOpen} onToggle={toggleSidebar} />
            {/*サイドバー */}
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar}></Sidebar>
            {/*メインコンテンツ*/}
            <main
                className={clsx(
                    "flex-grow p-8 transition-all duration-300 ease-in-out",
                    // large screenでサイドバーを開いている場合
                    "lg:ml-64",
                    //サイドバーが開いているときにコンテンツに重ならないように調整
                    isSidebarOpen && "lg:ml-64" // lg以上でサイドバーが開いていればマージン
                )}
            >
                <div className="pt-16 lg:pt-0">{children}</div>
            </main>
        </div>
    );
};

export default Layout;
