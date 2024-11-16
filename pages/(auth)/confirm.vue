<script setup lang="ts">

const user = useSupabaseUser();

watchEffect(() => {
  console.dir(user.value,{depth:null});
  navigateTo('/dashboard')
})
</script>

<template>
  <div>
    <p>confirm page</p>
  </div>
</template>
