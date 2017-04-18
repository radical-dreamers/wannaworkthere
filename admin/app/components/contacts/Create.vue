<template lang="html">
  <div class="hero">
    <h1 class="title is-2">{{ $t('contacts.create.title' )}}</h1>
    <form class="" @submit.prevent.stop="save">
      <div class="columns">
        <div class="column">
          <vb-field :label="$t('contacts.common.firstName')" :help="{show: errors.has('firstName'), message: $t('fields.requiredMessage'), level: 'is-danger'}">
            <input slot="field" class="input" type="text" v-model="instance.firstName"
              name="firstName" placeholder="John" v-validate:firstName.initial="'required'"
              :class="{'is-danger': errors.has('firstName')}"/>
          </vb-field>
        </div>
        <div class="column">
          <vb-field :label="$t('contacts.common.lastName')" :help="{show: errors.has('lastName'), message: $t('fields.requiredMessage'), level: 'is-danger'}">
            <input slot="field" class="input" type="text" v-model="instance.lastName" placeholder="Snow"
              name="lastName" v-validate:lastName.initial="'required'" :class="{'is-danger': errors.has('lastName')}"/>
          </vb-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <vb-field :label="$t('contacts.common.email')" :help="{show: errors.has('email'), message: $t('fields.invalidEmail'), level: 'is-danger'}">
            <input slot="field" class="input" type="text" v-model="instance.email" placeholder="someone@something.com"
              name="email" v-validate:email.initial="'required|email'" :class="{'is-danger': errors.has('email')}"/>
          </vb-field>
        </div>
        <div class="column">
          <vb-field :label="$t('contacts.common.phone')">
            <input slot="field" class="input" type="text" v-model="instance.phone" placeholder="+1555555555"/>
          </vb-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <vb-field :label="$t('contacts.common.age')">
            <input slot="field" class="input" type="number" min="0" v-model="instance.age" placeholder="25"/>
          </vb-field>
        </div>
        <div class="column">
          <vb-field :label="$t('contacts.common.city')">
            <input slot="field" class="input" type="text" v-model="instance.city" placeholder="New York"/>
          </vb-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <vb-field :label="$t('contacts.common.country')">
            <span class="select" slot="field">
              <select v-model="instance.country">
                <option value="">-- {{ $t('contacts.common.country') }} --</option>
                <option v-for="(value, key) in countries" :value="key">{{ value.name }}</option>
              </select>
            </span>
          </vb-field>
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
    'vb-field': fields.vbField
  },
  data () {
    return {
      instance: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        age: '',
        city: '',
        country: ''
      },
      countries: countriesList.countries
    }
  },
  created () {
    if (this.id) {
      api.contacts.get(this.id).then((result)=> {
        this.instance = result.data
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
      api.contacts.create(this.instance).then((result)=> {
        this.addMessage({
          text: 'Contact created successfully',
          type: 'success'
        })
        this.$router.push({name: 'admin.contacts'})
      }).catch((error)=> { /* Do nothing here */})
    },
    update () {
      api.contacts.update(this.instance._id, this.instance).then((result)=> {
        this.addMessage({
          text: 'Contact updated successfully',
          type: 'success'
        })
        this.$router.push({name: 'admin.contacts'})
      }).catch((error) => { /* Do nothing here */ })
    },
    cancel () {
      this.$router.push({name: 'admin.contacts'})
    }
  }

}
</script>

<style lang="css">
</style>
