<script lang="ts">
  import { auth, store } from "$lib/config/firebase/firebase.config";
  import { collection, addDoc } from "firebase/firestore";
  import { onAuthStateChanged } from "firebase/auth";
  import type { User } from "firebase/auth";
  import RichEditor from "$lib/components/RichEditor.svelte";
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
    </label>
    <RichEditor />
    <button type="submit">Save</button>
  </form>
{/if}

<style>
  @import "https://cdn.quilljs.com/1.3.6/quill.snow.css";
</style>
