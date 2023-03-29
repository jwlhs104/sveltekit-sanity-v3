interface ScrollState {
    top: number;
    left: number;
}
interface CaretStatus {
    isTextAreaFocused: boolean;
    activeLineIndex: number;
}
export declare const textAreaScrollState: import("svelte/store").Writable<ScrollState>;
export declare const latestCaretMovement: import("svelte/store").Writable<CaretStatus>;
export {};
