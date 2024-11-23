<script lang="ts" setup>

import Sidebar from '~/components/(sidebar)/sidebar.vue'
import {useServersStore} from "~/composables/store/servers.store";

const serversStore = useServersStore();

onMounted(async () => {
  serversStore.setIsLoadingServerInfo({loading:true});
  await serversStore.getServers();
  serversStore. setIsLoadingServerInfo({loading:false});
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
