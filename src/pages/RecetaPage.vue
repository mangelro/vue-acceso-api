<template>
	<div class="grid" v-if="receta">
		<div class="s12">
			<article class="no-padding border round">
				<img
					class="responsive large top-round"
					:src="receta.strMealThumb"
				/>
				<div class="padding">
					<h5>
						{{ receta.strMeal }}
						<a class="chip small">
							<i class="small">donut_large</i>
							<span>{{ receta.strCategory }}</span>
						</a>
					</h5>
					<p v-html="parseText(receta.strInstructions)"></p>
					<nav>
						<button class="round">Button</button>
					</nav>
				</div>
			</article>
			<em>socurce <a :href="receta.strSource" target="_blank">{{receta.strSource}}</a></em>
		</div>
		<!-- <div class="s6 medium-height middle-align center-align" v-else>
			<a class="loader large"></a>
		</div> -->
	</div>
	<the-toast v-model="showError" :error="error"></the-toast>
</template>

<script setup>
	import { onMounted, ref } from 'vue'
	import axios from 'axios'
	import { useResolver } from 'composables/resolver.js'
	import TheToast from '../components/TheToast.vue'

	const props = defineProps({
		idMeal: {
			type: Number,
			required: true,
		},
	})

	const getReceta = async id => {
		return (
			await axios.get(
				`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
			)
		).data
	}

	const showError = ref(false)
	const receta = ref([])

	const { tryResolve, data, error, isLoading } = useResolver()

	onMounted(async () => {
		if (await tryResolve(() => getReceta(props.idMeal), 2)) {
			receta.value = data.value.meals[0]
		} else {
			showError.value = true
		}
	})

	const parseText = str => {
		//return str.replace(/\n/g, "<br/>")

		if (str !== undefined) {
			//return str.replace(/\\r\\n/g, '<br />')
			return str.replace(/\n/g, '<br />')
		}

		return str
	}
</script>
