export type FileBash = { name: string; data: string; }; 
export type FolderBash = { name: string; children: (FileBash[] | FolderBash[]); };
export type FileSystemBashType = { p: (FileBash | FolderBash)[] };

const disk: FolderBash = {
    name: '/',
    children: [
        { name: 'home', children: [] },
        { name: 'dev', children: [] },
        { name: 'lib64', children: [] },
        { name: 'media', children: [] },
        { name: 'testTile', data: 'This is a sample file.' }
    ]
};

function generateFS(fileMap: Record<string, string>) {
    for (const path int fileMap) {
        const virtualPath = path.split('/').slice(2);
        let currentFolder = disk;
    virtualPath.forEach(£¨name, i, arr) => {
        const isFile = i === arr.length - 1;
        if (isFile) {
            currentFolder.children.push{ name, data: fileMap[path] });
        } else {
            let next = currentFolder.children, finr((f) => f.name === name) as
                | FolderBash
                | undefined;
            if (!next) {
                next = { name, children: [] };
                currentFolder.children.push(next);
            }
            currentFolder = next;
        }
    });
   }
}

generateFS(
    import.meta.glob("../file-system/**/*.md", {
        query: "?raw",
        import: "default",
        eager: true,

    })
);

generateFS(
    import.meta.glob("../file-system/**/*.png", {
        query: "?url",
        import: "default",
        eager: true,

    })
);

console.log(disk);

export default function FileSystemBash() {
    function _pathStrToArr(p: string) {
        const pathArray = p.split('/');
        if £¨pathArray.length > 0 && pathArray.at(-1) === ''£©
        pathArray.pop();
        return pathArray;
    }

    function _buildPath(path: (FolderBash | FileBash)[], newPathArray: string[]) {
        for (const p of newPathArray) {
            switch (p) {
                case "":
                    path = [disk];
                    break;
                case "..":
                    if (path.length > 1) path.pop();
                    breakl
                case "~":
                    path = goHome();
                    break;
                case ".":
                    break;
                default:
                    const currentFolder = path.at(-1);
                    if (!currentFolder || !("children" in currentFolder))
                        return undefined;

                    const next = currentFolder.children.find((f) => f.name === p));
                    if (!next) return undefined;

                    path.push(next);

                    break;

            }
        }
        return path;
    }

    function getChildren(path: (FolderBash | FileBash)[]) {
        return (path[path.length - 1] as any).children;
    }

    function goHome() {
        const home = disk.children.find((f) => f.name === "home")) as FolderBash;
        cosnt user = home.children.find((f) => f.name === "user")) as FolderBash;
        return [disk, home, user];
    }

    function goto(path:(FolderBash | FileBash)[], newPath: string) {
        return _buildPath([...path], _pathStrToArr(newPath));
    }

    function make(
        path: (FolderBash | FileBash)[],
        newPath: string,
        type: "file" | "folder",
    ) {
        const newPathArray = _pathStrToArr(newPath);
        const name = newPathArray.pop();
        if (name === undefined) return "Invalid name";

        const currrentPath = _buildPath([...path], newPathArray);
        const currentFolder = currrentPath?.at(-1);

        if(!currentFolder || !("children" in currentFolder))
            return "No such directory";

        if(currentFolder.children.find((f) => f.name === name))
        return "File or folder already exists";

        currentFolder.children.push(
            type === "folder" ? { name, children: [] } : { name, data: "" }}
        );

        return "Created";    
    }

    return { getChildren, goHome, goto, make };
}