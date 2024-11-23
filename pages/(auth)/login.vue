<script lang="ts" setup>
const { auth } = useSupabaseClient()

const login = async () => {
  await auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/confirm`,
    },
  });
}



</script>

<template>
  <div class="flex h-screen w-screen flex-col items-center justify-center gap-6">
    <p class="text-5xl font-semibold tracking-wider">
      Hello!
    </p>
    <!-- このボタンhtml上ダメかも -->
    <button
      class="rounded-2xl border border-slate-300 px-5 py-2 duration-200 hover:border-slate-500"
      @click="login"
    >
      <div class="flex items-center gap-2">
        <Icon
          name="logos:google-icon"
          size="18"
        />
        Log in with Google
      </div>
    </button>
  </div>
</template>
