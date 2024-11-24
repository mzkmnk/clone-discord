<script lang="ts" setup>

const supabase = useSupabaseClient();

const login = async () => {
  const {error}= await supabase.auth.signInWithOAuth({
    provider: 'google',
    options:{
      redirectTo:window.location.origin + '/confirm',
    }
  });

  if(error) throw error;
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
