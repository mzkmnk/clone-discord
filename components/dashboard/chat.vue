<script lang="ts" setup>

import type {TGroupMessagesTable, TUserTable} from "~/server/database";
import {$fetch} from "ofetch";
import {format} from "date-fns";

export type TChat = {
  user:{
    id:string,
    username:string,
  }
  id:string,
  content:string,
  createdAt:Date,
};

const props = defineProps<{groupId:string}>();

const supabase = useSupabaseClient();

const chats = ref<TChat[]>([]);

const isLoadingChat = ref<boolean>(true);

const scrollContainerRef = ref<HTMLDivElement>();

const chatsChannel = supabase
    .channel('chat')
    .on(
        'postgres_changes',
        {event: 'INSERT', schema: 'public',table:'group_messages_table'},
        async (payload:any) => { // todo 型づけどうしよう
          const chatResponse : TGroupMessagesTable = payload.new;

          const { user } = await $fetch<{user:TUserTable}>(`/api/user/${chatResponse.userId}`);

          chats.value.push({
            user:{
              id:chatResponse.userId,
              username:user.name,
            },
            id:chatResponse.id,
            content:chatResponse.content,
            createdAt:chatResponse.createdAt,
          });

          chats.value.sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        }
    );

onMounted(async () => {
  const { serverChats } = await $fetch<{serverChats:TGroupMessagesTable[]}>(`api/chat/${props.groupId}`);

  await Promise.all(
    serverChats.map(async (chat) => {

      /** ユーザデータを取得する*/
      const { user } = await $fetch<{user:TUserTable}>(`/api/user/${chat.userId}`);

      chats.value.push({
        user:{
          id:chat.userId,
          username:user.name
        },
        id:chat.id,
        content:chat.content,
        createdAt:chat.createdAt,
      });
    })
 );

  chats.value.sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  chatsChannel.subscribe();

  isLoadingChat.value = false;
});

/** 最下部に自動でスクロールする */
const scrollToBottom = ():void => {
  if(scrollContainerRef.value){
    scrollContainerRef.value.scrollTop = scrollContainerRef.value.scrollHeight;
  }
};

onMounted(() => {
  scrollToBottom();
});

watch(chats,() => {
  scrollToBottom();
});

</script>

<template>
  <div ref="scrollContainerRef" class="container">
      <div class="flex flex-col gap-1 py-2">
        <div v-if="isLoadingChat" class="flex flex-col gap-2">
          <div v-for="i of Array(20).fill(0)" :key="i" class="flex items-center gap-2 p-2">
            <div class="min-h-16 min-w-16 bg-gray-200 animate-pulse rounded-full"></div>
            <div class="flex flex-col gap-2 w-full">
              <div class="min-h-5 w-full bg-gray-200 animate-pulse rounded-lg"></div>
              <div class="min-h-5 w-96 bg-gray-200 animate-pulse rounded-lg"></div>
              <div class="min-h-5 w-[500px] bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
          </div>
        </div>
        <div v-for="chat of chats" v-else class="flex items-center gap-4 hover:bg-gray-100 p-2">
          <div class="flex-shrink-0 rounded-full bg-red-500 w-16 h-16 flex items-center justify-center">
            <Icon
                class="bg-white"
                name="ic:baseline-discord"
                size="30"
            />
          </div>
          <div class="flex flex-col gap-1">
            <div class="flex gap-2 items-center">
              <p class="font-semibold text-lg">{{chat.user.username}}</p>
              <p class="text-slate-400 text-sm">{{format(chat.createdAt,'yyyy-MM-dd HH:mm')}}</p>
            </div>
            <p class="text-lg text-gray-800">{{chat.content}}</p>
          </div>
        </div>
      </div>
  </div>
</template>
