import { writable } from "svelte/store";
export const textAreaScrollState = writable({ top: 0, left: 0 });
export const latestCaretMovement = writable({
    isTextAreaFocused: false,
    activeLineIndex: 0,
});
