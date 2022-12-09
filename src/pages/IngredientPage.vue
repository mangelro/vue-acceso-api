<template>
	<div class="grid">
		<div class="s12">
			<h2>Ingrediente: {{ ingredient }}</h2>
		</div>
		<div class="s2"></div>
		<div class="s9" v-if="!isLoading">
			<meals-table :meals="meals"></meals-table>
		</div>
		<div class="s6 medium-height middle-align center-align" v-else>
			<a class="loader large"></a>
		</div>
	</div>
	<the-toast v-model="showError" :error="error"></the-toast>
</template>

<script setup>
	import { onMounted, ref } from 'vue'
	import axios from 'axios'
	import { useResolver } from 'composables/resolver.js'
	import TheToast from '../components/TheToast.vue'
	import MealsTable from 'components/MealsTable.vue'

	const props = defineProps({
		ingredient: {
			type: String,
			required: true,
		},
	})

	const getIngredient = async ingredient => {
		return (
			await axios.get(
				`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
			)
		).data
	}

	const showError = ref(false)
	const meals = ref([])

	const { tryResolve, data, error, isLoading } = useResolver()

	onMounted(async () => {
		if (await tryResolve(() => getIngredient(props.ingredient), 2)) {
			meals.value = data.value.meals
		} else {
			showError.value = true
		}
	})
</script>
