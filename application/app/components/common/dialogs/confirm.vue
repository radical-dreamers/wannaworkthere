<template lang="html">
  <div class="">
    <button type="button" class="button" v-bind:class="theme" @click="ask">
      <span class="icon is-small" v-if="actionIcon">
        <i class="fa" v-bind:class="actionIcon"></i>
      </span>
      {{ actionText }}
    </button>
    <div class="modal" v-bind:class="{ 'is-active': confirmActive }">
      <div class="modal-background" @click="close"></div>
      <div class="modal-content">
        <article class="message is-danger">
          <div class="message-header" v-if="dialogTitle">
            <p>{{ dialogTitle }}</p>
          </div>
          <div class="message-body">
            <div class="columns">
              <div class="column">
                <div class="">
                  {{ dialogText }}
                </div>
                <div class="">
                  <button type="button" name="button" class="button is-danger" @click="confirm">
                    <span class="icon" v-if="confirmIcon">
                      <i class="fa" v-bind:class="confirmIcon"></i>
                    </span>
                    {{ confirmText }}
                  </button>
                </div>
              </div>

            </div>
            <div class="">

            </div>
          </div>

        </article>
      </div>
      <button class="modal-close" @click="close"></button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      confirmActive: false
    }
  },
  props: {
    theme: {
      type: String,
      required: false,
      default: 'is-default'
    },
    actionIcon: {
      type: String,
      required: false
    },
    actionText: {
      type: String,
      required: false,
      default: ''
    },
    dialogTitle: {
      type: String,
      required: false
    },
    dialogText: {
      type: String,
      requred:false
    },
    confirmText: {
      type: String,
      required: false,
      default: ''
    },
    confirmIcon: {
      type: String,
      required: false
    }
  },
  methods: {
    close () {
      this.confirmActive = false
      this.$emit('close')
    },
    confirm () {
      this.confirmActive = false
      this.$emit('confirm')
    },
    ask () {
      this.confirmActive = true
      this.$emit('ask')
    }
  }
}
</script>

<style lang="css">
</style>
