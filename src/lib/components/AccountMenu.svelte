<script>
  import { auth } from "$lib/config/firebase/firebase.config";
  import {
    signOut,
  } from "firebase/auth";
  const logout = () => {
    signOut(auth)
  }
</script>
<div class="absolute top-20 z-10 bg-gray-600 rounded-xl p-4">
  <button on:click={logout} class="bg-gray-800 rounded-xl p-4">
    LogOut
  </button>
</div>
