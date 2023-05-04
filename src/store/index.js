import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      token: '',
      //Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJCYXJ5YmlhbnMiLCJhdWQiOiIxIiwiaWF0IjoxMzU2OTk5NTI0LCJuYmYiOjEzNTcwMDAwMDB9.y-s9YVCw-r8F1H66wGE8QZj_lQBsfiqu_XDfMldh1nA
      myId: null,
      mobile: false,
      page: null,
      modal: {
        toggle: false,
        settings: {
          id: '',
          type: '',
          title: '',
          body: '',
          photo: '',
          ok: '',
          cancel: '',
        },
        temp: [],
      },
      edit: false,
      loaded: {
        avatars: false,
        content: false,
        preloader: false,
      },
    }
  },
  getters() {},
  mutations() {},
  actions() {},
  modules() {},
})

export default store
