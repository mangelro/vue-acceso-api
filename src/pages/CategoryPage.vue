<template>
	<div class="grid">
		<div class="s12">
			<h2>Categoría: {{ category }}</h2>
		</div>
		<div class="s2">{{ comidas.length }}</div>

		<div class="s9 medium-height middle-align center-align" v-if="isLoading">
			<a class="loader large"></a>
		</div>

		<div class="s9" v-if="!isLoading">
			<meals-table :meals="comidas"></meals-table>
		</div>
	</div>
	<the-toast v-model="showError" :error="error"></the-toast>
</template>

<script setup>
	import { onMounted, ref, watch } from 'vue'
	import axios from 'axios'
	import { useResolver } from 'composables/resolver.js'
	import TheToast from '../components/TheToast.vue'
	import MealsTable from 'components/MealsTable.vue'

	const props = defineProps({
		category: {
			type: String,
			required: true,
		},
	})

	const getCategory = async category => {
		return (await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)).data
	}

	const showError = ref(false)
	const comidas = ref([])

	const { tryResolve, data, error, isLoading } = useResolver()

	// watch(data, () => {
	// 	console.log('watch data ', data.value)
	// 	console.log('watch data comidas ', comidas.value)
	// 	console.log(data.value===comidas.value)

	// })

	// watch(comidas, () => {
	// 	console.log('watch comidas data ', data.value)
	// 	console.log('watch comidas ', comidas.value)
	// 	console.log(data.value===comidas.value)
	// })

	onMounted(async () => {
		if (await tryResolve(() => getCategory(props.category), 2)) {
			comidas.value = data.value.meals

			setTimeout(async () => {
				await tryResolve(() => getCategory('salad'), 2)
			}, 1500)
		} else {
			showError.value = true
		}
	})
</script>
<style scoped>
	body tr:hover {
		background-color: var(--active);
	}
	/* [1] The container */
	.img-hover-zoom {
		widows: 200px;
		height: 200px;
		overflow: hidden; /* [1.2] Hide the overflowing of child elements */
	}

	/* [2] Transition property for smooth transformation of images */
	.img-hover-zoom img {
		object-fit: cover;
		aspect-ratio: 16/9;
		filter: grayscale(60%);
		transition: transform 1s, filter 2s ease-in-out;
		/* transition: transform 0.5s ease; */
	}

	/* [3] Finally, transforming the image when container gets hovered */
	.img-hover-zoom:hover img {
		transform: scale(1.5) translate(5px, 15px);
		filter: grayscale(0);
	}
</style>
