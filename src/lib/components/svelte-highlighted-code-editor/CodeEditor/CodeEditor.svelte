<script>import { PrismLanguage } from "./CodeEditor.models";
import CodeEditorLineNumbers from "./CodeEditorLineNumbers.svelte";
import CodeEditorRenderer from "./CodeEditorRenderer.svelte";
import CodeEditorTextArea from "./CodeEditorTextArea.svelte";
export let value;
export let language = PrismLanguage.JS;
</script>

<div class={`bg-codeEditor h-full flex p-3`}>
  <CodeEditorLineNumbers bind:value />
  <div class="relative top-0 left-0 w-codeEditor">
    <CodeEditorTextArea bind:value />
    <CodeEditorRenderer bind:value {language} />
  </div>
</div>
