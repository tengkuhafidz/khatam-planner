<script lang="ts">
  import MinusIcon from "./MinusIcon.svelte";
  import PlusIcon from "./PlusIcon.svelte";

  export let prayer: string;
  export let pages: number;
  export let remainder: number;
  export let updateRemainder: (shouldReduce: boolean) => void;
  export let isSavingPlan = false;

  const increasePages = () => {
    if (remainder > 0) {
      pages++;
      updateRemainder(true);
    }
  };

  const decreasePages = () => {
    if (pages > 0) {
      pages--;
      updateRemainder(false);
    }
  };
</script>

<div class={`bg-slate-800 py-4 font-bold`}>
  <h2 class="text-white">{prayer}</h2>
</div>
<div class={`bg-white py-4 font-bold text-slate-800 flex justify-center`}>
  {#if !isSavingPlan}
    <div
      class={`${
        pages > 0 ? "cursor-pointer" : "text-gray-400 cursor-not-allowed"
      }`}
      on:click={decreasePages}
      on:keypress={() => {}}
    >
      <MinusIcon />
    </div>
  {/if}
  <p class="mx-2">{pages} {pages === 1 ? "page" : "pages"}</p>
  {#if !isSavingPlan}
    <div
      class={` ${
        remainder > 0 ? "cursor-pointer" : "text-gray-400 cursor-not-allowed"
      } ${isSavingPlan ? "hidden" : ""}`}
      on:click={increasePages}
      on:keypress={() => {}}
    >
      <PlusIcon />
    </div>
  {/if}
</div>
