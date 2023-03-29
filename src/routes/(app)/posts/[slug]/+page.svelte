<script lang="ts">
  import type { PageData } from "./$types";
  import Markdown from "$lib/components/Markdown.svelte";

  export let data: PageData;

  $: ({ postData, slug } = data);
</script>

<svelte:head>
  <title>{postData?.post?.title || "Post"}</title>
</svelte:head>

{#if postData}
  <div class="relative w-full bg-black min-h-screen px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
    <div class="relative mx-auto max-w-2xl">
      <div class="w-full space-y-8">
        <div>
          <a href="/" class="hover:underline font-bold text-sm text-white">← Back to home</a>
        </div>

        <div>
          <h1 class="text-4xl font-bold">{postData.title}</h1>
          <div class="mt-3 flex items-center">
            {#if postData.author}
            <div class="flex-shrink-0">
              <span class="sr-only">Image</span>
              <img
                class="h-10 w-10 rounded-full"
                src={postData.author.picture}
                alt=""
              />
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-white">{postData.author.name}</p>
              <div class="flex space-x-1 text-sm text-gray-400">
                <time datetime="2020-03-16">
                  {new Date(postData.date).toLocaleDateString()}
                </time>
              </div>
            </div>
            {/if}
          </div>
        </div>
        {#if postData.coverImage}
        <img
          class="h-92 w-full object-cover rounded-xl mb-10"
          src={postData.coverImage}
          alt=""
        />
        {/if}
        <div>
          <Markdown source={postData.content} />
        </div>
      </div>
    </div>
  </div>
{/if}
