<template>
  <v-card>
    <v-card-title class="headline">
      反省文書いて成功をやる気スイッチを押す習慣をつけよう！
    </v-card-title>
    <v-card-text>
      <p>
        人間とはよき習慣を身に着けることがとても大変な生き物です。<br />
        例えば毎日英語学習しようと思っても途中で遊んでしまい、長続きしません。<br />
        そこで、何もできなかった日に反省文を書くことで自身に罰を与え、継続力を鍛え上げることをサポートするのがこのアプリです。<br />
        言い訳の前に反省文書いて自分のやる気スイッチを押す習慣をつけよう！
      </p>
      <v-card-subtitle>
        自分を破壊する一歩手前の負荷が、自分を強くしてくれる。<br />
        <small>-ニーチェ</small>
      </v-card-subtitle>
      <hr class="my-3" />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" @click="login">
        Twitterでログイン
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  methods: {
    login() {
      console.log('login')
      this.$store.dispatch('login')
    },
  },
}
</script>
