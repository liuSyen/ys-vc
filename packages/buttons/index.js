import buttons from './src/buttons.vue'
buttons.install = function (Vue) {
    Vue.component(buttons.name, buttons)
}

export default buttons
