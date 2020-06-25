import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const apologyRef = db.collection('apologies')
const usersRef = db.collection('users')

export const state = () => ({
  userUid: '',
  userName: '',
  userPhotoUrl: '',
  apologies: [],
})

export const mutations = {
  setUserUid(state, userUid) {
    state.userUid = userUid
  },
  setUserName(state, userName) {
    state.userName = userName
  },
  setUserPhotoUrl(state, userPhotoUrl) {
    state.userPhotoUrl = userPhotoUrl
  },
  addApology(state, apology) {
    state.apologies.push(apology)
  },
  changeApology(state, apology, index) {
    console.log('chage apology')
    console.log(apology)
    state.apologies[index] = {
      apologyText: apology.apologyText,
      dateTime: apology.dateTime,
      id: apology.apologyId,
      user: apology.user,
      userPhotoUrl: apology.userPhotoUrl,
      stars: apology.stars,
    }
  },
  clearApology(state) {
    state.apologies = []
  },
}

export const actions = {
  login({ commit }) {
    console.log('login action')
    const provider = new firebase.auth.TwitterAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        const user = result.user
        // eslint-disable-next-line no-console
        console.log('success : ' + user.uid + ' : ' + user.displayName)
        commit('setUserUid', user.uid)
        commit('setUserName', user.displayName)
        commit('setUserPhotoUrl', user.photoURL.replace('_normal', ''))
        usersRef
          .doc(user.uid)
          .set({
            name: user.displayName,
            userPhotoUrl: user.photoURL.replace('_normal', ''),
          })
          .catch(function (error) {
            const errorCode = error.code
            console.log('error : ' + errorCode)
          })
      })
      .catch(function (error) {
        const errorCode = error.code
        console.log('error : ' + errorCode)
    });
  },
  fetchApologies({ commit }) {
    commit('clearApology')
    apologyRef
      .get()
      .then((res) => {
        res.forEach((doc) => {
          console.log('success : ' + `${doc.id} => ${doc.data()}`)
          const data = doc.data()
          data.id = doc.id
          commit('addApology', data)
        })
      })
      .catch(error => {
        console.log('error : ' + error)
      })
  },
  addApology({ commit }, apology) {
    console.log(apology);
    apologyRef
      .add({
        user: apology.user,
        userPhotoUrl: apology.userPhotoUrl,
        apologyText: apology.apologyText,
        dateTime: apology.dateTime,
      })
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id)
        commit('addApology', apology)
      })
      .catch(function (error) {
        console.error('Error adding document: ', error)
      })
  },
  addStar({ commit }, params) {
    console.log("aaaa addstar")
    console.log(params)
    apologyRef
      .doc(params.apologyId)
      .set(
        {
          stars: params.stars,
        },
        { merge: true }
      )
      .then(function () {
        console.log('change')
        commit('changeApology', params, params.index)
      })
      .catch(function (error) {
        console.error('Error adding star: ', error)
      })
  },
}

export const getters = {
  getUserUid(state) {
    return state.userUid
  },
  getUserName(state) {
    return state.userName
  },
  getUserPhotoUrl(state) {
    return state.userPhotoUrl
  },
  getApologies(state) {
    console.log(state.apologies)
    return state.apologies
  },
}
