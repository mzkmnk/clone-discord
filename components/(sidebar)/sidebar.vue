<script setup lang="ts">
import { cn } from '~/libs/utils'
import SidebarItem from '~/components/(sidebar)/sidebar-item.vue'
</script>

<template>
  <div class="flex w-80">
    <div class="flex w-32 flex-col items-center justify-start gap-4 bg-slate-200 py-2">
      <SidebarItem class-name="bg-white">
        <Icon
          :class="cn('text-black', 'group-hover:text-white')"
          name="ic:baseline-discord"
          size="30"
        />
      </SidebarItem>
      <SidebarItem>
        <Icon
          :class="cn('')"
          name="logos:arc"
          size="30"
        />
      </SidebarItem>
      <SidebarItem>
        <Icon
          :class="cn('')"
          name="logos:aws"
          size="30"
        />
      </SidebarItem>
      <SidebarItem>
        <Icon
          :class="cn('')"
          name="logos:angular-icon"
          size="30"
        />
      </SidebarItem>
      <SidebarItem>
        <Icon
          :class="cn('')"
          name="logos:vue"
          size="30"
        />
      </SidebarItem>
      <SidebarItem>
        <Icon
          :class="cn('')"
          name="logos:nextjs-icon"
          size="30"
        />
      </SidebarItem>
      <SidebarItem class-name="group-hover:bg-green-500">
        <Icon
          :class="cn('text-green-500', 'group-hover:text-white')"
          name="ic:outline-plus"
          size="30"
        />
      </SidebarItem>
    </div>
    <!-- detail-sidebar -->
    <div class="w-full bg-slate-100" />
  </div>
</template>
