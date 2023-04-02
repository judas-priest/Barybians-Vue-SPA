<template>
  <div class="post transition" ref="post" :data-post="post.postId" v-click-outside="collapse">
    <div v-if="!postEdit" class="post-wrapper">
      <div v-if="post.author && currentRouteName === 'Feed'" class="author-wrapper">
      <router-link class="post-author" :to="!$store.state.edit ? `/profile/id${post.author.userId}` : ''" :data-author="post.author.userId">
        <AvatarMin :userId="post.userId" :lastVisit="post.author.lastVisit" :photo="post.author.photo128" />
        <h5 v-if="post.author.userId !== myId">
          {{ `${post.author.firstName} ${post.author.lastName}` }}
        </h5>
        <h5 v-else>Я</h5>
      </router-link>
      </div>
      <div class="post-head">
        <h4 class="post-title" contenteditable="false" v-html="Emoji(post.title)" ref="title"></h4>
  
        <small v-if="post.lastModified" class="post-edited">
              <EditBtn
                type="edited"
                data-toggle="tooltip"
                title="Редактирован"
                style="vertical-align: baseline"
                width="12"
                height="12"
            /></small>
        <span class="post-date" v-html="timeName(post.time)"></span>
      </div>
      <div class="post-body">
        <div class="post-content">
          <div class="post-text" contenteditable="false" v-html="text" :class="{ less: showMoreLess }" ref="text"></div>
          <div class="post-attachments" contenteditable="false" v-html="attachments" ref="attachments"></div>
        </div>
        <span v-show="showMoreLess" class="showmore_trigger">
              <span v-if="collapsed" class="morelink more" @click="showMore"
                >Развернуть</span
              >
              <span v-else class="morelink less" @click="showMore">Свернуть</span>
        </span>
  
        <div class="post-actions">
          <div class="col-12 post-mng">
            <Like :postId="post.postId" :userId="post.userId" :likesCount="post.likesCount" />
            <div class="post-edit-ops post-mng-btn pointer" @click="PostEdit">
              <EditBtn :type="'btn_post-edit'" data-toggle="tooltip" title="Редактировать пост" />
            </div>
            <PostDel v-if="myId === userId" :postId="post.postId" />
            <div style="flex: 1"></div>
            <div class="comment-manage">
              <span v-if="commentsCounter !== 0 && commentsCounter !== ''">
                    <span
                      @click="isSlidedComments = !isSlidedComments"
                      class="comment-arrow"
                    >
                      <Up v-if="isSlidedComments" />
                      <Down v-else
                    /></span>
              <span class="comment-counter post-mng-btn">{{
                      commentsCounter
                    }}</span>
              </span>
            </div>
            <div class="post-mng-btn" style="margin-right: 0; min-width: auto">
              <CommentBtn @click="CommentAddToggle" class="pointer" />
            </div>
          </div>
        </div>
        <collapse-transition>
          <CommentAdd v-if="commentAdd" :postId="post.postId" />
        </collapse-transition>
        <collapse-transition class="comments-container" :data-post-id="post.postId">
          <Comments v-if="isSlidedComments && commentsCounter" :postId="post.postId" />
        </collapse-transition>
      </div>
    </div>
    <PostEdit v-else :post="post" @cancel="postEdit = false" />
  </div>
</template>

<script>
  import {
    parser,
    Emoji,
    strip_tags,
    uuidv4,
    timeName,
  } from '@/../public/js/func.js'
  import EditBtn from '@/components/Buttons/Edit2.vue'
  import PostEdit from '@/components/Post/Edit.vue'
  import PostDel from '@/components/Post/Del.vue'
  import Like from '@/components/Post/Like.vue'
  import CommentBtn from '@/components/Buttons/Comment.vue'
  import Down from '@/components/Buttons/ArrowDown.vue'
  import Up from '@/components/Buttons/ArrowUp.vue'
  import Comments from '@/components/Post/Comments.vue'
  import CommentAdd from '@/components/Post/Comment/Add.vue'
  
  import AvatarMin from '@/components/AvatarMin.vue'
  export default {
    name: 'Post',
    props: ['post', 'userId'],
    components: {
      EditBtn,
      PostEdit,
      PostDel,
      Like,
      CommentBtn,
      Down,
      Up,
      Comments,
      CommentAdd,
      AvatarMin,
    },
    data() {
      return {
        myId: this.$store.state.myId,
        collapsed: true,
        postEdit: false,
        commentAdd: false,
        isSlidedComments: false,
        wysiwygDisable: false,
        isMounted: false,
        commentsCounter: '',
      }
    },
    updated() {
      //console.log(this.post);
    },
    mounted() {
      this.commentsCounter = this.post.commentsCount
  
      this.isMounted = true
      this.emitter.on(`comment-add__${this.post.postId}`, () => {
        this.isSlidedComments = true
        this.commentsCounter++
        this.$store.state.edit = false
        this.commentAdd = false
  
      });
  
      this.emitter.on(`comment-update__${this.post.postId}`, () => {
        this.isSlidedComments = true
        this.$store.state.edit = false
        this.$nextTick(() => {
          if (this.$refs.comment) this.goto('comment')
        })
      })
  
      this.emitter.on(`comment-delete__${this.post.postId}`, () => {
        this.commentsCounter--
      })
    },
    beforeUnmount() {
      this.emitter.off(`comment-update__${this.post.postId}`)
    },
    methods: {
      collapse(e) {
        if (e.target.closest('#modal')) return
        if (e.target !== this.$refs.post && !this.$refs.post.contains(e.target)) {
          this.commentAdd = false
        }
      },
      showMore() {
        this.$refs.text.classList.toggle('less')
        this.collapsed = !this.collapsed
      },
      PostEdit() {
        if (this.$store.state.edit) return
        this.postEdit = true
      },
      CommentAddToggle() {
        if (!this.commentAdd && this.$store.state.edit) return
        if (this.commentAdd) {
          this.commentAdd = false
          return
        }
        this.commentAdd = true
        //console.log(this.commentAdd);
      },
      parser: parser,
      Emoji: Emoji,
      strip_tags: strip_tags,
      uuidv4: uuidv4,
      timeName: timeName,
    },
    computed: {
      currentRouteName() {
        return this.$route.name
      },
      showMoreLess() {
        if (this.isMounted) return this.$refs.text.clientHeight > 285
        else return false
      },
      text() {
        if (
          this.post.attachments !== null &&
          this.post.attachments !== undefined
        ) {
          const parsed = this.parser(this.post.text, this.post.attachments)
          return this.Emoji(parsed.text, 1)
        } else return this.Emoji(this.post.text, 1)
      },
      attachments() {
        if (
          this.post.attachments !== null &&
          this.post.attachments !== undefined
        ) {
          const parsed = this.parser(this.post.text, this.post.attachments)
          return this.Emoji(parsed.attachments, 1)
        } else return ''
      },
    },
  }
</script>

<style>
  .post,
  .comments,
  .post-add-form {
    background: var(--block-bg) none repeat scroll 0 0;
    border-radius: 6pt;
    font-size: 14pt;
    margin-bottom: 10px;
  }
  
  .post-wrapper {
    padding: 10px;
  }
  
  .post-head {
    margin-bottom: 0.2rem;
  }
  
  .post-head span,
  .post-head div {
    display: inline-block;
  }
  
  .post-head,
  .post-author {
    margin-left: 5pt;
    margin-right: 5pt;
    display: flex;
    margin-bottom: inherit;
  }
  .author-wrapper{
    margin-bottom: 20px;
    display: inline;
  }

  
  .post-author>h5 {
    color: var(--text);
  }
  
  .comment-author>h5 {
    color: var(--profile-text);
  }
  
  .post-date,
  .comment-date {
    font-size: 10pt;
    color: var(--block-time);
  }
  
  .post-date {
    margin-top: auto;
    margin-bottom: 0.5rem;
  }
  
  .post-edited {
    margin-right: 0.3em;
    margin-top: auto;
    margin-bottom: 0.5rem;
    color: var(--block-time);
    fill: var(--block-time);
  }
  
  .post-title {
    flex: 1;
    margin-top: 0;
    /* margin-bottom: 0.1rem; */
    font-size: 1.4rem;
  }
  
  .post-content {
    margin-bottom: 10px;
  }
  
  .post-title[contenteditable='true'][placeholder]:empty::after,
  .post-text[contenteditable='true'][placeholder]:empty::after {
    content: attr(placeholder);
    color: var(--placeholder);
  }
  
  .post-title img.emoji {
    width: 1.5rem;
  }
  
  .post-body {
    margin-left: 5pt;
    margin-right: 5pt;
  }
  
  .post-text {
    white-space: pre-line;
    font-size: 1.2rem;
    overflow: hidden;
    display: block;
    transition: height 0.1s ease-in-out;
    margin-bottom: inherit;
  }
  
  .post-text img.emoji,
  .comment-text img.emoji {
    width: 14pt;
  }
  
  @keyframes crescendo {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.5);
    }
  }
  
  img.emoji-big:active {
    animation: crescendo 1s alternate infinite ease-in;
  }
  
  .post-text>span {
    white-space: nowrap;
  }
  
  .post-text>.sticker {
    height: 200px;
    width: auto;
  }
  
  .post-mng {
    display: flex;
    color: var(--block-time);
    fill: var(--block-time);
  }
  
  .comment-arrow {
    fill: transparent;
    stroke: var(--block-time);
  }
  
  .post-mng-btn {
    margin-right: 1em;
    min-width: 30px;
  }
  
  .post-mng-btn svg {
    height: 1em;
    width: 1em;
  }
  
  .morelink {
    text-align: right;
    font-size: 11pt;
    display: inline;
    height: 1.5em;
  }
  
  .showmore_trigger {
    width: 100%;
    height: 45px;
    cursor: pointer;
    display: inline;
  }
  
  .comments-line {
    margin: 0;
    width: 100%;
    color: var(--foreground);
    background-color: var(--foreground);
    margin-top: 0.3em;
  }
  
  .comments {
    margin: 0;
    padding: 0;
  }
  
  .comment,
  .comment-add-form {
    background: var(--background) none repeat scroll 0 0;
    border-radius: 6pt;
    font-size: 14pt;
    border: 2px;
    margin: 10px 0;
  }
  
  .comment-wrapper {
    padding: 12pt;
  }
  
  .post-author>img,
  .comment-author>img {
    margin-right: 5pt;
    float: left;
  }
  
  .comment-date,
  .comment-edited {
    vertical-align: super;
    color: var(--comment-date);
    fill: var(--comment-date);
  }
  
  .comment-text {
    padding-top: 10px;
    margin-bottom: 1rem;
    color: var(--comment-text);
  }
  
  .comment-text>span>img.sticker {
    height: 10em;
    width: auto;
  }
  
  .comment-actions {
    fill: var(--comment-date);
  }
  
  .comment .edit-ops>button {
    fill: var(--comment-date) !important;
  }
</style>
