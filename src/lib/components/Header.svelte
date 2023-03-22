<script>
  import { auth } from "$lib/config/firebase/firebase.config";
  import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
  } from "firebase/auth";
  const provider = new GoogleAuthProvider();

  // states
  let userInfo;
  let admin = false

  const login = () => {
    if (userInfo) {
      signOut(auth);
      return;
    }
    signInWithPopup(auth, provider)
  }
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userInfo = user;
      user.getIdTokenResult()
        .then(idTokenResult => {
          if (!!idTokenResult.claims.admin) admin=idTokenResult.claims.admin
          else admin=false
        })
    } else {
      userInfo = null;
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
          class="text-lg leading-loose tracking-wide font-extrabold relative"
        >
          {#if userInfo}
            <img class="max-w-12 rounded-full mb-4px" src={userInfo.photoURL} alt="avatar"/>
            <span class="absolute bottom-0 left-1/2 text-xs transform -translate-x-1/2">{#if admin} admin {:else} basic {/if}</span>
          {:else}
            LogIn
          {/if}
        </button>
      </div>
    </div>
  </div>
</div>
