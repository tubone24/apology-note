<template>
  <v-card :color="randomColor" dark>
    <v-card-title>
      <v-icon large left>
        mdi-emoticon-dead
      </v-icon>
      <span class="title font-weight-light">反省！</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      {{ apologyNote }}
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img class="elevation-6" :src="userPhotoUrl"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ user }}</v-list-item-title>
        </v-list-item-content>

        <v-spacer />
        <v-row align="center" justify="end">
          <v-btn class="ma-2" text icon color="yellow lighten-2" :disabled="!canStar" @click="addStar">
            <v-icon class="mr-1">mdi-star</v-icon>
          </v-btn>
          <span class="subheading mr-2">{{ stars.length }}</span>
        </v-row>
        <v-row align="center" justify="end">
          <v-icon class="mr-1">mdi-share-variant</v-icon>
        </v-row>
        <v-row align="center" justify="end">
          <v-icon class="mr-1">mdi-calendar-clock</v-icon>
          <span class="subheading mr-2">{{ dateTime }}</span>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    const rangeRndm = (min, max) => {
      if (max) {
        return (Math.random() * (max - min + 1) + min) | 0
      } else {
        return (Math.random() * min) | 0
      }
    }
    const randomColor =
      'hsl(' + rangeRndm(0, 360) + ', 100%, ' + rangeRndm(25, 75) + '%)'
    return {
      randomColor,
    }
  },
  props: {
    id: String,
    index: Number,
    user: String,
    userPhotoUrl: String,
    apologyNote: String,
    dateTime: String,
    stars: [],
  },
  computed: {
    canStar() {
      console.log("canStar")
      return !!this.$store.getters.getUserUid
    },
  },
  methods: {
    addStar() {
      console.log("addStar")
      const userId = this.$store.getters.getUserUid
      const stars = this.stars
      const index = this.index
      //stars.push(userId)
      this.stars.push(userId)
      console.log(stars)
      const apologyId = this.id
      console.log("dispatchaddStar")
      this.$store.dispatch('addStar', { apologyId, stars, index })
    },
  },
}
</script>
