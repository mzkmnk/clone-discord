import {defineStore} from "pinia";

/** 選択されたアイテムを保存する */
export const useSidebarStore = defineStore('sidebar',() => {

    const selectedItem = ref<string|null>(null);

    function setSelectedItem({item}:{item:string}): void {
        selectedItem.value = item;
    }

    return { selectedItem, setSelectedItem };
});
