<script lang="ts">
  import axios from 'axios'
  import { tick } from 'svelte'
  import { store } from "$lib/config/firebase/firebase.config";
  import { collection, addDoc } from "firebase/firestore"; 
  import type { UserInfo } from "firebase/auth";

  export let user : UserInfo | null;
  let aes:string, sha: string;
  let form:HTMLFormElement
  const mid = "MS148427498"

  const handleSubmit = async () => {
    if (user === null) return
    const { data } = await axios.get('/api/encrypt')
    aes = data.aes
    sha = data.sha
    const docRef = await addDoc(collection(store, "userPayments"), {
      user: user.uid,
      orderNumber: data.orderNumber
    });

    await tick()
    form.submit()
  }

</script>
<div>
  <form bind:this={form} on:submit|preventDefault={handleSubmit} method=post action="https://ccore.newebpay.com/MPG/mpg_gateway" target="_blank">
    <input class="hidden" name="MerchantID" value={mid} readonly>
    <input class="hidden" name="Version" value="2.0" readonly>
    <input class="hidden" name="TradeInfo" value={aes} readonly>
    <input class="hidden" name="TradeSha" value={sha} readonly>
    <input class="bg-transparent cursor-pointer" type=submit value="pay">
  </form>
</div>
