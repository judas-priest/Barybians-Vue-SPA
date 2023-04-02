<template>
  <div class="media dialog-item" :data-message="dialog.lastMessage.messageId">
    <div class="media-body">
      <router-link
        class="dialog-author"
        :to="!$store.state.edit ? `/profile/id${dialog.secondUser.userId}` : ''"
        :data-author="dialog.secondUser.userId"
      >
        <AvatarMin
          style="
            height: 55px !important;
            width: 55px !important;
            vertical-align: unset;
          "
          :userId="dialog.secondUser.userId"
          :lastVisit="dialog.secondUser.lastVisit"
          :photo="dialog.secondUser.photo128"
        />
      </router-link>
      <router-link
        style="flex: 1"
        :to="
          !$store.state.edit ? `/messages/id${dialog.secondUser.userId}` : ''
        "
      >
        <div style="display: inline-block; margin-left: 5px; width: 100%">
          <div class="media-heading">
            <router-link
              class="dialog-author"
              :to="
                !$store.state.edit
                  ? `/profile/id${dialog.secondUser.userId}`
                  : ''
              "
              :data-author="dialog.secondUser.userId"
            >
              <div class="dialogist" v-if="dialog.secondUser.userId != myId">
                {{
                  `${dialog.secondUser.firstName} ${dialog.secondUser.lastName}`
                }}
              </div>
              <div class="dialogist" v-else>Я</div>
            </router-link>
          </div>
          <div
            class="container-message"
            :class="
              dialog.lastMessage.senderId === myId ? 'sended' : 'received'
            "
          >
            <div
              class="last-message text-justify"
              :class="{ unread: dialog.lastMessage.unread }"
            >
              <span>{{
                dialog.lastMessage.senderId === myId
                  ? "Я"
                  : dialog.secondUser.sex === "male"
                  ? "Он"
                  : "Она"
              }}</span
              >:
              <span
                class="message-text"
                v-html="parse(dialog.lastMessage)"
              ></span>
            </div>
            <span
              v-if="
                dialog.lastMessage.senderId !== myId &&
                dialog.lastMessage.unread === 1
              "
              class="unread-counter"
              >{{ dialog.unreadCount }}</span
            >
          </div>
          <span class="time">{{ timeName(dialog.lastMessage.time) }}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import {
  timeName,
  parserDialog,
  strip_tags,
  Emoji,
} from "@/../public/js/func.js"
import AvatarMin from "@/components/AvatarMin.vue"
export default {
  data() {
    return {
      myId: this.$store.state.myId,
    }
  },
  components: {
    AvatarMin,
  },
  props: ["dialog"],
  methods: {
    parserDialog: parserDialog,
    timeName: timeName,
    strip_tags: strip_tags,
    Emoji: Emoji,
    parse(msg) {
      var text = msg.text
      if (msg.attachments !== null && msg.attachments !== undefined) {
        text = this.parserDialog(text, msg.attachments)
      } else {
        text = this.strip_tags(text)
      }
      text = this.Emoji(text)
      var sliced = text.slice(0, 120)
      if (sliced.length < text.length) {
        text = sliced
        text += "..."
      }
      return text
    },
  },
}
</script>

<style lang="scss" scoped>
.media-body .dialogist {
  display: inline-block;
  font-size: 1rem;
  color: var(--text);
  font-weight: 700;
}

.dialogist {
  margin-top: -10px;
}

.media {
  margin-bottom: 6pt;
  display: flex;
}

.dialog-item {
  background-color: var(--block-bg);
  border-radius: 6pt;
}

.dialog-item:hover {
  background-color: var(--hover);
}

.media-body {
  margin-top: 5px;
  margin-left: 0.5rem;
  font-size: 0.8125rem;
  display: flex;
  width: 100%;
}

.last-message {
  color: var(--text);
  text-decoration: none;
  display: inline-block;
  word-break: break-word;
  margin-bottom: auto;
  margin-top: auto;
}

/*.time{
                              color: #787878;
                              float: right;
                              font-size: 0.7em;
                              margin: auto;
                              right: 0;
                              }*/

.time {
  color: var(--block-time);
  font-size: 0.7em;
  right: 0;
  display: block;
  float: none;
  text-align: justify !important;
  margin: 0;
}

.container-message {
  display: flex;
  margin-bottom: 0.25rem;
}

.unread-counter {
  margin: 10pt;
  margin-left: auto;
  left: 0;
  //color: var(--g); //?
  //background-color: var(--foreground);
  border-radius: 50%;
  text-align: center;
  padding: 0 3px 0 3px;
  height: 20px;
  width: 20px;
  margin-bottom: auto;
  margin-top: auto;
}

.received > .unread-counter {
  background-color: var(--block-unread-bg);
  color: var(--block-unread-text);
}

.sended > .unread-counter {
  background-color: var(--block-unread-bg2);
  color: var(--block-unread-text2);
}

.unread {
  border-radius: 6pt;
  padding: 0 3px 0 3px;
}

.received > .unread {
  background-color: var(--block-unread-bg);
  color: var(--block-unread-text);
}

.sended > .unread {
  background-color: var(--block-unread-bg2);
  color: var(--block-unread-text2);
}

.emoji {
  height: 0.8125rem;
  width: 0.8125rem !important;
}
</style>
