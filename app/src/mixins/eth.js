const axios = require('axios').default;

export default {
  data() {
    return {
      balance: 0,
    };
  },
  watch: {
    async ethAddress(address) {
      if (!this.balance) {
        this.balance = await this.getBalance(address);
      }
    },

  },
  methods: {
    async getBalance(ethAddress) {
      const balanceUrl = `/api/getBalance/${ethAddress}`;
      try {
        const balanceResponse = await axios.get(balanceUrl);
        console.log(balanceResponse);
        const balance = balanceResponse.data;
        return balance;
      } catch (error) {
        console.log(error);
      }
      return 0;
    },

  },
};
