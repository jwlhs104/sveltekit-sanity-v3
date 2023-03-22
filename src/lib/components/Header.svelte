<script>
  import { auth } from "$lib/config/firebase/firebase.config";
  import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
  } from "firebase/auth";
  const provider = new GoogleAuthProvider();
  let signIn = false;

  const login = () => {
    if (signIn) {
      signOut(auth);
      return;
    }
    signInWithPopup(auth, provider)
  }
  onAuthStateChanged(auth, (user) => {
    if (user) {
      signIn = true;
      user.getIdTokenResult()
        .then(idTokenResult => {
          if (!!idTokenResult.claims.admin) console.log('admin')
          else console.log('regular')
        })
    } else {
      signIn = false;
    }
  });
</script>

<div
  class="relative bg-black px-4 py-4 sm:px-6 lg:px-8 border-b border-gray-800"
>
  <div class="relative mx-auto max-w-7xl">
    <div class="flex items-center justify-between">
      <div class="shrink-0">
        <a href="/" title="" class="flex gap-5">
          <img class="w-auto h-8" src="/logo.png" alt="" />
          <h1 class="text-lg leading-loose tracking-wide font-extrabold">
            Johnny Hsieh
          </h1>
        </a>
      </div>

      <div class="flex sm:items-center sm:justify-end sm:space-x-4">
        <button
          on:click={login}
          class="text-lg leading-loose tracking-wide font-extrabold"
        >
          {#if signIn}
            LogOut
          {:else}
            LogIn
          {/if}
        </button>
      </div>
    </div>
  </div>
</div>
