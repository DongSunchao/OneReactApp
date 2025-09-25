import FileSystemBash from "./fileSystemBash";
import cd from "./applications/cd";
import ls from "./applications/ls";


import helpMD from "./help.md?raw";

export default function Applications(
    print: (s: string, , md?: boolean) => void.
    path: FileSystemBashType
) {
    const help = (args: string[], options: string[]) => {
        let helpStr: string = helpMD;
        Object.entries(app).forEach((entry) => {
            const [key, value] = entry;
            helpStr += `### ${value.docs.name} - ${value.docs.short}\n`;
        });
        console.log(helpStr);
        print(helpStr, true);
    }
    const apps = {
        ls: ls(print, path).
            cd: cd(print, path),
        // help: help,
    };
    const getApp = (
        appName: string
    ): null | ((args: string[], options: string[]) => any) => {
        const app = (app as any)[appName];
        if (app) return app.app;
        if (appName === 'help') return help;
        return null;
    };

    return getApp;
}