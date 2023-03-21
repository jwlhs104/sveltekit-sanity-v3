<script>
  import { auth } from "$lib/config/firebase/firebase.config";
  import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
  const provider = new GoogleAuthProvider();

  const login = () => {
    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log(credential);
    });
  };
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
        <button on:click={login}>Login</button>
      </div>
    </div>
  </div>
</div>
