export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/** Inline FOUC script — keep in sync with ThemeProvider. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;
