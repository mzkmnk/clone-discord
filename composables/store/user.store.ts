import {defineStore} from "pinia";

export const useUserStore = defineStore('user',() => {
    const user = ref<{id:string,name:string,fullName:string}>({
        id: '',
        name:'',
        fullName:'',
    });

    const setUser = ({id,name,fullName}:{id:string,name:string,fullName:string}):void => {
        user.value = {
            id,
            name,
            fullName,
        }
    };

    return {user,setUser}
});
