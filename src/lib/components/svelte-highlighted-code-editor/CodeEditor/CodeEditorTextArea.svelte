<script>import { addCurrentTabDepthAfterNewLine, addTab, bindCaretMovementEvent, handleScrollEvent, removeTab, setCursorPosition, } from "./CodeEditor.helper";
import { latestCaretMovement } from "./CodeEditor.store";
export let value;
const fireCaretMovementEventTime = 50;
let caretMovementEventTimeout;
const updateTextAreaAndState = (textAreaElement, code) => {
    textAreaElement.value = code;
    value = code;
};
const handleTabKeyEvent = (event) => {
    event.preventDefault();
    const textAreaElement = event.target;
    const { editedCode, cursorPosition } = event.shiftKey ? removeTab(textAreaElement) : addTab(textAreaElement);
    updateTextAreaAndState(textAreaElement, editedCode);
    setCursorPosition(textAreaElement, cursorPosition);
};
const handleEnterKeyEvent = (event) => {
    event.preventDefault();
    const textAreaElement = event.target;
    const { editedCode, cursorPosition } = addCurrentTabDepthAfterNewLine(textAreaElement);
    updateTextAreaAndState(textAreaElement, editedCode);
    setCursorPosition(textAreaElement, cursorPosition);
};
const handleKeyDownEvent = (event) => {
    switch (event.key) {
        case "Tab":
            handleTabKeyEvent(event);
            break;
        case "Enter":
            handleEnterKeyEvent(event);
            break;
    }
};
const handleCaretMovementEvent = (event) => {
    clearTimeout(caretMovementEventTimeout);
    caretMovementEventTimeout = setTimeout(() => {
        const textAreaElement = event.target;
        const isTextAreaFocused = event.type !== "blur";
        const activeLineIndex = textAreaElement.value.slice(0, textAreaElement.selectionStart).split("\n").length - 1;
        latestCaretMovement.set({ isTextAreaFocused, activeLineIndex });
    }, fireCaretMovementEventTime);
};
</script>

<textarea
  class="font-codeEditor text-codeEditor whitespace-pre border-0 overflow-auto text-transparent bg-transparent resize-none outline-none absolute top-0 left-0 h-full w-full caret-gray-800"
  spellcheck="false"
  use:bindCaretMovementEvent={handleCaretMovementEvent}
  on:scroll={handleScrollEvent}
  on:keydown={handleKeyDownEvent}
  bind:value
/>
