<template>
  <div>
    <div class="title">
      <h4>uploaded image</h4>
      <h4>Background Removed Image</h4>
    </div>
    <div class="img-area">
      <div class="input-img">
        <div>
          <img :src="imagePreview" class="uploading-image" />
        </div>

        <v-btn depressed color="primary" class="rmbtn" @click="convertnew()">
          Remove Background
        </v-btn>
      </div>

      <div>
        <input type="file" accept="image/*" @change="previewImage" />
        <div class="drop">Drop Your Image here</div>
      </div>
      <div class="rmpreview">
        <div>
          <img
            :src="'data:image/png;base64,' + users"
            class="uploading-image"
          />
        </div>
        <a class="btn" download :href="'data:image/png;base64,' + users">
          download</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "image-upload-preview",
  data() {
    return {
      image: "",
      imagePreview: "",
      rempreview: "",
    };
  },
  computed: {
    users() {
      return this.$store.state.imgdata;
    },
  },
  methods: {
    previewImage(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },

    convertnew() {
      this.$store.dispatch("convert", this.imagePreview);
    },
    async selectImage(e) {
      const file = e;
      if (!file) return;
      const readData = (f) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(f);
        });

      const data = await readData(file);

      this.imagePreview = data;
    },
    async clearImagePreview() {
      this.imagePreview = "";
    },
  },
};
</script>

<style>
.file-input {
  width: 300px;
  margin: 0 auto;
  margin-top: 40px;
}
input[type="file"] {
  width: 350px;
  height: 350px;
  position: absolute;
  opacity: 0;
}
.down {
  transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
}
.drop {
  border: 2px dashed black;

  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  display: flex;
  width: 350px;
  height: 350px;
}
.download {
  float: right;

  margin-top: 50px;
}

.uploading-image {
  height: 350px;
  width: 350px;
  border: none;
  border: 2px solid black;
}

.operation {
  margin-top: 40px;
  margin-left: 43%;
}

.rmpreview {
  float: right;
}
.img-area {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.title {
  display: flex;
  justify-content: space-between;
}
.btn {
  padding: 10px;
  background-color: lightgrey;
  text-decoration: none;
  color: white;
  margin-bottom: 200px;
  float: right;
  margin-right: 20px;
  margin-top: 50px;
}
.input-img {
  display: flex;
  flex-direction: column;
  gap: 50px;
}
</style>
