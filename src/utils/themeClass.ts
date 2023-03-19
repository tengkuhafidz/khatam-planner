export enum Themes {
    Slate = 'slate',
    Sky = 'sky',
    Teal = 'teal',
    Pink = 'pink',
}

export enum ThemeItems {
    Bg = 'bg',
    Text = 'text'
}

export const getThemeClass = (type: ThemeItems, theme: Themes, shade: number, log?: string) => {
    console.log("TESTTING", `${type}-${theme}-${shade}`, log)
    return `${type}-${theme}-${shade}`
}


export const themes = {
    [Themes.Slate]: {
        text: {
            base: "text-slate-600",
            dark: "text-slate-900"
        },
        bg: {
            light: "bg-slate-100",
            dark: "bg-slate-900"
        }
    }
}