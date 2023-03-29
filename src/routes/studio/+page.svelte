<script lang="ts">
  import { auth, store, storage } from "$lib/config/firebase/firebase.config";
  import { collection, addDoc } from "firebase/firestore";
  import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
  let file = null;
  $: console.log(content)

  async function savePost() {

    let fileUrl = "";
    if (file) {
      const storageRef = ref(storage, file.name);
      await uploadBytes(storageRef, file)
      fileUrl = await getDownloadURL(storageRef)
    }
    await addDoc(collection(store, "posts"), {
      title,
      content,
      coverImage: fileUrl
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
    <label>
      Image:
      <input type="file" accept="image/*" on:change={(event) => file = event.target.files[0]} />
    </label><br>

    <button type="submit">Save</button>
  </form>
{/if}


