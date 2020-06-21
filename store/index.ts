import firebase from '~/plugins/firebase'

const db = firebase.firestore();
const apologyRef = db.collection('apologies');

export const state = () => ({
  userUid: '',
  userName: '',
  apologies: []
});

export const mutations = {
  setUserUid(state, userUid) {
    state.userUid = userUid
  },
  setUserName(state, userName) {
    state.userName = userName
  },
  addApology(state, apology) {
    state.apologies.push(apology)
  }
};

export const actions = {
  login({commit}) {
    console.log('login action');
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
      const user = result.user;
      console.log('success : ' + user.uid + ' : ' + user.displayName);
      commit('setUserUid', user.uid);
      commit('setUserName', user.displayName)
    }).catch(function (error) {
      var errorCode = error.code;
      console.log('error : ' + errorCode)
    });
  },
  fetchApologies({commit}) {
    apologyRef
      .get()
      .then(res => {
        res.forEach((doc) => {
          console.log('success : ' + `${doc.id} => ${doc.data()}`);
          commit('addApology', doc.data())
        })
      })
      .catch(error => {
        console.log('error : ' + error)
      })
  }
}

export const getters = {
  getUserUid(state) {
    return state.userUid
  },
  getUserName(state) {
    return state.userName
  },
  getApologies(state) {
    console.log(state.apologies)
    return state.apologies
  }
}
