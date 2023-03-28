<script lang="ts">
  import { onMount } from "svelte";
  let editor: HTMLElement;

  export let toolbarOptions = [
    [{ header: 1 }, { header: 2 }, "blockquote", "link", "image", "video"],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "ordered" }],
    [{ align: [] }],
    ["clean"],
  ];

  onMount(async () => {
    const { default: Quill } = await import("quill");

    let quill = new Quill(editor, {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: "snow",
      placeholder: "Write your story...",
    });

    quill.on("text-change", () => {
      console.log(quill.root.innerHTML);
    });
  });
</script>

<div class="editor-wrapper">
  <div bind:this={editor} />
</div>
