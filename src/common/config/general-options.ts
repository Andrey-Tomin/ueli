import { Language } from "../translation/language";
import { GlobalHotKey } from "../global-hot-key/global-hot-key";
import { GlobalHotKeyKey } from "../global-hot-key/global-hot-key-key";
import { GlobalHotKeyModifier } from "../global-hot-key/global-hot-key-modifier";

export interface GeneralOptions {
    autostart: boolean;
    clearCachesOnExit: boolean;
    hideMainWindowOnBlur: boolean;
    hotKey: GlobalHotKey;
    language: Language;
    logExecution: boolean;
    persistentUserInput: boolean;
    rememberWindowPosition: boolean;
    rescanEnabled: boolean;
    rescanIntervalInSeconds: number;
    showAlwaysOnPrimaryDisplay: boolean;
    showTrayIcon: boolean;
}

export const defaultGeneralOptions: GeneralOptions = {
    autostart: true,
    clearCachesOnExit: false,
    hideMainWindowOnBlur: true,
    hotKey: {
        key: GlobalHotKeyKey.Space,
        modifier: GlobalHotKeyModifier.Alt,
    },
    language: Language.English,
    logExecution: true,
    persistentUserInput: false,
    rememberWindowPosition: false,
    rescanEnabled: true,
    rescanIntervalInSeconds: 300,
    showAlwaysOnPrimaryDisplay: false,
    showTrayIcon: true,
};
