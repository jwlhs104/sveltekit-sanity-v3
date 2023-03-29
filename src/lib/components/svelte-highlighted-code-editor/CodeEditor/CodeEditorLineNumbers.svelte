<script>import { latestCaretMovement, textAreaScrollState } from "./CodeEditor.store";
export let value;
let lineNumbersElement;
let lineCount = [];
let activeLineNumber = 0;
$: lineCount = value.split("\n");
$: {
    if (lineNumbersElement) {
        lineNumbersElement.scrollTop = $textAreaScrollState.top;
    }
}
</script>

<div class="overflow-hidden w-lineNumbers h-full" bind:this={lineNumbersElement}>
  <div class="font-codeEditor text-codeEditor flex flex-col text-right text-lineNumbers pr-6 min-h-full">
    {#each lineCount as _, index}
      <div
        class={$latestCaretMovement.isTextAreaFocused && index === $latestCaretMovement.activeLineIndex
          ? "text-lineNumbersActive"
          : ""}
      >
        {index + 1}
      </div>
    {/each}
  </div>
</div>
