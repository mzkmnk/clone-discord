<script lang="ts" setup>

import Sidebar from '~/components/(sidebar)/sidebar.vue'
import {useServersStore} from "~/composables/store/servers.store";
import Chat from "~/components/dashboard/chat.vue";

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
    <div class="flex-1 h-screen relative">
      <chat class="overflow-y-auto h-[95%]"></chat>
      <div class="h-[5%] w-full flex items-start justify-center">
        <div class="cursor-text w-[99%] mx-auto flex items-center justify-center bg-gray-200 h-5/6 rounded-xl px-2 gap-2">
          <textarea class="resize-none w-full  bg-gray-200 text-slate-800 text-lg focus:outline-none" placeholder="メッセージへ送信" rows="1"></textarea>
          <Icon
              class="bg-slate-700 cursor-pointer rounded-full"
              name="material-symbols:arrows-more-up-rounded"
              size="20"
          ></Icon>
        </div>
      </div>
    </div>
  </div>
</template>
