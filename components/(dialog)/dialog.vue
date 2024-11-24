<script setup lang="ts">

const props = defineProps<{
  isOpen: boolean;
}>();

</script>

<template>
  <div class="relative z-10" role="dialog" aria-modal="true" v-if="props.isOpen">
    <div class="fixed inset-0 bg-gray-500/75"></div>
    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex items-center justify-center min-h-full">
        <div class="relative w-full my-8 max-w-lg text-center shadow-sm">
           <slot />
        </div>
      </div>
    </div>
  </div>
</template>
