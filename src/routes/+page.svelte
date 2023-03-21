<script lang="ts">
  import { toJpeg } from "html-to-image";
  import { calculatePagesPerPrayer } from "../utils/calculations";
  import ExternalIcon from "./ExternalIcon.svelte";
  import PrayerAllocation from "./PrayerAllocation.svelte";
  let hasGeneratedPlan = false;
  let isSharingPlan = false;
  $: showGeneratedPlan = hasGeneratedPlan || isSharingPlan;

  let days = 29;

  let pagesAllocation = calculatePagesPerPrayer(days);
  let { subuh, zuhur, asar, maghrib, isyak, remainder } = pagesAllocation;

  const onChangeDays = () => {
    pagesAllocation = calculatePagesPerPrayer(days);
    subuh = pagesAllocation.subuh;
    zuhur = pagesAllocation.zuhur;
    asar = pagesAllocation.asar;
    maghrib = pagesAllocation.maghrib;
    isyak = pagesAllocation.isyak;
    remainder = pagesAllocation.remainder;
  };

  const updateRemainder = (shouldReduce: boolean) => {
    shouldReduce ? remainder-- : remainder++;
  };

  const generatePlan = () => {
    hasGeneratedPlan = true;
  };

  const resetPlan = () => {
    isSharingPlan = false;
    hasGeneratedPlan = false;
  };

  const sharePlan = async () => {
    try {
      isSharingPlan = true;
      const base64url = await toJpeg(document.getElementById("capture"));
      const blob = await (await fetch(base64url)).blob();
      const planImageFile = new File([blob], "my-khatam-planner.png", {
        type: blob.type,
      });

      const shareData = {
        files: [planImageFile],
      };

      navigator.share(shareData);

      isSharingPlan = false;
    } catch (error) {
      console.log("Navigator Share Error", error);
    }
  };
</script>

<div class="bg-slate-200  text-center" id="capture">
  <div class="mx-auto max-w-sm flex flex-col px-4 min-h-screen justify-evenly">
    <div id="header-section" class="py-4 ">
      <h1 class={`text-4xl font-bol`}>
        <div class={`inline-flex text-slate-600`}>
          My
          {#if showGeneratedPlan}
            {days}
          {:else}
            <input
              type="text"
              onClick="this.select();"
              bind:value={days}
              on:change={onChangeDays}
              class="text-center border border-dashed rounded mx-1 p-0 border-slate-800 w-16"
            />
          {/if}Days
        </div>
        <span class={`inline-block text-5xl text-slate-800`}>Khatam Plan</span>
      </h1>
    </div>
    <div id="main-section" class="py-4">
      <div class="grid grid-cols-2 text-xl gap-y-6">
        <PrayerAllocation
          prayer="Fajar"
          pages={subuh}
          {updateRemainder}
          {remainder}
          isSavingPlan={showGeneratedPlan}
        />
        <PrayerAllocation
          prayer="Zuhur"
          pages={zuhur}
          {updateRemainder}
          {remainder}
          isSavingPlan={showGeneratedPlan}
        />
        <PrayerAllocation
          prayer="Asar"
          pages={asar}
          {updateRemainder}
          {remainder}
          isSavingPlan={showGeneratedPlan}
        />
        <PrayerAllocation
          prayer="Maghrib"
          pages={maghrib}
          {updateRemainder}
          {remainder}
          isSavingPlan={showGeneratedPlan}
        />
        <PrayerAllocation
          prayer="Isya'"
          pages={isyak}
          {updateRemainder}
          {remainder}
          isSavingPlan={showGeneratedPlan}
        />
      </div>
      {#if remainder > 0}
        <p class={`text-lg italic mt-4 text-slate-800`}>
          <span class="font-semibold underline decoration-double "
            ><span class="text-2xl">*{remainder} </span>more {remainder === 1
              ? "page"
              : "pages"}
          </span> to be allocated.
        </p>
      {/if}
    </div>
    <div id="bottom-section" class="py-4">
      {#if !hasGeneratedPlan}
        <button
          class={`py-3 text-xl w-full border-b-8 text-white rounded ${
            remainder > 0
              ? "bg-gray-400  border-gray-600 cursor-disabled"
              : "bg-slate-700  border-slate-900 hover:bg-slate-600 hover:border-slate-800"
          }`}
          on:click={generatePlan}
          disabled={remainder > 0}
          >View Generated Plan {#if remainder === 0}&nbsp;👀{/if}</button
        >
      {:else if navigator?.canShare && !isSharingPlan}
        <button
          class={`py-3 text-xl w-full border-b-8 text-white rounded ${
            remainder > 0
              ? "bg-gray-400  border-gray-600 cursor-disabled"
              : "bg-slate-600  border-slate-800 hover:bg-slate-500 hover:border-slate-800"
          }`}
          on:click={sharePlan}
          disabled={remainder > 0}>Save Plan &nbsp;💾</button
        >
        <p on:click={resetPlan} class="mt-4 underline">Reset Plan</p>
      {:else}
        <button
          class={`py-3 text-xl w-full border-b-8 text-white rounded ${
            remainder > 0
              ? "bg-gray-400  border-gray-600 cursor-disabled"
              : "bg-slate-600  border-slate-800 hover:bg-slate-500 hover:border-slate-800"
          }`}
          on:click={sharePlan}
          disabled={remainder > 0}>Save Plan &nbsp;✅</button
        >
        <p
          on:click={resetPlan}
          class="mt-4 underline text-slate-600 hover:text-slate-800 cursor-pointer"
        >
          Back to draft
        </p>
      {/if}
    </div>
  </div>
</div>
<div class="pt-12 bg-slate-200">
  <a href="https://t.me/khatam_challenge_bot" target="_blank">
    <div class="py-2 bg-slate-400  text-slate-900 font-light text-center">
      <p class="inline underline">Khatam with your loved ones on Telegram</p>
      <ExternalIcon />
    </div>
  </a>
</div>
