import {useUserStore} from "~/composables/store/user.store";

export default defineNuxtPlugin(() => {
    const user = useSupabaseUser();

    if(user.value){
        const { setUser } = useUserStore();
        setUser({
            id:user.value.id,
            name:user.value.user_metadata['name'],
            fullName:user.value.user_metadata['full_name'],
        });
    }
});
