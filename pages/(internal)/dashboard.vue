<script setup lang="ts">

import Sidebar from '~/components/(sidebar)/sidebar.vue'
import {useUserStore} from "~/composables/store/user.store";
import {$fetch} from "ofetch";

const { $client } = useNuxtApp();

const { user } = useUserStore();

const data = await useFetch('/api/group/group');
console.log('data',data.data.value);

</script>

<template>
  <div class="flex min-h-screen w-screen">
    <Sidebar />
    <div class="flex-1">
      <p>dashboard</p>
    </div>
  </div>
</template>
