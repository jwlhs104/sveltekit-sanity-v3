<script>
  import axios from 'axios'
  import { onMount } from 'svelte'
  let aes, sha
  onMount(async ()=> {
    const { data } = await axios.get('/api/encrypt')
    aes = data.aes
    sha = data.sha
  })
  const mid = "MS148427498"
</script>
<div>
  <form method=post action="https://ccore.newebpay.com/MPG/mpg_gateway" target="_blank">
    <input class="hidden" name="MerchantID" value={mid} readonly>
    <input class="hidden" name="Version" value="2.0" readonly>
    <input class="hidden" name="TradeInfo" value={aes} readonly>
    <input class="hidden" name="TradeSha" value={sha} readonly>
    <input class="bg-transparent cursor-pointer" type=submit value="pay">
  </form>
</div>
