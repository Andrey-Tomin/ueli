import { executeCommandWithOutput } from "./command-executor";
import { normalize } from "path";

export interface FileSearchOption {
    folderPath: string;
    blacklist: string[];
    recursive: boolean;
}

export function windowsFileSearcher(option: FileSearchOption): Promise<string[]> {
    return new Promise((resolve, reject) => {
        const excludes = option.blacklist.length > 0
            ? option.blacklist
                .map((blackListItem) => {
                    return `$_.FullName -notlike "*\\${blackListItem}\\*"`;
                })
                .join(" -and ")
            : `$_.FullName.Length -gt 0`;
        const recursive = option.recursive ? "-Recurse" : "";
        const powershellScript = `'${option.folderPath}' | % { Get-ChildItem -Path $_ ${recursive} | Where { ${excludes} } | % { $_.FullName } }`;

        executeCommandWithOutput(`powershell -Command "& { ${powershellScript} }"`)
            .then((data) => {
                const result = data
                    .split("\n")
                    .map((l) => normalize(l).trim())
                    .filter((l) => l.length > 1);

                resolve(result);
            })
            .catch((err) => reject(err));
    });
}

export function macosFileSearcher(option: FileSearchOption): Promise<string[]> {
    return new Promise((resolve, reject) => {
        const recurse = option.recursive ? "" : "-maxdepth 1 ";
        executeCommandWithOutput(`find "${option.folderPath}" ${recurse}-not -path '*/\.*' | grep -v "^${option.folderPath}$" | head -n 1000`)
            .then((data) => {
                const result = data
                    .split("\n")
                    .map((l) => normalize(l).trim())
                    .filter((l) => l.length > 2);

                resolve(result);
            })
            .catch((err) => reject(err));
    });
}
