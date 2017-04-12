class GenericTransition {
  constructor(transitionType, name) {
    this.functional = true,
    this.transitionType = transitionType
    this.name = name
    let that = this
    this.render = function (createElement, context) {

      var data = {
        props: {
          name: that.name,
          enterActiveClass: 'animated ' + that.transitionType
        },
        on: {
          beforeEnter (el) {
          },
          afterEnter (el) {
          }
        }
      }
      return createElement('transition', data, context.children)
    }
  }


}

export default GenericTransition
