<script setup lang="ts">

const user = useSupabaseUser();

const { $client } = useNuxtApp();

onMounted(async () => {
  if(user.value){
    await $fetch('/api/user/create', {
      method: "POST",
      body: {
        id: user.value.id,
        fullName: user.value?.user_metadata['full_name'],
        name: user.value?.user_metadata['name'],
        email: user.value?.user_metadata['email'],
      }
    })
  }
  await navigateTo('/dashboard')
})


</script>

<template>
  <div>
    <p>confirm page</p>
  </div>
</template>
