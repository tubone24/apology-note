<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <logo />
      </div>
      <Header />
      <v-spacer />
      <apology-note />
      <v-spacer />
      <v-container fluid fill-height>
        <v-layout
          wrap
          justify-space-around
          align-center
          align-content-center
          offset-lg2
        >
          <v-flex
            v-for="(apology, index) in apologies"
            :key="apology.id"
            xs12
            sm8
            md6
          >
            <apology-card
              :id="apology.id"
              :index="index"
              :user="apology.user"
              :user-photo-url="apology.userPhotoUrl"
              :apology-note="apology.apologyText"
              :date-time="apology.dateTime"
              :stars="apology.stars"
            />
            <v-spacer />
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Header from '~/components/Header.vue'
import ApologyNote from '~/components/ApologyNote.vue'
import ApologyCard from '~/components/ApologyCard.vue'

export default {
  components: {
    Logo,
    Header,
    ApologyNote,
    ApologyCard,
  },
  data() {
    return {
      apologies: this.$store.getters.getApologies,
    }
  },
  created() {
    this.$store.dispatch('fetchApologies')
  },
}
</script>
