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
              :color="apology.color"
              @addStar="addStar"
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
  computed: {
    apologies() {
      return this.$store.getters.getApologies
    },
  },
  created() {
    this.$store.dispatch('fetchApologies')
  },
  mounted() {
    this.$store.subscribeAction((action, state) => {
      if (action.type === 'addStar') {
        console.log('change addStar', state)
      }
    })
  },
  methods: {
    addStar(index) {
      console.log('addStar')
      const userId = this.$store.getters.getUserUid
      const newStar = this.$store.getters.getApologies[index].stars.slice()
      newStar.push(userId)
      const newStarSet = Array.from(new Set(newStar))
      this.$store.dispatch('addStar', {
        apologyId: this.$store.getters.getApologies[index].id,
        apologyText: this.$store.getters.getApologies[index].apologyText,
        dateTime: this.$store.getters.getApologies[index].dateTime,
        user: this.$store.getters.getApologies[index].user,
        userPhotoUrl: this.$store.getters.getApologies[index].userPhotoUrl,
        stars: newStarSet,
        index,
      })
      // this.$store.dispatch('fetchApologies')
    },
  },
}
</script>
