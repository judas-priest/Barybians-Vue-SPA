<template>
  <transition name="fade" mode="out-in">
    <div class="comment transition" :data-comment="comment.commentId">
      <div v-if="!commentEdit" class="comment-wrapper">
        <div class="col-12 comment-body">
          <div class="author-wrapper">
            <router-link
              class="comment-author"
              :to="
                !$store.state.edit ? `/profile/id${comment.author.userId}` : ''
              "
              :data-author="comment.author.userId"
            >
              <AvatarMin
                :userId="comment.author.userId"
                :lastVisit="comment.author.lastVisit"
                :photo="comment.author.photo128"
              />
              <h5 v-if="comment.author.userId !== myId">
                {{ `${comment.author.firstName} ${comment.author.lastName}` }}
              </h5>
              <h5 v-else>Я</h5>
            </router-link>
          </div>
          <span class="comment-date" v-html="timeName(comment.time)"></span>
          <small v-if="comment.lastModified" class="comment-edited">
            <EditBtn
              :type="'edited'"
              data-toggle="tooltip"
              title="Редактирован"
              style="vertical-align: baseline"
              width="12"
              height="12"
            />
          </small>
          <div
            class="comment-text"
            contenteditable="false"
            v-html="text"
            ref="comment"
          ></div>
          <div
            class="comment-attachments"
            contenteditable="false"
            v-html="attachments"
            ref="attachments"
          ></div>
          <div
            v-if="comment.author.userId === myId"
            v-show="!commentEdit"
            class="col-12 comment-actions post-mng"
          >
            <div class="post-edit-ops post-mng-btn pointer">
              <EditBtn
                v-if="myId === comment.author.userId"
                @click="CommentEdit"
                :type="'btn_comment-edit'"
              />
            </div>
            <div class="post-edit-ops post-mng-btn pointer">
              <DelComment
                v-if="myId === comment.author.userId"
                :commentId="comment.commentId"
                :postId="postId"
              />
            </div>
          </div>
        </div>
      </div>
      <EditComment
        v-else
        :comment="comment"
        :postId="postId"
        @cancel="commentEdit = false"
      />
    </div>
  </transition>
</template>

<script>
import { timeName, parser, Emoji } from "@/../public/js/func.js"
import AvatarMin from "@/components/AvatarMin.vue"
import EditBtn from "@/components/Buttons/Edit2.vue"
import EditComment from "@/components/Post/Comment/Edit.vue"
import DelComment from "@/components/Post/Comment/Del.vue"
export default {
  data() {
    return {
      myId: this.$store.state.myId,
      commentEdit: false,
    }
  },
  components: {
    AvatarMin,
    EditBtn,
    DelComment,
    EditComment,
  },
  props: ["comment", "postId"],
  methods: {
    CommentEdit() {
      if (this.$store.state.edit) return
      this.commentEdit = true
    },

    timeName: timeName,
    parser: parser,
    Emoji: Emoji,
  },
  computed: {
    text() {
      if (
        this.comment.attachments !== null &&
        this.comment.attachments !== undefined
      ) {
        const parsed = this.parser(this.comment.text, this.comment.attachments)
        return this.Emoji(parsed.text, 1)
      } else return this.Emoji(this.comment.text, 1)
    },
    attachments() {
      if (
        this.comment.attachments !== null &&
        this.comment.attachments !== undefined
      ) {
        const parsed = this.parser(this.comment.text, this.comment.attachments)
        return this.Emoji(parsed.attachments, 1)
      } else return ""
    },
  },
}
</script>
