export default {
  computed: {
    hasNext () {
      return this.skip + this.limit < this.total
    },
    hasPrevious () {
      return this.skip - this.limit >= 0
    },
    minRecord () {
      return this.skip + 1
    },
    maxRecord () {
      return this.skip + this.items.length
    }
  },
  methods: {
    loadItems (filters) {
      let innerFilters = {
        $skip: this.skip,
        $limit: this.limit
      }
      if(filters) {
        Object.assign(innerFilters, filters)
      }
      this.dataSource.find(innerFilters).then((result) => {
        this.items = result.data.data
        this.total = result.data.total
        this.limit = result.data.limit
      }).catch((error) => { /* Do nothing. Errors are handled globally */})
    },
    /**
     * [next description]
     * @param  {Object} filters An optional parameter containing all custom
     * filters for a concrete data list.
     * @return Function         [description]
     */
    next (filters) {
      if (this.hasNext) {
        this.skip += this.limit
        this.loadItems(filters)
      }
    },
    previous (filters) {
      if (this.hasPrevious) {
        this.skip -= this.limit
        this.loadItems(filters)
      }
    }
  },
  created () {
    this.loadItems()
  }
}
