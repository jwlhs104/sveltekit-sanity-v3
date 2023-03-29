import { getPrismConfig, tab, tabSize } from "./CodeEditor.config";
import { textAreaScrollState } from "./CodeEditor.store";
export const setCursorPosition = (textArea, cursorPosition) => {
    textArea.selectionStart = cursorPosition;
    textArea.selectionEnd = cursorPosition;
};
const splitCodeAtCaret = (textArea) => {
    const code = textArea.value;
    const codeBeforeTab = code.slice(0, textArea.selectionStart);
    const codeAfterTab = code.slice(textArea.selectionEnd, code.length);
    const cursorPosition = textArea.selectionStart;
    return { codeBeforeTab, codeAfterTab, cursorPosition };
};
export const addTab = (textArea) => {
    const { codeBeforeTab, codeAfterTab, cursorPosition } = splitCodeAtCaret(textArea);
    const modifiedCursorPosition = cursorPosition + tab.length;
    return {
        editedCode: `${codeBeforeTab}${tab}${codeAfterTab}`,
        cursorPosition: modifiedCursorPosition,
    };
};
const countSpacesAfterCursorPosition = (codeBeforeTab) => {
    const startIndex = codeBeforeTab.length - 1;
    const maxSpacesToCount = tabSize;
    let countedSpaces = 0;
    for (let i = startIndex; i >= 0; i--) {
        if (codeBeforeTab.charAt(i) !== " ") {
            break;
        }
        countedSpaces++;
        if (countedSpaces === maxSpacesToCount) {
            break;
        }
    }
    return countedSpaces;
};
export const removeTab = (textArea) => {
    const { codeBeforeTab, codeAfterTab, cursorPosition } = splitCodeAtCaret(textArea);
    const spacesAfterCursorPosition = countSpacesAfterCursorPosition(codeBeforeTab);
    const modifiedCursorPosition = cursorPosition - spacesAfterCursorPosition;
    const editedCode = `${codeBeforeTab.substring(0, codeBeforeTab.length - spacesAfterCursorPosition)}${codeAfterTab}`;
    return {
        editedCode,
        cursorPosition: modifiedCursorPosition,
    };
};
const countLeadingSpaces = (str) => {
    let spaces = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) !== " ") {
            break;
        }
        spaces++;
    }
    return spaces;
};
export const addCurrentTabDepthAfterNewLine = (textArea) => {
    const { codeBeforeTab, codeAfterTab, cursorPosition } = splitCodeAtCaret(textArea);
    const codeLinesBeforeCaret = codeBeforeTab.split(/\n/);
    const lastLineBeforeCaret = codeLinesBeforeCaret[codeLinesBeforeCaret.length - 1];
    const leadingSpaces = countLeadingSpaces(lastLineBeforeCaret);
    const modifiedCursorPosition = cursorPosition + leadingSpaces + 1;
    const editedCode = `${codeBeforeTab}\n${" ".repeat(leadingSpaces)}${codeAfterTab}`;
    return {
        editedCode,
        cursorPosition: modifiedCursorPosition,
    };
};
const loadElement = (element) => new Promise((resolve) => {
    document.body.appendChild(element);
    element.onload = () => resolve();
});
const createAndLoadScript = async (src) => {
    const script = document.createElement("script");
    script.src = src;
    await loadElement(script);
};
const createAndLoadStyle = async (href) => {
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = href;
    await loadElement(style);
};
export const loadPrism = async (config) => {
    const { prismScriptUrl, prismThemeScriptUrl, prismLanguageScriptUrl } = getPrismConfig(config);
    await createAndLoadScript(prismScriptUrl);
    await createAndLoadStyle(prismThemeScriptUrl);
    if (prismLanguageScriptUrl) {
        await createAndLoadScript(prismLanguageScriptUrl);
    }
    return window.Prism;
};
export const handleScrollEvent = (event) => {
    const textAreaElement = event.target;
    textAreaScrollState.set({ top: textAreaElement.scrollTop, left: textAreaElement.scrollLeft });
};
export const bindCaretMovementEvent = (node, callback) => {
    const events = [
        "keydown",
        "mousedown",
        "touchstart",
        "input",
        "paste",
        "cut",
        "select",
        "selectstart",
        "focus",
        "blur",
    ];
    events.forEach((event) => node.addEventListener(event, callback));
    return {
        destroy() {
            events.forEach((event) => node.removeEventListener(event, callback));
        },
    };
};
