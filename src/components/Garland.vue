<template>
  <ul class="lightrope">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</template>

<script>
export default {}
</script>

<style>
.lightrope {
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  position: absolute;
  z-index: 1;
  /*
  margin: -30px 0 20px -20px;
  padding: 0;
  */
  margin-top: -1em;
  pointer-events: none;
  width: 100%;
}
@media screen and (max-width: 768px) {
  .lightrope {
    margin-top: 0;
    margin-bottom: -1.8em;
    padding: 0;
    transform: rotate(180deg);
  }
}
.lightrope li {
  position: relative;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
  list-style: none;
  margin: 0;
  padding: 0;
  display: block;
  width: 6px;
  height: 12px;
  border-radius: 50%;
  margin: 20px;
  display: inline-block;
}
.lightrope li:nth-child(2n) {
  background: #0f0;
  box-shadow: 0px 2px 12px 3px #0f0;
  animation-name: flash-1;
  animation-duration: 2s;
}
.lightrope li:nth-child(2n + 1) {
  background: #ffff00;
  box-shadow: 0px 2px 12px 3px #ffff00;
  animation-name: flash-2;
  animation-duration: 0.4s;
}
.lightrope li:nth-child(3n + 1) {
  background: #f00;
  box-shadow: 0px 2px 12px 3px #f00;
  animation-name: flash-3;
  animation-duration: 1.1s;
}
.lightrope li:nth-child(4n + 1) {
  background: #00f;
  box-shadow: 0px 2px 12px 3px #00f;
  animation-name: flash-4;
  animation-duration: 1.1s;
}
.lightrope li:nth-child(odd) {
  animation-duration: 1.8s;
}
.lightrope li:nth-child(3n + 1) {
  animation-duration: 1.4s;
}
.lightrope li:before {
  content: "";
  position: absolute;
  background: #222;
  width: 4px;
  height: 4px;
  border-radius: 3px;
  top: -2px;
  left: 1px;
}
.lightrope li:after {
  content: "";
  top: -6px;
  left: 3px;
  position: absolute;
  width: 52px;
  height: 8px;
  border-bottom: solid #222 2px;
  border-radius: 50%;
}
.lightrope li:last-child:after {
  content: none;
}
.lightrope li:first-child {
  margin-left: -40px;
}
@keyframes flash-1 {
  0%,
  100% {
    background: #0f0;
    box-shadow: 0px 2px 12px 3px #0f0;
  }
  50% {
    background: rgba(0, 247, 0, 0.4);
    box-shadow: 0px 2px 12px 3px rgba(0, 247, 0, 0.2);
  }
}
@keyframes flash-2 {
  0%,
  100% {
    background: #ffff00;
    box-shadow: 0px 2px 12px 3px #ffff00;
  }
  50% {
    background: rgba(255, 255, 0, 0.4);
    box-shadow: 0px 2px 12px 3px rgba(255, 255, 0, 0.2);
  }
}
@keyframes flash-3 {
  0%,
  100% {
    background: #f00;
    box-shadow: 0px 2px 12px 3px #f00;
  }
  50% {
    background: rgba(247, 0, 0, 0.4);
    box-shadow: 0px 2px 12px 3px rgba(247, 0, 0, 0.2);
  }
}
@keyframes flash-4 {
  0%,
  100% {
    background: #00f;
    box-shadow: 0px 2px 12px 3px #00f;
  }
  50% {
    background: rgba(0, 0, 247, 0.4);
    box-shadow: 0px 2px 12px 3px rgba(0, 0, 247, 0.2);
  }
}
#load_msg {
  background: #ddd;
}
#load_msg:hover {
  background: #496580;
  color: #dcf1f7;
}

#btn_post-add,
.btn_posts-del,
#btn_post-add2 {
  filter: invert(100%);
}
.stickers,
.modal-content,
.modal-body {
  background: #496580;
  color: #fff;
}
</style>
