<template>
  <transition name="fade" mode="out-in">
    <div class="comment transition" :data-comment="comment.id">
      <div v-if="!commentEdit" class="comment-wrapper">
        <div class="col-12 comment-body">
          <router-link class="comment-author" :to="!$store.state.edit ? `/profile/id${comment.author.id}` : ''" :data-author="comment.author.id">
            <AvatarMin :userId="comment.author.id" :lastVisit="comment.author.ulastVisit" :photo="comment.author.photo" />
            <h5 v-if="comment.author.id != myId">
              {{ `${comment.author.firstName} ${comment.author.lastName}` }}
            </h5>
            <h5 v-else>Я</h5>
          </router-link>
          <span class="comment-date" v-html="timeName(comment.utime)"></span>
          <small v-if="comment.edited == 1" class="comment-edited">
                        <EditBtn
                          :type="'edited'"
                          data-toggle="tooltip"
                          title="Редактирован"
                          style="vertical-align: baseline"
                          width="12"
                          height="12"
                        />
                      </small>
          <div contenteditable="false" class="comment-text" v-html="text" ref="comment"></div>
          <div v-if="comment.author.id == myId" v-show="!commentEdit" class="col-12 comment-actions post-mng">
            <div class="post-edit-ops post-mng-btn pointer">
              <EditBtn v-if="myId === comment.author.id" @click="CommentEdit" :type="'btn_comment-edit'" />
            </div>
            <div class="post-edit-ops post-mng-btn pointer">
              <DelComment v-if="myId === comment.author.id" :commentId="comment.id" :postId="postId" />
            </div>
          </div>
        </div>
      </div>
      <EditComment v-else :comment="comment" :postId="postId" @cancel="commentEdit = false" />
    </div>
  </transition>
</template>

<script>
  import {
    timeName,
    parser,
    Emoji
  } from '@/../public/js/func.js'
  import AvatarMin from '@/components/AvatarMin.vue'
  import EditBtn from '@/components/Buttons/Edit2.vue'
  import EditComment from '@/components/Post/Comment/Edit.vue'
  import DelComment from '@/components/Post/Comment/Del.vue'
  export default {
    data() {
      return {
        myId: this.$store.state.myId,
        commentEdit: false
      }
    },
    components: {
      AvatarMin,
      EditBtn,
      DelComment,
      EditComment
    },
    props: ['comment', 'postId'],
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
        } else return ''
      },
    }
  }
</script>
