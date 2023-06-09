export enum Themes {
    Slate = 'slate',
    Sky = 'sky',
    Emerald = 'emerald',
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
            dark: "text-slate-800"
        },
        bg: {
            light: "bg-slate-200",
            base: "bg-slate-400",
            dark: "bg-slate-800"
        },
        border: {
            dark: "border-slate-800"
        },
        button: "bg-slate-600  border-slate-800 hover:bg-slate-500 hover:border-slate-800"
    },
    [Themes.Pink]: {
        text: {
            base: "text-pink-400",
            dark: "text-pink-500"
        },
        bg: {
            light: "bg-pink-100",
            base: "bg-pink-200",
            dark: "bg-pink-500"
        },
        border: {
            dark: "border-pink-500"
        },
        button: "bg-pink-400  border-pink-600 hover:bg-pink-300 hover:border-pink-500"
    },
    [Themes.Sky]: {
        text: {
            base: "text-sky-600",
            dark: "text-sky-900"
        },
        bg: {
            light: "bg-sky-100",
            base: "bg-sky-200",
            dark: "bg-sky-900"
        },
        border: {
            dark: "border-sky-900"
        },
        button: "bg-sky-600  border-sky-800 hover:bg-sky-500 hover:border-sky-800"
    },
    [Themes.Emerald]: {
        text: {
            base: "text-emerald-600",
            dark: "text-emerald-800"
        },
        bg: {
            light: "bg-emerald-50",
            base: "bg-emerald-200",
            dark: "bg-emerald-800"
        },
        border: {
            dark: "border-emerald-800"
        },
        button: "bg-emerald-600  border-emerald-800 hover:bg-emerald-500 hover:border-emerald-800"
    }
}