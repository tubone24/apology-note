<template>
  <v-card>
    <v-form ref="form" @submit.prevent="addApology">
      <v-container>
        <v-row>
          <v-col cols="48" md="12">
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
      <v-spacer />
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            :src="$store.getters.getUserPhotoUrl"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            {{ $store.getters.getUserName }}
          </v-list-item-title>
        </v-list-item-content>

        <v-row align="center" justify="end">
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
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from 'moment'
export default {
  components: {},
  data() {
    const maxApologyTextLen = 2000
    const defaultForm = Object.freeze({
      user: '名無し',
      apologyText: '',
    })
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
        { text: '反省文', value: 'apologyText' },
      ],
    }
  },
  computed: {
    formIsValid() {
      return this.form.apologyText && this.$store.getters.getUserName
    },
    progress() {
      return (this.form.apologyText.length / this.maxApologyTextLen) * 100
    },
  },
  methods: {
    addApology() {
      const apologyText = this.form.apologyText
      const user = this.$store.getters.getUserName || this.form.user
      const userPhotoUrl = this.$store.getters.getUserPhotoUrl
      const dateTime = moment().format('YYYY-MM-DD hh:mm:ss')
      this.$store.dispatch('addApology', { apologyText, user, userPhotoUrl, dateTime })
      this.resetForm()
      // this.$store.dispatch('fetchApologies')
    },
    resetForm() {
      this.form.apologyText = ''
    },
  },
}
</script>
