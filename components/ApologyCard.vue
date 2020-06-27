<template>
  <v-card
    :color="this.$store.getters.getApologies[this.index].color"
    dark
  >
    <v-card-title>
      <v-icon large left>
        mdi-emoticon-dead
      </v-icon>
      <span class="title font-weight-light">反省！</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      {{ this.$store.getters.getApologies[this.index].apologyText }}
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar size="30" color="grey darken-3">
          <v-img class="elevation-6" :src="this.$store.getters.getApologies[this.index].userPhotoUrl"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{
            this.$store.getters.getApologies[this.index].user
          }}</v-list-item-title>
        </v-list-item-content>

        <v-spacer />
        <v-row align="center" justify="end">
          <v-btn
            v-if="!rerender"
            class="ma-2"
            text
            icon
            color="yellow lighten-2"
            :disabled="!canStar"
            @click="addStar"
          >
            <v-icon class="mr-0">mdi-star</v-icon>
          </v-btn>
          <div class="subheading ml-n6">
            <star-num v-if="!rerender" :index="index" />
          </div>
        </v-row>
        <v-row align="center" justify="end">
          <v-icon class="mr-1">mdi-share-variant</v-icon>
        </v-row>
        <v-row align="center" justify="end">
          <v-icon class="mr-1" small>mdi-calendar-clock</v-icon>
          <span class="subheading mr-2" style="font-size: x-small;">{{
            this.$store.getters.getApologies[this.index].dateTime
          }}</span>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
import StarNum from '~/components/StarNum.vue'
export default {
  components: {
    StarNum,
  },
  data() {
    return {
      rerender: 0,
    }
  },
  props: {
    id: String,
    index: Number,
  },
  computed: {
    canStar() {
      return !!this.$store.getters.getUserUid
    },
  },
  methods: {
    addStar() {
      this.rerender = 1
      this.$emit('addStar', this.index)
      setTimeout(() => {
        this.rerender = 0
      }, 1000)
    },
  },
}
</script>
