<script setup lang="ts">

import {cn, createUUID} from '~/libs/utils'
import SidebarItem from '~/components/(sidebar)/sidebar-item.vue';
import Dialog from "~/components/(dialog)/dialog.vue";
import {useUserStore} from "~/composables/store/user.store";

const { user } = useUserStore();

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

const clickAddGroup = ():void => {
  dialogProps.value.isOpen = true;
};

/** ダイアログの戻るボタンの関数 */
const clickBackButton = () => dialogProps.value.isOpen = false;

/** ダイアログの進むボタン関数 */
const clickNextButton = async () => {
  dialogProps.value.loading = true;

  // 画像をアップロードする
  const formData = new FormData();
  formData.append('file',dialogProps.value.imageFile[0]);
  await $fetch('/api/image/upload',{
    method:'post',
    body:formData,
  })

  // todo image upload完了次第コメントアウト外す
  // const groupId:string = createUUID();
  // await $fetch('/api/group/create',{
  //   method:'POST',
  //   body:{
  //     id:groupId,
  //     name:dialogProps.value.servername,
  //     description:'test description',
  //   }
  // });
  //
  // await $fetch('/api/group/insert-user',{
  //   method:'POST',
  //   body:{
  //     userId:user.id,
  //     groupId:groupId,
  //     role:'admin',
  //   }
  // });

  /** 初期値に戻す */
  dialogProps.value = {
    isOpen:false,
    loading:false,
    servername:'',
    imageFile:[],
  }
};

/** サーバーの画像を取得する */
// todo 型定義
const uploadImage = async (e:any) => {
  if(!e.target){
    return
  }
  dialogProps.value.imageFile = e.target.files;
};

</script>

<template>
  <div class="flex w-80">
    <div class="flex w-32 flex-col items-center justify-start gap-4 bg-slate-200 py-2">
      <SidebarItem class-name="bg-white group-hover:bg-indigo-600">
        <Icon
          :class="cn('text-black', 'group-hover:text-white')"
          name="ic:baseline-discord"
          size="30"
        />
      </SidebarItem>
      <SidebarItem>
        <nuxt-img class="w-auto rounded-full" src="assets/sumples/angular.png"></nuxt-img>
      </SidebarItem>
      <SidebarItem :is-selected=true>
        <Icon
          name="logos:arc"
          size="30"
        />
      </SidebarItem>
      <SidebarItem>
        <Icon
          name="logos:aws"
          size="30"
        />
      </SidebarItem>
      <SidebarItem>
        <Icon
          name="logos:angular-icon"
          size="30"
        />
      </SidebarItem>
      <SidebarItem>
        <Icon
          name="logos:vue"
          size="30"
        />
      </SidebarItem>
      <SidebarItem>
        <Icon
          name="logos:nextjs-icon"
          size="30"
        />
      </SidebarItem>
      <SidebarItem class-name="group-hover:bg-green-500" :click="clickAddGroup">
        <Icon
          :class="cn('text-green-500', 'group-hover:text-white')"
          name="ic:outline-plus"
          size="30"
        />
      </SidebarItem>
      <Dialog :is-open="dialogProps.isOpen">
        <div class="px-10 py-7 w-full min-h-full rounded-xl bg-white flex flex-col gap-3">
          <h3 class="text-2xl font-semibold text-gray-700">サーバーを作成</h3>

          <div class="flex flex-col gap-2 items-center justify-center">
            <label class="flex cursor-pointer appearance-none items-center justify-center border-2 border-dashed rounded-full border-gray-200 p-6 transition-all">
              <Icon name="marketeq:upload-alt-4" size="25"></Icon>
              <input type="file" id="file" class="sr-only" @change="uploadImage($event)" />
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
            })" @click="clickNextButton" :disabled="dialogProps.loading || dialogProps.servername === ''">
              作成
            </button>
          </div>
        </div>
      </Dialog>
    </div>
    <!-- detail-sidebar -->
    <div class="w-full bg-slate-100" />
  </div>
</template>
