<script lang="ts">
  import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  } from "@rgossiaux/svelte-headlessui";
  import { getThemeClass, ThemeItems, Themes } from "../utils/themeClass";

  export let updateTheme: (theme: Themes) => void;
</script>

<div class="fixed top-2 right-2 w-56 text-right">
  <Menu
    as="div"
    class="relative inline-block text-left text-slate-600 font-semibold"
  >
    <div>
      <MenuButton
        class="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-2 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >Themes</MenuButton
      >
    </div>
    <MenuItems
      class="absolute right-0 mt-2 w-24 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      {#each Object.values(Themes) as theme}
        <div class="px-1 py-1">
          <MenuItem let:active>
            <button
              on:click={() => updateTheme(theme)}
              class={`text-${theme}-600 hover:bg-${theme}-600 hover:text-white group flex w-full items-center rounded-md px-2 py-2 text-sm flex justify-between`}
              >{theme}
              <div
                class={`inline rounded-full bg-${theme}-900 w-4 h-4 align-right border border-white`}
              /></button
            ></MenuItem
          >
        </div>
      {/each}
    </MenuItems>
  </Menu>
</div>
