<script lang="ts" setup>

import Sidebar from '~/components/(sidebar)/sidebar.vue'
import {useServersStore} from "~/composables/store/servers.store";
import Chat from "~/components/dashboard/chat.vue";

const userStore = useUserStore();

const serversStore = useServersStore();

const content = ref<string>('');

onMounted(async () => {
  serversStore.setIsLoadingServerInfo({loading:true});
  await serversStore.getServers();
  serversStore.setSelectedServer({serverId:undefined});
  serversStore. setIsLoadingServerInfo({loading:false});
});

const onClickSubmit = async ():Promise<void> => {
  await $fetch('/api/chat/create',{
    method:'post',
    body:{
      userId:userStore.user.id,
      groupId:serversStore.selectedServer,
      content:content.value,
    }
  });

  content.value = '';
}

</script>

<template>
  <div class="flex min-h-screen w-screen">
    <Sidebar />
    <div class="flex-1 h-screen">
      <div class="overflow-y-auto h-[95%]">
        <div v-if="serversStore.selectedServer === undefined" class="flex flex-col gap-2 py-2">
          <div v-for="i of Array(20).fill(0)" :key="i" class="flex items-center gap-2 p-2">
            <div class="min-h-16 min-w-16 bg-gray-200 animate-pulse rounded-full"></div>
            <div class="flex flex-col gap-2 w-full">
              <div class="min-h-5 w-full bg-gray-200 animate-pulse rounded-lg"></div>
              <div class="min-h-5 w-96 bg-gray-200 animate-pulse rounded-lg"></div>
              <div class="min-h-5 w-[500px] bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
          </div>
        </div>
        <chat v-else :group-id="serversStore.selectedServer"></chat>
      </div>
      <div class="h-[5%] w-full flex items-start justify-center">
        <div class="cursor-text w-[99%] mx-auto flex items-center justify-center bg-gray-200 h-5/6 rounded-xl px-2 gap-2">
          <textarea v-model="content" class="resize-none w-full  bg-gray-200 text-slate-800 text-lg focus:outline-none" placeholder="メッセージへ送信" rows="1"></textarea>
          <button class="flex items-center justify-center" @click="onClickSubmit">
            <Icon
                class="bg-slate-700 cursor-pointer"
                name="lucide:navigation"
                size="20"
            ></Icon>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
