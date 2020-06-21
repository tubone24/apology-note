<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <logo/>
        <vuetify-logo/>
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
          <p>
            Vuetify is a progressive Material Design component framework for
            Vue.js. It was designed to empower developers to create amazing
            applications.
          </p>
          <p class="title is-1 is-spaced">user: {{ $store.getters.getUserName }}</p>
          <hr class="my-3"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" @click="login">
            Twitterでログイン
          </v-btn>
        </v-card-actions>
      </v-card>
      <!--      <v-data-table-->
      <!--        v-model="selected"-->
      <!--        :headers="headers"-->
      <!--        :items="desserts"-->
      <!--        :single-select="singleSelect"-->
      <!--        item-key="name"-->
      <!--        show-select-->
      <!--        class="elevation-1"-->
      <!--      >-->
      <!--        <template v-slot:top>-->
      <!--          <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>-->
      <!--        </template>-->
      <!--      </v-data-table>-->
      <table class="table is-narrow">
        <thead>
        <tr>
          <th>date</th>
          <th>memo</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="apology in $store.getters.getApologies" :key="apology.apology">
          <td>{{apology.date}}</td>
          <td>{{apology.apologyText}}</td>
        </tr>
        </tbody>
      </table>
    </v-flex>
  </v-layout>
</template>

<script>
  import Logo from '~/components/Logo.vue'
  import VuetifyLogo from '~/components/VuetifyLogo.vue'

  export default {
    components: {
      Logo,
      VuetifyLogo,
    },
    data() {
      return {
        headers: [
          {
            text: 'date',
            align: 'start',
            sortable: false,
            value: 'date',
          },
          {text: 'memo', value: 'apologyText'},
        ]
      }
    },
    methods: {
      login() {
        console.log('login')
        this.$store.dispatch('login')
      }
    },
    created() {
      this.$store.dispatch('fetchApologies')
    }
  }
</script>
