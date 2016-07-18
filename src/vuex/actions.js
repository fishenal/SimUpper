export function randomAbilities ({ dispatch }) {
	dispatch('RANDOMABILITIES')
}
export function nextDay ({ dispatch }) {
	dispatch('DAYINCREASE')
}
export function addNew ({ dispatch }, props) {
	dispatch('ADDNEWVIDEO', props)
}
export function removeVideo ({ dispatch }, video) {
	dispatch('REMOVEVIDEO', video)
}
export function publishVideo ({ dispatch }, props) {
	dispatch('PUBLISHVIDEO', props)
}
export function continueVideo ({ dispatch }, props) {
	dispatch('CONTINUEVIDEO', props)
}
export function dailyChange ({ dispatch}) {
	dispatch('DAILYCHANGE')
}