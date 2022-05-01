<template>
  <div class="stickers opa" ref="stickers">
    <div class="tabs_title_container" id="tabs" @wheel.prevent="wheel" ref="tabs_title">
      <div class="tabs_title">
        <span class="stickers_title" v-for="(sticker, index) of stickers" :key="`stickers-title${sticker.pack}`" :class="{ active: active == index }" :data-stickers-title="sticker.pack" @mouseup="toggleActive(index)">
                      <img
                        :src="`${this.content}/stickers/${sticker.pack}/${sticker.icon}.png`"
                        alt="sticker"
                        height="30"
                    /></span>
      </div>
    </div>
    <div class="tabs_content_container" ref="tabs_content">
      <div :data-index="index" v-touch="swipe" class="tabs_content" v-for="(sticker, index) of stickers" :key="`stickers-pack${sticker.pack}`" :class="{ active: active == index }" :data-stickers-pack="sticker.pack">
        <img v-for="n in sticker.amount" class="sticker-preview" :src="`${this.content}/stickers/${sticker.pack}/${n}.png`" :key="`sticker-${n}`" alt="sticker" height="85" :data-sticker="n" @click="$emit('sticker', {'pack': sticker.pack, 'sticker': n})" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        stickers: {},
        active: "",
      };
    },
    methods: {
      fetchStickers() {
        this.axios.get("/stickers").then((res) => {
          this.stickers = res.data;
          if (this.$refs.stickers) {
            this.$refs.stickers.classList.remove("opa");
          }
          //console.log(this.stickers);
        });
      },
      toggleActive(i) {
        this.active = i;
        //console.log(this.active);
      },
      wheel(e) {
        /* eslint-disable */
        if (String(e.deltaY).match(/\-/)) this.$refs.tabs_title.scrollLeft -= 30;
        else this.$refs.tabs_title.scrollLeft += 30;
      },
      swipe(touch) {
        const len = this.stickers.length - 1;
        //console.log(touch.startX, touch.endX)
        if (touch.endX - touch.startX > 30) {
          //touch.endX < touch.startX
          console.log("Swiped Left");
          if (this.active == len) this.active = 0;
          else this.active++;
        }
        if (touch.startX - touch.endX > 30) {
          //touch.endX > touch.startX
          console.log("Swiped Right");
          if (this.active == 0) this.active = len;
          else this.active--;
        }
  
        document.querySelector(".tabs_title_container").scrollTo({
          left: document.querySelector("span.active").offsetLeft -
            document.querySelector("span.active").parentNode.offsetLeft,
          top: 0,
          behavior: "smooth",
        });
      },
    },
    mounted() {
      this.active = "0";
      this.fetchStickers();
    },
  };
</script>

<style lang="scss" scoped>
  .opa {
    opacity: 0;
  }
  
  .stickers {
    text-align: center;
    height: 14em;
    min-width: 15em;
    max-width: 35em;
    z-index: 5555;
    position: relative;
    border-radius: 0.25rem;
    background: var(--primary);
    margin-left: auto;
    margin-right: 0;
    font-size: 14pt;
  }
  
  .stickers {
    position: absolute!important;
    // right: 0;
    // margin-top: -14em;
    right: 0;
  }
  
  .stickers::-webkit-scrollbar {
    width: 0px;
  }
  
  @media (max-height: 300px) {
    .stickers {
      height: 60vh;
    }
  }
  
  @media (max-width: 700px) {
    .stickers {
      max-width: 100vw;
    }
  }
  
  @media screen and (max-width: 926px) {
    .stickers {
      margin-top: 0;
    }
  }
  
  .tabs_title {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    list-style: none;
  }
  
  .tabs_title span:last-child:before {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    right: -2px;
    z-index: -1;
    height: 5px;
  }
  
  .tabs_title:after {
    content: "";
    display: table;
    clear: both;
  }
  
  .tabs_title span {
    padding: 5px 10px;
    margin: 1px 0 0 1px;
    background: var(--foreground);
    color: var(--background);
    position: relative;
    border-width: 2px 2px 0;
    border-radius: 5px 5px 0 0;
    text-align: center;
    display: inline-block;
    top: 2px;
    z-index: 999;
  }
  
  .tabs_title span:not(.active),
  .tabs_content>img {
    cursor: pointer;
  }
  
  .tabs_title .active {
    background: var(--background);
    color: var(--text);
    top: 0;
  }
  
  .tabs_title .active:after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    right: 0;
    height: 5px;
    background: var(--background);
  }
  
  .tabs_content {
    display: none;
    background: var(--background);
    border: 2px solid var(--primary);
    border-top-color: var(--background);
    overflow: auto;
    height: 83%;
  }
  
  .tabs_content.active {
    display: block;
  }
  
  .tabs_title {
    display: inline-block;
    background: transparent;
  }
  
  .tabs_title_container {
    background: transparent;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
  }
  
  .tabs_content_container {
    display: inline;
  }
  
  .tabs_content::-webkit-scrollbar {
    width: 0px;
  }
  
  .tabs_title_container::-webkit-scrollbar,
  .users::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  
  .tabs_title_container,
  .tabs_content,
  .users {
    scrollbar-width: none;
  }
</style>
