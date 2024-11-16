<script setup lang="ts">
const { auth } = useSupabaseClient()

const login = async () => {
  await auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/confirm',
    },
  })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-6 w-screen h-screen">
    <p class="text-5xl font-semibold tracking-wider">
      Hello!
    </p>
    <!-- このボタンhtml上ダメかも -->
    <button
      class="border border-slate-300 hover:border-slate-500 duration-200 rounded-2xl px-5 py-2"
      @click="login"
    >
      <div class="flex gap-2 items-center">
        <Icon
          name="logos:google-icon"
          size="18"
        />
        Log in with Google
      </div>
    </button>
  </div>
</template>
