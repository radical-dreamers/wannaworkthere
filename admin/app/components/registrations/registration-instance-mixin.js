export default {

  computed: {
    /**
     * gives us an array of languages from the item's languages field
     * @returns {Array} the list of programming languages
     */
    languageArray () {

      return this.item.languages ? this.item.languages.split(',') : []
    },
    /**
     * gives us an array limited by the component's maxLanguages property
     */
    shownLanguageArray () {
      if (this.maxLanguages) {
          return this.languageArray.slice(0, this.maxLanguages)
      } else {
        return this.languageArray
      }

    }
  }
}
