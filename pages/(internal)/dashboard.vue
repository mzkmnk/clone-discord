<script setup lang="ts">

import Sidebar from '~/components/(sidebar)/sidebar.vue'
import {useUserStore} from "~/composables/store/user.store";
import {$fetch} from "ofetch";

const { user } = useUserStore();

onMounted(async() => {
  await $fetch('/api/group/get-all',{
    method:'POST',
    body: {
      userId: user.id,
    }
  });
});

</script>

<template>
  <div class="flex min-h-screen w-screen">
    <Sidebar />
    <div class="flex-1">
      <p>dashboard</p>
    </div>
  </div>
</template>
