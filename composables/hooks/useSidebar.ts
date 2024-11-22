/** sidebar composable */
export default function(){

  /** ユーザ情報のstate */
  const { user } = useUserStore();

  /** supabaseのstorage */
  const { storage } = useSupabaseClient();

  /** ユーザが所属しているサーバー */
  const servers = ref<{id: string,name: string,iconUrl:string}[]>([]);

  /** ユーザが所属しているサーバーを取得するときのローディング */
  const isLoading = ref<boolean>(true);

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

    const groupId:string = createUUID();
    const imageId:string = createUUID();

    const bucket:string = 'icons/server';

    // 画像fileを取得する
    const file = dialogProps.value.imageFile[0];

    // 拡張子を取得する
    const fileExt = file.name.split('.').pop();

    // 画像のpath
    const filePath = `${imageId}.${fileExt}`;

    // 画像をアップロードする
    const { data } = await storage.from(bucket).upload(filePath,file);

    // グループを作成する
    await $fetch('/api/group/create',{
      method:'post',
      body:{
        id:groupId,
        name:dialogProps.value.servername,
        description:'test description',
        bucket,
        iconUrl:data?.path,
      }
    });

    // グループにユーザを追加する
    await $fetch('/api/group/insert-user',{
      method:'post',
      body:{
        userId:user.id,
        groupId:groupId,
        role:'admin',
      }
    });

    /** 初期値に戻す */
    dialogProps.value = {
      isOpen:false,
      loading:false,
      servername:'',
      imageFile:[],
    }

    await getServers();
  }

  const getServers = async ():Promise<void> => {
    /** グループ情報を取得する */
    const { data } = await $fetch('/api/group/get-all',{
      method:'POST',
      body: {
        userId: user.id,
      }
    });

    /**
     * グループ情報からid,name,iconUrlを取得する
     * note
     * api側で画像のurlを取得したかったが、storageがcomposableなのでこっちで取得。
     */
    await Promise.all(
      data.map(async (group):Promise<void> => {
        if(group.bucket && group.iconUrl){

          const { data,error }= await storage.from(group.bucket).download(group.iconUrl);

          // エラーの場合はthrowする
          if(error)throw error;

          // filterをかけて2回目以降は必要ないものは追加しない
          if(servers.value.filter(server => server.id === group.id).length === 0){
            servers.value.push({
              id: group.id,
              name: group.name,
              iconUrl: URL.createObjectURL(data)
            })
          }

        }
      }),
    )
  }

  onMounted(async():Promise<void> => {
    await getServers();
    isLoading.value = false;
  });

  return {
    servers,
    isLoading,
    dialogProps,
    clickAddGroup,
    clickBackButton,
    uploadImage,
    clickNextButton,
  };
}
