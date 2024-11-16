<script setup lang="ts">
import {cn} from "~/libs/utils";

const props = defineProps<{className?:string}>();

</script>

<template>
  <div class="w-full relative flex items-center justify-center group">
    <div class="before:absolute before:flex before:bg-black before:h-1/6 group-hover:before:h-3/6 before:duration-150 before:-translate-y-1/2 before:w-1 before:top-1/2 before:left-0 before:rounded-2xl"></div>
    <div :class="cn('cursor-pointer flex items-center justify-center rounded-full bg-white p-3 h-16 w-16','group-hover:rounded-2xl group-hover:bg-indigo-500',props.className)">
      <slot />
    </div>
  </div>
</template>
