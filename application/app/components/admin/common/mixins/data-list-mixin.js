export default {
  computed: {
    hasNext () {
      return this.skip + this.limit < total
    },
    hasPrevious () {
      return this.skip - this.limit >= 0
    }
  },
  methods: {
    loadItems () {
      this.dataSource.find({
        $skip: this.skip,
        $limit: this.limit
      }).then((result) => {
        this.items = result.data.data
        this.total = result.data.total
        this.limit = result.data.limit
      }).catch((error) => { /* Do nothing. Errors are handled globally */})
    },
    next () {
      if (this.hasNext) {
        this.skip += this.limit
        this.loadItems()
      }
    },
    previous () {
      if (this.hasPrevious) {
        this.skip -= this.limit
        this.loadItems()
      }
    }
  },
  created () {
    this.loadItems()
  }
}
