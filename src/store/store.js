import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    imgdata: "",
  },
  mutations: {
    setimg(state, img) {
        console.log("in mutate")
      state.imgdata = img;
    },
  },
  actions: {
    convert({ commit }, imagePreview) {
      const formData = new FormData();
      formData.append("size", "auto");
      formData.append("image_file_b64", imagePreview);

      axios({
        method: "post",
        url: "https://api.remove.bg/v1.0/removebg",
        data: formData,
        responseType: "arraybuffer",

        headers: {
          "X-Width": 250,

          "Content-Type": "application/json",
          "X-Api-Key": "ER4qAKp6Rmqh9QBQZFkevu7C",
        },
        encoding: null,
      })
        .then((response) => {
          var base64 = btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          console.log(base64);
          commit("setimg", base64);
        })
        .catch((error) => {
          return console.error("Request failed:", error);
        });
    },
  },
});
