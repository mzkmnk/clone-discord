<script lang="ts" setup>

const props = defineProps<{
  className?: string,
  isSelected?:boolean,
  click?:() => void|Promise<void>,
}>()

</script>

<template>
  <div class="group relative flex w-full items-center justify-center" @click="props.click">
    <div :class="cn('before:absolute before:left-0 before:top-1/2 before:flex before:h-1/6 before:w-[4.5px] before:-translate-y-1/2 before:rounded-full before:bg-black before:duration-150',{
      'group-hover:before:h-3/6':!isSelected,
      'before:h-5/6':isSelected,
    })" />
    <div :class="cn(' cursor-pointer flex items-center justify-center rounded-full h-16 w-16', 'group-hover:rounded-2xl', props.className)">
      <slot />
    </div>
  </div>
</template>
