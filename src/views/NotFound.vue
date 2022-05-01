<template>
	<div class="container base">
		<h1>Ошибка № 404. Файл не найден</h1>
		<p>
			К сожалению, страница, которую Вы запросили, не существует.<br /> Возможные причины:
		</p>
		<ol>
			<li>Страница была удалена с сервера</li>
			<li>Страница временно недоступна</li>
			<li>
				Если Вы набирали адрес вручную, проверьте, пожалуйста, правильно ли он набран.
			</li>
		</ol>
		<p>Вы можете перейти на
			<router-link id="return" to="/">главную страницу</router-link> сайта.</p>
	</div>
</template>

<script>
	import {
		preloaderStop
	} from '@/../public/js/func.js'
	
	export default {
		data() {
			return {}
		},
		methods: {
			preloaderStop: preloaderStop,
		},
		mounted() {
			this.preloaderStop()
		},
		beforeRouteLeave() {
			this.emitter.emit('loaded', false)
		},
	}
</script>

<style>
	#return {
		color: var(--danger)
	}
</style>