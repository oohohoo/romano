export const select = (e) => document.querySelector(e);
export const selectAll = (e) => document.querySelectorAll(e);

export const getTextHeight = (textCopy) => {
    return textCopy.clientHeight;
}

export function updateBodyColor(color) {
    document.documentElement.style.setProperty('--bcg-fill-color', color);
}
