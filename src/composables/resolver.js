'use strict'

import { ref, onBeforeUnmount, readonly } from 'vue'

const noop = () => {}
const delay = (fn, ms) => new Promise(resolve => setTimeout(() => resolve(fn()), ms))

//const nomalizeFn = fn => (typeof fn === 'function' ? fn : () => fn)

/**
 * Intenta resolver una promesa generada por una función
 * @param {Object} param0
 * 	- okNotification: función para notificar de la ejecución correcta
 *  - errorNotification: función para notificar de la ejecución incorrecta.
 * 		Recibe como parámetros el error producido y una indicación de si el usuario canceló
 * 		la ejecución antes de su final.
 * 		Si retorna true se lazará la excepción motivo del error que debaerá ser capturada
 *  - delayRetry: Número de milisegundos entre reintentos. def: 300
 */
export function useResolver({ okNotification, errorNotification, delayRetry } = {}) {
	const controller = new AbortController()

	const delayMl = delayRetry || 300 //tiempo de espera entre reintentos

	const cancellationPending = ref(false)
	const isLoading = ref(false)
	//
	const data = ref(null)
	const error = ref(null)

	if (!okNotification) okNotification = noop
	if (!errorNotification) errorNotification = noop

	/**
	 * Intensa resolver una Promesa en un número determinado de veces
	 * @param {Function} fn Función que retorna la Promise que se desea resolver
	 * @param {Number} retries Número máximo de intentos para resolver la promesa
	 * @returns true si la Promesa se resolvió correctamente, false en cualquier otro caso.
	 */
	const tryResolve = (fn, retries = 1) => {
		isLoading.value = true

		if (typeof fn !== 'function') throw new Error('First argument must by a function')

		return fn()
			.then(r => {
				data.value = r
				error.value = null
				okNotification()
				return true
			})
			.catch(e => {
				if (retries > 0 && !cancellationPending.value) {
					console.warn('Reintentado...', retries)
					return delay(() => tryResolve(fn, retries - 1), delayMl)
				}
				error.value = e
				data.value = null
				//Si la función de notificación retorna true se lanza la excepción
				// que debería ser capturada en el await de la llamada al tryResolve
				if (errorNotification(e, cancellationPending.value)) throw e

				return false
			})
			.finally(() => {
				isLoading.value = false
				cancellationPending.value = false
			})
	}

	/**
	 * Emite la señal para intentar cancelar la ejecución la promesa
	 * @returns
	 */
	const cancelResolve = () => (cancellationPending.value = true)

	onBeforeUnmount(() => {
		cancelResolve()
		controller.abort()
	})

	return {
		isLoading: readonly(isLoading),
		data: readonly(data),
		error: readonly(error),
		cancellationPending: readonly(cancellationPending),

		//methods
		tryResolve,
		cancelResolve,
	}
}
