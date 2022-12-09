<template>
	<Teleport to="body">
		<div class="toast pink white-text" :class="showError ? 'active' : null">
			<i>error</i>
			<span>{{ error }}</span>
		</div>
	</Teleport>
</template>

<script setup>
	import { computed, watch } from 'vue'

	const props = defineProps({
		modelValue: {
			type: Boolean,
			defaul: false,
		},
		error: {
			type: [Object, String],
			default: 'Ha ocurrido un error',
		},
	})
	const emit = defineEmits(['update:modelValue'])

	const showError = computed({
		get: () => props.modelValue,
		set: value => emit('update:modelValue', value),
	})

	watch(showError, newValue => {
		if (newValue)
			setTimeout(() => {
				showError.value = false
			}, 2500)
	})
</script>
