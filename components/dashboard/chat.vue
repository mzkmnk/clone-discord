<script lang="ts" setup>

import {format} from "date-fns";

const chats: {
  user: {
    id: string;
    username: string;
  };
  message: string;
  createdAt: Date;
}[] = [
  {
    user: { id: "u1", username: "Alice" },
    message: "じゃあフレームワークの選定基準を整理してみましょうか？",
    createdAt: new Date("2024-11-23T10:12:00"),
  },
  {
    user: { id: "u2", username: "Bob" },
    message: "そうですね。まずはチームの経験値を考慮するのが一番重要ですね。",
    createdAt: new Date("2024-11-23T10:12:45"),
  },
  {
    user: { id: "u3", username: "Charlie" },
    message: "確かに。Reactの経験者が多いならReactが有利ですし、Vueの方が親しみやすい人が多いならVueですよね。",
    createdAt: new Date("2024-11-23T10:13:15"),
  },
  {
    user: { id: "u1", username: "Alice" },
    message: "それから、プロジェクトの規模感も影響しますよね。大規模ならReactが安定しそうだけど。",
    createdAt: new Date("2024-11-23T10:14:00"),
  },
  {
    user: { id: "u2", username: "Bob" },
    message: "小規模ならVueかSvelteで軽量な選択肢が良いかもしれませんね。",
    createdAt: new Date("2024-11-23T10:14:30"),
  },
  {
    user: { id: "u3", username: "Charlie" },
    message: "ライブラリやプラグインの充実度も確認したいです。Reactは圧倒的に多い印象がありますね。",
    createdAt: new Date("2024-11-23T10:15:15"),
  },
  {
    user: { id: "u1", username: "Alice" },
    message: "Vueも公式プラグインが豊富ですよね。最近はVue CLIよりもViteが主流みたいですが。",
    createdAt: new Date("2024-11-23T10:16:00"),
  },
  {
    user: { id: "u2", username: "Bob" },
    message: "そうそう。ViteはReactもVueも対応しているのでどちらでも快適に使えますね。",
    createdAt: new Date("2024-11-23T10:16:30"),
  },
  {
    user: { id: "u3", username: "Charlie" },
    message: "あと、最近流行っているフロントエンドのフルスタックフレームワークも気になりますね。",
    createdAt: new Date("2024-11-23T10:17:00"),
  },
  {
    user: { id: "u1", username: "Alice" },
    message: "それで言うと、Next.jsやNuxtも検討に入れるべきかもしれませんね。",
    createdAt: new Date("2024-11-23T10:17:30"),
  },
  {
    user: { id: "u2", username: "Bob" },
    message: "SSRを導入するならその2つは有力候補ですね。NuxtはVueベースだから直感的に使えそう。",
    createdAt: new Date("2024-11-23T10:18:15"),
  },
  {
    user: { id: "u3", username: "Charlie" },
    message: "でも、Reactを選ぶならNext.js一択ですね。機能が揃いすぎている感じがします。",
    createdAt: new Date("2024-11-23T10:18:45"),
  },
  {
    user: { id: "u1", username: "Alice" },
    message: "それから、静的サイト生成も需要があるなら選択肢が変わってきそう。",
    createdAt: new Date("2024-11-23T10:19:15"),
  },
  {
    user: { id: "u2", username: "Bob" },
    message: "Jamstackを採用するならSvelteKitも候補に入れたいですね。",
    createdAt: new Date("2024-11-23T10:20:00"),
  },
  {
    user: { id: "u3", username: "Charlie" },
    message: "でも、採用後の学習コストも考えると、ReactかVueのどちらかが最適な気もします。",
    createdAt: new Date("2024-11-23T10:20:30"),
  },
  {
    user: { id: "u1", username: "Alice" },
    message: "たしかに。新しいフレームワークだとドキュメントや情報量の少なさがネックになりますね。",
    createdAt: new Date("2024-11-23T10:21:00"),
  },
  {
    user: { id: "u2", username: "Bob" },
    message: "ところで、UIコンポーネントライブラリは何を使う予定ですか？",
    createdAt: new Date("2024-11-23T10:21:45"),
  },
  {
    user: { id: "u3", username: "Charlie" },
    message: "ReactならMaterial-UIかChakra UI、VueならVuetifyかPrimeVueを検討中です。",
    createdAt: new Date("2024-11-23T10:22:15"),
  },
  {
    user: { id: "u1", username: "Alice" },
    message: "UIの統一感を考えると、フレームワークに特化したライブラリが便利ですよね。",
    createdAt: new Date("2024-11-23T10:23:00"),
  },
  {
    user: { id: "u2", username: "Bob" },
    message: "あと、プロジェクトの将来的なスケーラビリティも意識したいですね。",
    createdAt: new Date("2024-11-23T10:23:45"),
  },
  {
    user: { id: "u3", username: "Charlie" },
    message: "それを考えるとReactは堅実な選択肢かもしれません。大規模プロジェクトでの採用例も多いですし。",
    createdAt: new Date("2024-11-23T10:24:15"),
  },
  {
    user: { id: "u1", username: "Alice" },
    message: "Vueも最近は企業の採用実績が増えていますね。3系に完全移行したのが大きいです。",
    createdAt: new Date("2024-11-23T10:24:45"),
  },
  {
    user: { id: "u2", username: "Bob" },
    message: "個人的にはVueの可読性が高いコードが好きですけど、チームの意見も聞きたいですね。",
    createdAt: new Date("2024-11-23T10:25:30"),
  },
  {
    user: { id: "u3", username: "Charlie" },
    message: "Reactは学習曲線が少し急ですが、覚えればどのプロジェクトにも適用しやすいです。",
    createdAt: new Date("2024-11-23T10:26:00"),
  },
  {
    user: { id: "u1", username: "Alice" },
    message: "ちなみにバックエンドとの連携はどうする予定ですか？",
    createdAt: new Date("2024-11-23T10:26:30"),
  },
  {
    user: { id: "u2", username: "Bob" },
    message: "それも大事ですね。ReactやVueならAPIの設計には問題なく対応できると思います。",
    createdAt: new Date("2024-11-23T10:27:00"),
  },
  {
    user: { id: "u3", username: "Charlie" },
    message: "最近はGraphQLを使うプロジェクトも多いですが、REST APIとの親和性も見ておきたいですね。",
    createdAt: new Date("2024-11-23T10:27:45"),
  },
  {
    user: {id: "u1", username: "Alice"},
    message: "それならApolloやURQLを使えばReactでもVueでも対応できますね。",
    createdAt: new Date("2024-11-23T14:28:00")
  }
]

/** 最下部に自動でスクロールする */
const scrollToBottom = ():void => { // todo あとで使う
  const chatsRef = useTemplateRef('chats');

  console.log(chatsRef.value?.scrollHeight);
  if (chatsRef.value) {
    chatsRef.value.scrollTop = chatsRef.value.scrollHeight;
  }
};

</script>

<template>
  <div ref="chats" class="container h-full">
      <div class="flex flex-col gap-1 py-2">
        <div v-for="chat of chats" class="flex items-center gap-4 hover:bg-gray-100 p-2">
          <div class="rounded-full bg-red-500 w-16 h-16 flex items-center justify-center">
            <Icon
                class="bg-white"
                name="ic:baseline-discord"
                size="30"
            />
          </div>
          <div class="flex flex-col gap-1">
            <div class="flex gap-2 items-center">
              <p class="font-semibold text-lg">{{chat.user.username}}</p>
              <p class="text-slate-400 text-sm">{{format(chat.createdAt,'yyyy-MM-dd HH:mm')}}</p>
            </div>
            <p class="text-lg text-gray-800">{{chat.message}}</p>
          </div>
        </div>
      </div>
  </div>
</template>
