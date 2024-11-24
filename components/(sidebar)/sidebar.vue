<script lang="ts" setup>

import SidebarItem from '~/components/(sidebar)/sidebar-item.vue';
import Dialog from "~/components/(dialog)/dialog.vue";

const serversStore = useServersStore();

/** ダイアログのprops */
const dialogProps = ref<{
  isOpen: boolean;
  loading:boolean,
  servername:string,
  imageFile:File[],
}>({
  isOpen: false,
  loading:false,
  servername:'',
  imageFile:[],
})

/** ダイアログを表示する */
const clickAddGroup = ():void => {
  dialogProps.value.isOpen = true;
}

/** ダイアログの戻るボタンの関数 */
const clickBackButton = ():boolean => dialogProps.value.isOpen = false;

/** サーバーの画像を取得する */
    // todo 型定義
const uploadImage = async (e:any):Promise<void> => {
  if(!e.target){
    return
  }
  dialogProps.value.imageFile = e.target.files;
};

/** ダイアログの進むボタン関数 */
const clickNextButton = async ():Promise<void> => {
  dialogProps.value.loading = true;

  await serversStore.createServer({file:dialogProps.value.imageFile[0],servername:dialogProps.value.servername})

  /** 初期値に戻す */
  dialogProps.value = {
    isOpen:false,
    loading:false,
    servername:'',
    imageFile:[],
  }
}

</script>

<template>
  <div class="flex w-80">
    <div class="flex w-32 flex-col items-center justify-between bg-slate-200 py-2">
      <div class="flex flex-col items-center justify-start gap-4 w-full h-full">
        <SidebarItem class-name="bg-white group-hover:bg-indigo-600">
          <Icon
            :class="cn('text-black', 'group-hover:text-white')"
            name="ic:baseline-discord"
            size="30"
          />
        </SidebarItem>

        <!--dbから取得した情報を表示する-->
        <SidebarItem v-for="i of [0,1,2]" v-if="serversStore.isLoadingServerInfo" :key="i">
          <div class="w-full h-full rounded-full bg-gray-400 animate-pulse"></div>
        </SidebarItem>

        <SidebarItem v-for="server of serversStore.servers" v-else :key="server.id" class-name="bg-white p-1">
          <nuxt-img
              :src="server.iconUrl"
              alt="server icon"
              class="w-full h-full object-contain rounded-full"
          >
          </nuxt-img>
        </SidebarItem>

        <SidebarItem :click="clickAddGroup" class-name="bg-white group-hover:bg-green-500">
          <Icon
            :class="cn('text-green-500', 'group-hover:text-white')"
            name="ic:outline-plus"
            size="30"
          />
        </SidebarItem>
      </div>
    </div>
    <!-- detail-sidebar -->
    <div class="w-full h-full bg-slate-50">
      <div class="flex flex-col justify-end w-full h-full">
          <div class="flex gap-2 bg-slate-100 p-2">
            <div class="relative flex-shrink-0 rounded-full bg-red-500 min-w-12 min-h-12 flex items-center justify-center">

              <Icon
                  class="bg-white"
                  name="ic:baseline-discord"
                  size="27"
              />

              <span class="absolute flex h-3 w-3 bottom-0 right-0">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
              </span>
            </div>
            <div class="flex flex-col">
              <p class="font-bold text-slate-900">MZKMNK</p>
              <p class="text-slate-600">ONLINE</p>
            </div>
        </div>
      </div>
    </div>
  </div>

  <!--サーバ追加のダイアログ-->
  <Dialog :is-open="dialogProps.isOpen">
    <div class="px-10 py-7 w-full min-h-full rounded-xl bg-white flex flex-col gap-3">
      <h3 class="text-2xl font-semibold text-gray-700">サーバーを作成</h3>

      <div class="flex flex-col gap-2 items-center justify-center">
        <label class="flex cursor-pointer appearance-none items-center justify-center border-2 border-dashed rounded-full border-gray-200 p-6 transition-all">
          <Icon name="marketeq:upload-alt-4" size="25"></Icon>
          <input id="file" class="sr-only" type="file" @change="uploadImage($event)" />
        </label>
      </div>
      <div class="flex flex-col gap-2 items-start">
        <p class="font-semibold text-gray-600">サーバー名</p>
        <input v-model="dialogProps.servername" autofocus class="font-semibold text-gray-800 border w-full rounded-xl h-12 px-2 block focus:outline-none focus:border-indigo-600 focus:ring-indigo-600 focus:ring-1" placeholder="example:nextjs server">
      </div>
      <div class="flex items-center justify-end gap-4">
        <button class="rounded-xl bg-red-600 hover:bg-red-500 text-white p-2 min-w-20" @click="clickBackButton">
          戻る
        </button>
        <button :class="cn('rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white p-2 min-w-20',{
              'bg-indigo-500':dialogProps.loading || dialogProps.servername === '',
            })" :disabled="dialogProps.loading || dialogProps.servername === ''" @click="clickNextButton">
          作成
        </button>
      </div>
    </div>
  </Dialog>
</template>
