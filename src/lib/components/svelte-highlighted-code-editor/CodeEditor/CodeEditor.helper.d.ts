import type { CodeEditorState, PrismConfig } from "./CodeEditor.models";
export declare const setCursorPosition: (textArea: HTMLTextAreaElement, cursorPosition: number) => void;
export declare const addTab: (textArea: HTMLTextAreaElement) => CodeEditorState;
export declare const removeTab: (textArea: HTMLTextAreaElement) => CodeEditorState;
export declare const addCurrentTabDepthAfterNewLine: (textArea: HTMLTextAreaElement) => CodeEditorState;
export declare const loadPrism: (config: PrismConfig) => Promise<any>;
export declare const handleScrollEvent: (event: Event) => void;
export declare const bindCaretMovementEvent: (node: HTMLElement, callback: (event: Event) => void) => {
    destroy(): void;
};
