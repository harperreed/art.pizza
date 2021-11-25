<template>
  <BaseLayout>
    <div v-if="contract">
      <ContractBox
        :contract="contract"
      />

      <Assets :assets="contract.assets" />

      <!-- <pre>
        {{ contract }}
      </pre> -->
    </div>
    <div
      v-else
      class="animate-pulse"
    >
      Loading contract...
      <Loader />
    </div>
  </BaseLayout>
</template>

<script>
import ContractBox from '@/components/Utils/ContractBox.vue';
import BaseLayout from '@/components/Layout/BaseLayout.vue';
import Assets from '@/components/Utils/Assets.vue';
import Loader from '@/components/Utils/Loader.vue';
import nfts from '@/mixins/nfts';

export default {
  name: 'ContractView',
  components: {
    BaseLayout,
    ContractBox,
    Assets,
    Loader,

  },
  mixins: [nfts],
  data() {
    return {
      asset: undefined,
      nameAssets: undefined,
      contract: undefined,
    };
  },

  computed: {

  },
  title() {
    if (this.asset) {
      return `${this.asset.name}`;
    }
    return 'loading asset...';
  },
  watch: {
    contract() {
      if (this.contract) {
        console.log(this.contract);
        this.pageTitle = this.contract.name;
      }
    },
  },

  async created() {
    console.log(this.$route.params);
    const { contractAddress } = this.$route.params;
    console.log(contractAddress);

    this.contract = await this.getContract(contractAddress);
  },

};
</script>

<style>

</style>
