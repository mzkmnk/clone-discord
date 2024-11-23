<script lang="ts" setup>

import Sidebar from '~/components/(sidebar)/sidebar.vue'
import {useServersStore} from "~/composables/store/servers.store";
import Chat from "~/components/dashboard/chat.vue";

const userStore = useUserStore();

const serversStore = useServersStore();

const content = ref<string>('');

const groupId = '83748e60-ef6e-4fe2-a016-126f494a839f' // todo

onMounted(async () => {
  serversStore.setIsLoadingServerInfo({loading:true});
  await serversStore.getServers();
  serversStore. setIsLoadingServerInfo({loading:false});
});

const onClickSubmit = async ():Promise<void> => {
  await $fetch('/api/chat/create',{
    method:'post',
    body:{
      userId:userStore.user.id,
      groupId:groupId,
      content:content.value,
    }
  })
}

</script>

<template>
  <div class="flex min-h-screen w-screen">
    <Sidebar />
    <div class="flex-1 h-screen">
      <chat :group-id="groupId" class="overflow-y-auto h-[95%]"></chat>
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
