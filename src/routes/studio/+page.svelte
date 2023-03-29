<script lang="ts">
  import { auth, store } from "$lib/config/firebase/firebase.config";
  import { collection, addDoc } from "firebase/firestore";
  import { onAuthStateChanged } from "firebase/auth";
  import type { User } from "firebase/auth";
  import Markdown from "$lib/components/Markdown.svelte";
  import Editor from "$lib/components/svelte-highlighted-code-editor";

  let isAdmin: Boolean = false;

  const checkToken = (user: User) => {
    user.getIdTokenResult().then((idTokenResult) => {
      if (!!idTokenResult.claims.admin) isAdmin = true;
      else isAdmin = false;
    });
  };
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      checkToken(user);
    }
  });

  let title = "";
  let content = "";
  $: console.log(content)

  async function savePost() {
    await addDoc(collection(store, "posts"), {
      title,
      content,
      createdAt: new Date(),
    });
  }
</script>

{#if isAdmin}
  <form on:submit|preventDefault={savePost}>
    <label>
      Title:
      <input type="text" bind:value={title} />
    </label><br>
    <div class="flex">
      <div class="text-black flex-1">
        <Editor bind:value={content} />
      </div>
      <div class="flex-1 p-3">
        <Markdown source={content} />
      </div>
    </div>

    <button type="submit">Save</button>
  </form>
{/if}


