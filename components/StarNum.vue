<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
  <span class="subheading mr-2">{{ stars }}</span>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        text
        small
        fab
        v-bind="attrs"
        v-on="on"
      >
        {{ stars }}
      </v-btn>
<!--      <span class="subheading mr-2">{{ stars }}</span>-->
    </template>
  </v-dialog>
</template>

<script>
export default {
  props: {
    index: Number,
  },
  data() {
    return {
      stars: 0,
    }
  },
  created() {
    this.stars = this.$store.getters.getApologies[this.index].stars.length
    console.log('starNum')
    console.log(this.stars)
  },
  // computed: {
  //   starnum() {
  //     if (
  //       this.$store.getters.getApologies[this.index].stars == null ||
  //       this.$store.getters.getApologies[this.index].stars.length == null
  //     ) {
  //       return 0
  //     }
  //     return this.$store.getters.getApologies[this.index].stars.length
  //   },
  // },
  // watch: {
  //   starnum(values) {
  //     this.$set(this, 'stars', values)
  //     console.log('starNumwatch')
  //     console.log(this.stars)
  //   },
  // },
}
</script>
