<script lang="ts" setup>

const user = useSupabaseUser();

watch(user, async () => {
  if (user.value) {
    try {
      await $fetch('/api/user/create', {
        method: "POST",
        body: {
          id: user.value.id,
          fullName: user.value?.user_metadata['full_name'],
          name: user.value?.user_metadata['name'],
          email: user.value?.user_metadata['email'],
        }
      })
    }catch (error){
      console.log(error)
    }finally {
      navigateTo('/dashboard')
    }
  }
}, { immediate: true })


</script>

<template>
  <div>
    <p>confirm page</p>
  </div>
</template>
