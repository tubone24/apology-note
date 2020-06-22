<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <logo/>
      </div>
      <v-card>
        <v-card-title class="headline">
          反省文書いて成功をやる気スイッチを押す習慣をつけよう！
        </v-card-title>
        <v-card-text>
          <p>
            人間とはよき習慣を身に着けることがとても大変な生き物です。<br/>
            例えば毎日英語学習しようと思っても途中で遊んでしまい、長続きしません。<br/>
            そこで、何もできなかった日に反省文を書くことで自身に罰を与え、継続力を鍛え上げることをサポートするのがこのアプリです。<br/>
            言い訳の前に反省文書いて自分のやる気スイッチを押す習慣をつけよう！
          </p>
          <p>
            自分を破壊する一歩手前の負荷が、自分を強くしてくれる。<br/>
            <small>-ニーチェ</small>
          </p>
          <hr class="my-3"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" @click="login">
            Twitterでログイン
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-spacer/>
      <v-card>
        <p class="title is-1 is-spaced">あなたの名前: {{ $store.getters.getUserName }}</p>
        <v-form ref="form" @submit.prevent="addApology">
          <v-container>
            <v-row>
              <v-col
                cols="48"
                md="12"
              >
                <v-textarea
                  v-model="form.apologyText"
                  :counter="maxApologyTextLen"
                  label="反省文"
                  required
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-card-actions>
          <v-spacer/>
          <v-btn text @click="resetForm">Cancel</v-btn>
          <v-btn
            :disabled="!formIsValid"
            text
            color="secondary"
            type="submit"
            @click="addApology"
          >反省する
          </v-btn>
          <v-progress-circular
            :value="progress"
            class="mr-4"
          ></v-progress-circular>
        </v-card-actions>
      </v-card>
      <v-spacer/>
      <v-data-table
        :headers="headers"
        :items="$store.getters.getApologies"
        item-key="user"
        class="elevation-1"
      >
      </v-data-table>
      <!--      <table class="table is-narrow">-->
      <!--        <thead>-->
      <!--        <tr>-->
      <!--          <th>date</th>-->
      <!--          <th>memo</th>-->
      <!--        </tr>-->
      <!--        </thead>-->
      <!--        <tbody>-->
      <!--        <tr v-for="apology in $store.getters.getApologies" :key="apology.apology">-->
      <!--          <td>{{apology.date}}</td>-->
      <!--          <td>{{apology.apologyText}}</td>-->
      <!--        </tr>-->
      <!--        </tbody>-->
      <!--      </table>-->
    </v-flex>
  </v-layout>
</template>

<script>
  import Logo from '~/components/Logo.vue'

  export default {
    components: {
      Logo,
    },
    data() {
      const maxApologyTextLen = 2000;
      const defaultForm = Object.freeze({
        user: '名無し',
        apologyText: ''
      });
      return {
        maxApologyTextLen,
        form: Object.assign({}, defaultForm),
        headers: [
          {
            text: 'お名前',
            align: 'start',
            sortable: false,
            value: 'user',
          },
          {text: '反省文', value: 'apologyText'},
        ]
      }
    },
    methods: {
      login() {
        console.log('login');
        this.$store.dispatch('login')
      },
      addApology() {
        const apologyText = this.form.apologyText;
        const user = this.$store.getters.getUserName || this.form.user;
        this.$store.dispatch('addApology', {apologyText, user});
        this.resetForm();
      },
      resetForm() {
        this.form = Object.assign({}, this.defaultForm);
        this.$refs.form.reset();
      },
    },
    created() {
      this.$store.dispatch('fetchApologies')
    },
    computed: {
      formIsValid() {
        return (
          this.form.apologyText &&
          this.$store.getters.getUserName
        )
      },
      progress () {
        return this.form.apologyText.length / this.maxApologyTextLen * 100
      },
    },
  }
</script>
