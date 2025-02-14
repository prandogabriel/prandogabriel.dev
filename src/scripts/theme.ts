const themes = ["dark", "light"];
const [dark] = themes;

const getCurrentTheme = () => document.documentElement.dataset.theme;

const IFRAME_SELECTOR = "iframe.giscus-frame";
const SOURCE_GISCUS_DOMAIN = "https://giscus.app";

window.addEventListener("load", function () {
  const themeSaved = localStorage.getItem("theme");

  sendThemeMessage(themeSaved);
});

const sendThemeMessage = (newTheme: string) => {
  const iframe = document.querySelector(IFRAME_SELECTOR) as HTMLIFrameElement;

  if (!iframe || !iframe.contentWindow) return;

  iframe.contentWindow.postMessage(
    { giscus: { setConfig: { theme: newTheme } } },
    SOURCE_GISCUS_DOMAIN
  );
};

export const getNextTheme = () => {
  const currentTheme = getCurrentTheme();
  const indexThemeCurrent = themes.indexOf(currentTheme || dark);

  return themes[(indexThemeCurrent + 1) % themes.length];
};

export const updateToggleThemeIcon = () => {
  const currentTheme = getCurrentTheme();
  document
    .querySelector(`#icon-theme-${currentTheme}`)
    ?.classList.add("hidden");

  const themeNext = getNextTheme();
  document
    .querySelector(`#icon-theme-${themeNext}`)
    ?.classList.remove("hidden");
};

export const toggleMarkdownTheme = (newTheme: string) => {
  const contentElement = document.getElementById("markdown");

  if (!contentElement) {
    return;
  }

  sendThemeMessage(newTheme);

  if (newTheme === dark) {
    contentElement.classList.add("prose-invert");
  } else {
    contentElement.classList.remove("prose-invert");
  }
};
