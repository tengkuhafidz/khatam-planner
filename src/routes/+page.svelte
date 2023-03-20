<script lang="ts">
  import { toJpeg } from "html-to-image";
  import { calculatePagesPerPrayer } from "../utils/calculations";
  import { Themes } from "../utils/themeClass";
  import PrayerAllocation from "./PrayerAllocation.svelte";
  import ThemeMenu from "./ThemeMenu.svelte";

  let theme = Themes.Slate;

  let hasGeneratedPlan = false;
  let days = 29;

  let pagesAllocation = calculatePagesPerPrayer(days);
  let { subuh, zuhur, asar, maghrib, isyak, remainder } = pagesAllocation;

  const updateTheme = (newTheme: Themes) => {
    theme = newTheme;
  };

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

  const sharePlan = async () => {
    try {
      generatePlan();
      const base64url = await toJpeg(document.getElementById("capture"));
      const blob = await (await fetch(base64url)).blob();
      const planImageFile = new File([blob], "my-khatam-planner.png", {
        type: blob.type,
      });

      const shareData = {
        url: "https://khatam-planner.jariyah.app",
        files: [planImageFile],
      };
      navigator.share(shareData);
    } catch (error) {
      console.log("Navigator Share Error", error);
    }
  };
</script>

<div class="bg-slate-100  text-center" id="capture">
  {#if !hasGeneratedPlan}
    <div id="theme-section" class="hidden">
      <ThemeMenu {updateTheme} />
    </div>
  {/if}
  <div class="mx-auto max-w-sm flex flex-col px-4 min-h-screen justify-evenly">
    <div id="header-section" class="py-4 ">
      <h1 class={`text-4xl font-bol`}>
        <div class={`inline-flex text-slate-600`}>
          My
          {#if hasGeneratedPlan}
            {days}
          {:else}
            <input
              type="text"
              onClick="this.select();"
              bind:value={days}
              on:change={onChangeDays}
              class="text-center border border-dashed rounded mx-1 p-0 border-slate-900 w-16"
            />
          {/if}Days
        </div>
        <span class={`inline-block text-5xl text-slate-900`}>Khatam Plan</span>
      </h1>
    </div>
    <div id="main-section" class="py-4">
      <div class="grid grid-cols-2 text-xl gap-y-6">
        <PrayerAllocation
          prayer="Fajar"
          pages={subuh}
          {theme}
          {updateRemainder}
          {remainder}
          isSavingPlan={hasGeneratedPlan}
        />
        <PrayerAllocation
          prayer="Zuhur"
          pages={zuhur}
          {theme}
          {updateRemainder}
          {remainder}
          isSavingPlan={hasGeneratedPlan}
        />
        <PrayerAllocation
          prayer="Asar"
          pages={asar}
          {theme}
          {updateRemainder}
          {remainder}
          isSavingPlan={hasGeneratedPlan}
        />
        <PrayerAllocation
          prayer="Maghrib"
          pages={maghrib}
          {theme}
          {updateRemainder}
          {remainder}
          isSavingPlan={hasGeneratedPlan}
        />
        <PrayerAllocation
          prayer="Isya'"
          pages={isyak}
          {theme}
          {updateRemainder}
          {remainder}
          isSavingPlan={hasGeneratedPlan}
        />
      </div>
      {#if remainder > 0}
        <p class={`text-lg italic mt-4 text-slate-900`}>
          <span class="font-semibold underline decoration-double "
            ><span class="text-2xl">*{remainder} </span>more {remainder === 1
              ? "page"
              : "pages"}
          </span> to be allocated.
        </p>
      {/if}
    </div>
    <div id="bottom-section" class="py-4">
      {#if hasGeneratedPlan}
        <p class={`text-sm  text-slate-900`}>
          Generate your khatam plan at: <span class="font-semibold inline-block"
            >khatam-planner.jariyah.app</span
          >
        </p>
      {:else if navigator?.canShare}
        <button
          class={`py-3 text-xl w-full border-b-8 text-white rounded ${
            remainder > 0
              ? "bg-gray-400  border-gray-600 cursor-disabled"
              : "bg-slate-600  border-slate-900 hover:bg-slate-500 hover:border-slate-800"
          }`}
          on:click={sharePlan}
          disabled={remainder > 0}>Share Plan</button
        >
      {:else}
        <button
          class={`py-3 text-xl w-full border-b-8 text-white rounded ${
            remainder > 0
              ? "bg-gray-400  border-gray-600 cursor-disabled"
              : "bg-slate-600  border-slate-900 hover:bg-slate-500 hover:border-slate-800"
          }`}
          on:click={generatePlan}
          disabled={remainder > 0}>Generate Page For Screenshot</button
        >
      {/if}
    </div>
  </div>
</div>