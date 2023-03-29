<script>import { onMount } from "svelte";
import { loadPrism } from "./CodeEditor.helper";
import { textAreaScrollState } from "./CodeEditor.store";
export let value;
export let language;
let renderElement;
let prism;
const whitespace = (code) => `${code.charAt(0) === "\n" ? " " : ""}${code}${code.charAt(code.length - 1) === "\n" ? " " : ""}`;
onMount(async () => {
    if (!prism) {
        prism = await loadPrism({ language });
    }
});
$: {
    if (renderElement) {
        renderElement.scrollTop = $textAreaScrollState.top;
        renderElement.scrollLeft = $textAreaScrollState.left;
    }
}
</script>

{#if prism}
  <pre
    bind:this={renderElement}
    class={`font-codeEditor text-codeEditor whitespace-pre border-0 overflow-auto w-full h-full`}
    aria-hidden="true"><code class="font-codeEditor text-codeEditor whitespace-pre"
      >{@html prism.highlight(whitespace(value), prism.languages[language], language)}</code
    ></pre>
{/if}
