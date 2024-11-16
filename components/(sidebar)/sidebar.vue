<script setup lang="ts">

import {cn} from "~/libs/utils";
import SidebarItem from "~/components/(sidebar)/sidebar-item.vue";


</script>

<template>
  <div class="w-80 flex">
    <div class="flex flex-col items-center justify-start py-2 w-32 bg-slate-200 gap-4">
      <SidebarItem class-name="bg-white">
        <Icon :class="cn('text-black','group-hover:text-white')" name="ic:baseline-discord" size="30"></Icon>
      </SidebarItem>
      <SidebarItem>
        <Icon :class="cn('')" name="logos:arc" size="30"></Icon>
      </SidebarItem>
      <SidebarItem>
        <Icon :class="cn('')" name="logos:aws" size="30"></Icon>
      </SidebarItem>
      <SidebarItem>
        <Icon :class="cn('')" name="logos:angular-icon" size="30"></Icon>
      </SidebarItem>
      <SidebarItem>
        <Icon :class="cn('')" name="logos:vue" size="30"></Icon>
      </SidebarItem>
      <SidebarItem>
        <Icon :class="cn('')" name="logos:nextjs-icon" size="30"></Icon>
      </SidebarItem>
      <SidebarItem class-name="group-hover:bg-green-500">
        <Icon :class="cn('text-green-500','group-hover:text-white')" name="ic:outline-plus" size="30"></Icon>
      </SidebarItem>
    </div>
    <!--detail-sidebar-->
    <div class="w-full bg-slate-100"></div>
  </div>
</template>
