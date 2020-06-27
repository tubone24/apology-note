<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-dialog v-model="dialog" width="500">
<!--    <span class="subheading mr-2">{{ stars }}</span> いいね！-->
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        {{ stars }} いいね！
      </v-card-title>
      <v-list-item-avatar size="30" color="grey darken-3">
        <v-img
          class="elevation-6"
          :src="this.$store.getters.getApologies[this.index].userPhotoUrl"
        ></v-img>
      </v-list-item-avatar>
    </v-card>
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
      userPhotos: [],
    }
  },
  created() {
    this.stars = this.$store.getters.getApologies[this.index].stars.length
    const starUserList = this.$store.getters.getApologies[this.index].stars
    console.log('userList')
    console.log(starUserList)
    const userPhotos = []
    for (const user in this.$store.getters.getUsers) {
      userPhotos.push(user)
    }
    console.log(userPhotos)
  },
}
</script>
