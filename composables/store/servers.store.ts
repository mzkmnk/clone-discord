import {defineStore} from "pinia";
import type {TServerResponse} from "~/server/api/group/get-all.post";

export type TServer = {id: string,name: string,iconUrl:string,createdAt:Date};

/** ユーザが所属しているサーバの情報を管理する */
export const useServersStore = defineStore('sidebar',() => {

    /** ユーザ情報のstate */
    const { user } = useUserStore();

    /** supabaseのstorage */
    const { storage } = useSupabaseClient();

    /** サーバー情報を取得中のフラグ */
    const isLoadingServerInfo = ref<boolean>(true);

    /** ユーザが所属しているサーバー */
    const servers = ref<TServer[]>([]);

    /** ユーザが選択しているサーバー */
    const selectedServer = ref<string>();

    /** サーバー情報取得中かのフラグをセットする */
    const setIsLoadingServerInfo = ({loading}:{loading:boolean}):void => {
        isLoadingServerInfo.value = loading;
    };

    /** ユーザが所属しているサーバーを取得する */
    const getServers = async ():Promise<void> => {

        /** グループ情報を取得する */
        const response = await $fetch<{data:TServerResponse[]}>('/api/group/get-all',{
            method:'POST',
            body: {
                userId: user.id,
            }
        });

        await setServers({serversResponse:response.data});
    }

    /** サーバー情報をセットする */
    const setServers = async ({serversResponse}:{serversResponse:TServerResponse[]}):Promise<void> => {
        /**
         * グループ情報からid,name,iconUrlを取得する
         */
        await Promise.all(
          serversResponse.map(async (serverResponse):Promise<void> => {
              if(serverResponse.bucket && serverResponse.iconUrl){

                  const { data,error }= await storage.from(serverResponse.bucket).download(serverResponse.iconUrl);

                  // エラーの場合はthrowする
                  if(error)throw error;

                  // filterをかけて2回目以降は必要ないものは追加しない
                  if(servers.value.filter(server => server.id === serverResponse.id).length === 0){
                      servers.value.push({
                          id: serverResponse.id,
                          name: serverResponse.name,
                          iconUrl: URL.createObjectURL(data),
                          createdAt:serverResponse.createdAt,
                      })
                  }

              }
          }),
        );

        servers.value = servers.value.sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    };

    const setSelectedServer = ({serverId}:{serverId?:string}):void => {
        if(serverId === undefined){
            selectedServer.value = servers.value[0].id
            return
        }
        selectedServer.value = serverId;
    };

    /**
     * サーバを作成する
     * @param file
     * @param servername
     */
    const createServer = async  ({file,servername}:{file:any,servername:string}):Promise<void> => {
        const groupId:string = createUUID();
        const imageId:string = createUUID();

        const bucket:string = 'icons/server';

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
                name:servername,
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

        await getServers();
    };

    return {
        isLoadingServerInfo,
        servers,
        selectedServer,
        setSelectedServer,
        setIsLoadingServerInfo,
        getServers,
        setServers,
        createServer,
    };
});
