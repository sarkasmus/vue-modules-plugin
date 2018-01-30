export default {
  name: 'exampleModule',
  data () {
    return {
      propData: 'property from data function'
    }
  },
  computed: {
    msg () {
      return 'this message was returned by computed property msg'
    }
  },
  methods: {
    emitEvent () {
      this.$component.$emit('clicked', [123, 5])
    },

    getStoreProperty () {
      return this.$store.state.property
    },

    eventHandle (payload) {
      console.log(payload)
    }
  }
}
