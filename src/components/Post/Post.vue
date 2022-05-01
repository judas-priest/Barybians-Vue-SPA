<template>
  <div class="post transition" ref="post" :data-post="post.id" v-click-outside="collapse">
    <div v-if="!postEdit" class="post-wrapper">
      <router-link v-if="post.author && currentRouteName === 'Feed'" class="post-author" :to="!$store.state.edit ? `/profile/id${post.author.id}` : ''" :data-author="post.author.id">
        <AvatarMin :userId="post.userId" :lastVisit="post.author.ulastVisit" :photo="post.author.photo" />
        <h5 v-if="post.author.id != myId">
          {{ `${post.author.firstName} ${post.author.lastName}` }}
        </h5>
        <h5 v-else>Я</h5>
      </router-link>
      <div class="post-head">
        <h4 class="post-title" contenteditable="false" v-html="Emoji(post.title)" ref="title"></h4>
  
        <small v-if="post.edited == 1" class="post-edited">
                      <EditBtn
                        type="edited"
                        data-toggle="tooltip"
                        title="Редактирован"
                        style="vertical-align: baseline"
                        width="12"
                        height="12"
                    /></small>
        <span class="post-date" v-html="timeName(post.utime)"></span>
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
            <div class="likepost post-mng-btn">
              <span :class="[whoLiked(post.likedUsers) ? 'unlike' : 'like']" @click="likeToggle" ref="like">
                            <LikeBtn />
                            <span class="likeCount" ref="likeCount">{{
                              post.likesCount != 0 ? post.likesCount : ''
                            }}</span>
              </span>
            </div>
            <div class="post-edit-ops post-mng-btn pointer" @click="PostEdit">
              <EditBtn :type="'btn_post-edit'" data-toggle="tooltip" title="Редактировать пост" />
            </div>
            <PostDel v-if="myId == userId" :postId="post.id" />
            <div style="flex: 1"></div>
            <div class="comment-manage">
              <span v-if="
                              post.commentsCount !== 0 && post.commentsCount !== undefined
                            ">
                            <span
                              @click="isSlidedComments = !isSlidedComments"
                              class="comment-arrow"
                            >
                              <Up v-if="isSlidedComments" />
                              <Down v-else
                            /></span>
              <span class="comment-counter post-mng-btn">{{
                              post.commentsCount
                            }}</span>
              </span>
            </div>
            <div class="post-mng-btn" style="margin-right: 0; min-width: auto">
              <CommentBtn @click="CommentAddToggle" class="pointer" />
            </div>
          </div>
        </div>
        <collapse-transition>
          <CommentAdd v-if="commentAdd" :postId="post.id" @add="(val) => addComment(val)" />
        </collapse-transition>
        <collapse-transition class="comments-container" :data-post-id="post.id">
          <Comments v-if="isSlidedComments && post.comments.length" :comments="post.comments" :postId="post.id" />
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
  import LikeBtn from '@/components/Buttons/Like.vue'
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
      LikeBtn,
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
      }
    },
    updated() {
      //console.log(this.post);
    },
    mounted() {
      this.isMounted = true
      /*this.emitter.on("comment-add", val => {
                          this.addComment(val)
                        });*/
      this.emitter.on(`comment-update__${this.post.id}`, (val) => {
        this.editComment(val)
      })
    },
    beforeUnmount() {
      this.emitter.off(`comment-update__${this.post.id}`)
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
      addComment(res) {
        for (var obj in this.comments) {
          if (this.comments[obj].id === res.data.id) return
        }
        this.isSlidedComments = true
        this.post.comments.push(res.data)
        this.post.commentsCount++
          this.emitter.emit('post-update', this.post)
        this.$store.state.edit = false
        this.commentAdd = false
        this.$nextTick(() => {
          if (this.$refs.comment) this.goto('comment')
        })
      },
      editComment(comment) {
        for (var obj in this.post.comments) {
          if (this.post.comments[obj].id === comment.id) {
            this.post.comments.splice(obj, 1, comment)
          }
        }
  
        this.isSlidedComments = true
        this.emitter.emit('post-update', this.post)
        this.$store.state.edit = false
        this.$nextTick(() => {
          if (this.$refs.comment) this.goto('comment')
        })
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
      whoLiked(usersWhoLiked) {
        if (usersWhoLiked)
          for (let liker of usersWhoLiked)
            return liker.id === this.myId ? true : false
      },
      likeToggle() {
        if (this.$store.state.edit) return
        let p = this.$refs.post //event.currentTarget.closest(".post");
        let l = this.$refs.like //event.currentTarget;
        let c = this.$refs.likeCount //event.currentTarget.querySelector(".likeCount");
        if (l.classList == 'like') {
          this.axios.post(`/posts/${p.dataset.post}/like`).then((res) => {
            c.textContent = res.data.likesCount
            l.classList = 'unlike'
          })
        } else if (l.classList == 'unlike') {
          this.axios.delete(`/posts/${p.dataset.post}/like`).then((res) => {
            res.data.likesCount === 0 ?
              (c.textContent = '') :
              (c.textContent = res.data.likesCount)
            l.classList = 'like'
          })
        }
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
  
  .likeCount {
    vertical-align: -1px;
  }
  
  .like,
  .unlike {
    height: 1.5em;
    display: inline-block;
  }
  
  .like>svg>g>path {
    stroke: var(--block-time);
    fill: none;
  }
  
  .unlike>svg>g>path {
    fill: var(--danger);
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
