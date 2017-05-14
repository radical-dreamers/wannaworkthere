<template lang="html">
  <div class="hero">
    <h1 class="title is-2">{{ $t('events.create.title' )}}</h1>
    <form class="" @submit.prevent.stop="save">
      <div class="columns">
        <div class="column">
          <vb-field :label="$t('events.common.title')" :help="{show: errors.has('title'), message: $t('fields.requiredMessage'), level: 'is-danger'}">
            <input slot="field" class="input" type="text" v-model="instance.title"
              name="title" placeholder="Some event" v-validate:title.initial="'required'"
              :class="{'is-danger': errors.has('title')}"/>
          </vb-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <vb-field :label="$t('events.common.startDate')" :help="{show: errors.has('startDate'), message: $t('fields.requiredMessage'), level: 'is-danger'}">
            <input slot="field" class="input" type="text" v-model="instance.startDate" placeholder="27/1/2017"
              name="startDate" v-validate:startDate.initial="'required'" :class="{'is-danger': errors.has('startDate')}"/>
          </vb-field>
        </div>
        <div class="column">
          <vb-field :label="$t('events.common.endDate')" :help="{show: errors.has('endDate'), message: $t('fields.requiredMessage'), level: 'is-danger'}">
            <input slot="field" class="input" type="text" v-model="instance.endDate" placeholder="27/1/2017"
              name="endDate" v-validate:endDate.initial="'required'" :class="{'is-danger': errors.has('endDate')}"/>
          </vb-field>
        </div>
      </div>
      <vb-markdown :label="$t('events.common.description')" :help="{show: true, message: $t('events.create.descriptionHelp'), level: 'is-primary'}" v-model="instance.description"></vb-markdown>
      <div class="columns">
        <div class="column">
          <vb-tag-input :label="$t('events.common.interests')" :help="{show: true, message: $t('events.create.interetsHelp')}" v-model="instance.tags"></vb-tag-input>
        </div>
      </div>
      <div class="columns">
        <div class="column is-offset-one-quarter is-clearfix is-half" >
          <button type="submit" name="submit" class="button is-primary ">{{ $t('common.save') }}</button>
          <button type="button" name="cancel" class="button is-warning is-pulled-right" @click="cancel">{{ $t('common.cancel') }}</button>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
import marked from 'marked'
import fields from '../common/forms/fields'
import api from '../../api'
import { mapActions } from 'vuex'
import countriesList from 'countries-list'

export default {
  props: {
    id: {
      required: false,
      type: String
    }
  },
  components: {
    'vb-field': fields.vbField,
    'vb-markdown': fields.vbMarkdown,
    'vb-tag-input': fields.vbTagInput
  },
  data () {
    return {
      instance: {
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        tags: []
      }
    }
  },
  created () {
    if (this.id) {
      api.events.get(this.id).then((result)=> {
        Object.assign(this.instance, result.data)
      }).catch((error)=> { /* do nothing here*/})
    }

  },
  methods: {
    ...mapActions([
      'addMessage'
    ]),
    save () {
      this.$validator.validateAll().then( (success) => {
        if (this.instance._id) {
          this.update()
        } else {
          this.create()
        }
      }).catch((error)=> {})
    },
    create () {
      api.events.create(this.instance).then((result)=> {
        this.addMessage({
          text: 'Event created successfully',
          type: 'success'
        })
        this.$router.push({name: 'admin.events'})
      }).catch((error)=> { /* Do nothing here */})
    },
    update () {
      api.events.update(this.instance._id, this.instance).then((result)=> {
        this.addMessage({
          text: 'Event updated successfully',
          type: 'success'
        })
        this.$router.push({name: 'admin.events'})
      }).catch((error) => { /* Do nothing here */ })
    },
    cancel () {
      this.$router.push({name: 'admin.events'})
    }
  }

}
</script>

<style lang="css">
</style>
