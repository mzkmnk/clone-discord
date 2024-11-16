<script setup lang="ts">

const user = useSupabaseUser();

watchEffect(() => {
  console.log('user.value:confirm',user.value);
  navigateTo('/dashboard');
});

</script>
<template>
  <div>
    <p>confirm page</p>
  </div>
</template>
