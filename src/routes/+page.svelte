<script lang="ts">
  import { toJpeg } from "html-to-image";
  import { calculatePagesPerPrayer } from "../utils/calculations";
  import { themes, Themes } from "../utils/themeClass";
  import ExternalIcon from "./ExternalIcon.svelte";
  import PrayerAllocation from "./PrayerAllocation.svelte";
  import RightArrowIcon from "./RightArrowIcon.svelte";
  import ShareIcon from "./ShareIcon.svelte";
  import ThemeMenu from "./ThemeMenu.svelte";
  let isSharingPlan = false;
  let hasGeneratedPlan = false;
  $: showGeneratedPlan = isSharingPlan || hasGeneratedPlan;

  let theme = Themes.Slate;

  const updateTheme = (newTheme: Themes) => {
    theme = newTheme;
  };

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

  const sharePlan = async () => {
    try {
      isSharingPlan = true;
      await toJpeg(document.getElementById("plan-section"));
      const base64url = await toJpeg(document.getElementById("plan-section"));

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

<div class={`${themes[theme].bg.light} text-center`} id="plan-section">
  <div
    class={`${themes[theme].bg.light} mx-auto max-w-sm flex flex-col px-4 min-h-screen justify-evenly`}
  >
    {#if !showGeneratedPlan}
      <div id="theme-section">
        <ThemeMenu {updateTheme} />
      </div>
    {/if}
    <div id="header-section" class="py-4 ">
      <h1 class={`text-4xl font-bol`}>
        <div class={`inline-flex ${themes[theme].text.base}`}>
          My
          {#if showGeneratedPlan}
            {days}
          {:else}
            <input
              type="text"
              onClick="this.select();"
              bind:value={days}
              on:change={onChangeDays}
              class={`text-center border border-dashed rounded mx-1 p-0 ${themes[theme].border.dark} w-16`}
            />
          {/if}Days
        </div>
        <span class={`inline-block text-5xl ${themes[theme].text.dark}`}
          >Khatam Plan</span
        >
      </h1>
    </div>
    <div id="main-section" class="py-4">
      <div class="grid grid-cols-2 text-xl gap-y-6">
        <PrayerAllocation
          prayer="Fajar"
          pages={subuh}
          {updateRemainder}
          {remainder}
          isSharingPlan={showGeneratedPlan}
          {theme}
        />
        <PrayerAllocation
          prayer="Zuhur"
          pages={zuhur}
          {updateRemainder}
          {remainder}
          isSharingPlan={showGeneratedPlan}
          {theme}
        />
        <PrayerAllocation
          prayer="Asar"
          pages={asar}
          {updateRemainder}
          {remainder}
          isSharingPlan={showGeneratedPlan}
          {theme}
        />
        <PrayerAllocation
          prayer="Maghrib"
          pages={maghrib}
          {updateRemainder}
          {remainder}
          isSharingPlan={showGeneratedPlan}
          {theme}
        />
        <PrayerAllocation
          prayer="Isya'"
          pages={isyak}
          {updateRemainder}
          {remainder}
          isSharingPlan={showGeneratedPlan}
          {theme}
        />
      </div>
      {#if remainder > 0}
        <p class={`text-lg italic mt-4 ${themes[theme].text.dark}`}>
          <span class="font-semibold underline decoration-double "
            ><span class="text-2xl">*{remainder} </span>more {remainder === 1
              ? "page"
              : "pages"}
          </span> to be allocated.
        </p>
      {/if}
    </div>
    <div id="bottom-section" class="py-4">
      {#if showGeneratedPlan}
        <p class={`text-sm  ${themes[theme].text.dark}`}>
          Generate your khatam plan at: <br />
          <span
            class="font-bold underline"
            on:click={() => {
              hasGeneratedPlan = false;
            }}>khatam-planner.jariyah.app</span
          >
        </p>
      {:else if navigator?.canShare}
        <button
          class={`py-3 text-xl w-full border-b-8 text-white rounded ${
            remainder > 0
              ? "bg-gray-400  border-gray-600 cursor-disabled"
              : themes[theme].button
          }`}
          on:click={sharePlan}
          disabled={remainder > 0}>Save Plan 🤗</button
        >
      {:else}
        <button
          class={`py-3 text-xl w-full border-b-8 text-white rounded ${
            remainder > 0
              ? "bg-gray-400  border-gray-600 cursor-disabled"
              : themes[theme].button
          }`}
          on:click={generatePlan}
          disabled={remainder > 0}
          >View Screenshot-Worthy Plan {remainder > 0 ? "" : "😎"}
        </button>
      {/if}
    </div>
  </div>
</div>
<div class={`pt-12 ${themes[theme].bg.light}`}>
  <a href="https://t.me/khatam_challenge_bot" target="_blank">
    <div
      class={`py-2 ${themes[theme].bg.base} ${themes[theme].text.dark} font-light text-center`}
    >
      <p class="inline underline">Khatam with your loved ones on Telegram</p>
      <ExternalIcon />
    </div>
  </a>
</div>
