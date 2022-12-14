<template>
	<div class="grid" v-if="paginated">
		<div class="s12">
			<article
				class="no-padding border round"
				v-for="receta in paginated"
				:key="receta.mealId"
			>
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
			<!-- <em
				>socurce
				<a :href="receta.strSource" target="_blank">{{
					receta.strSource
				}}</a></em
			> -->
			<nav>
				<button @click="prev">&lt;&lt;</button>
				<div>{{ currentPage }}/{{ totalPages }}</div>
				<button @click="next">>></button>
				{{recetas.length}}
			</nav>
		</div>
		<!-- <div class="s6 medium-height middle-align center-align" v-else>
			<a class="loader large"></a>
		</div> -->
	</div>
	<div class="grid" v-else>SIN DATOS</div>
	<the-toast v-model="showError" :error="error"></the-toast>
</template>

<script setup>
	import { onMounted, ref, computed } from 'vue'
	import axios from 'axios'
	import { useResolver } from 'composables/resolver.js'
	import TheToast from '../components/TheToast.vue'

	const props = defineProps({
		idMeal: {
			type: String,
			required: true,
		},
	})

	const getReceta = async id => {
		return (
			await axios.get(
				//`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
				`https://www.themealdb.com/api/json/v1/1/search.php?s=${id}`
			)
		).data
	}

	const showError = ref(false)
	const recetas = ref([])
	const currentPage = ref(1)
	const pageSize = ref(3)

	const totalPages = computed(() =>
		Math.ceil(recetas.value.length / pageSize.value)
	)
	const indexStart = computed(() => (currentPage.value - 1) * pageSize.value)
	const indexEnd = computed(() => indexStart.value + pageSize.value)
	const paginated = computed(() =>
		recetas.value.slice(indexStart.value, indexEnd.value)
	)

	const { tryResolve, data, error } = useResolver()

	onMounted(async () => {
		if (await tryResolve(() => getReceta(props.idMeal), 2)) {
			recetas.value = data.value.meals
		} else {
			showError.value = true
		}
	})

	/**
	 * Reemplaza \n\r por el html <br/>
	 */
	const parseText = str => {
		//return str.replace(/\n/g, "<br/>")

		if (str !== undefined) {
			//return str.replace(/\\r\\n/g, '<br />')
			return str.replace(/\n/g, '<br />')
		}

		return str
	}

	const prev = () => (currentPage.value = Math.max(1, currentPage.value - 1))
	const next = () =>
		(currentPage.value = Math.min(currentPage.value + 1, totalPages.value))
</script>
