<script lang="ts">
  import { admin } from "$lib/stores";

  let isAdmin: boolean;

  admin.subscribe((value: boolean) => {
    isAdmin = value;
  });
</script>

<svelte:head>
  <title>Blog</title>
</svelte:head>

<div
  class="relative w-full bg-black min-h-screen px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28"
>
  <div class="relative mx-auto max-w-7xl">
    <div class="text-center">
      <div class="flex items-center justify-center w-full mb-5">
        <a
          href="https://chrisjayden.com"
          target="_blank"
          rel="noreferrer noopener"
          class="group block flex-shrink-0"
        >
          <div class="flex items-center text-left">
            <div>
              <img
                class="inline-block h-9 w-9 rounded-full"
                src="/avatar.png"
                alt="Johnny Hsieh avatar"
              />
            </div>
            <div class="ml-3">
              <p
                class="text-sm font-medium text-white group-hover:text-gray-100"
              >
                Johnny Hsieh
              </p>
              <p
                class="text-xs font-medium text-gray-200 group-hover:text-white"
              >
                Maker
              </p>
            </div>
          </div>
        </a>
      </div>
      <h1 class="text-3xl font-bold text-white sm:text-4xl">Blog</h1>

      <p class="mx-auto mt-3 max-w-xl text-lg text-gray-500 sm:mt-4">
        Welcome to my blog
      </p>
    </div>
  </div>
</div>
