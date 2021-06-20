<template>
  <div class="box">
    <article class="media">
      <div class="media-left">
        <router-link :to="{ name: 'Assets', params: {ethRoute:ethAddress}}">
          <figure class="image is-64x64">
            <img
              v-if="addressAvatar"
              :src="addressAvatar"
              alt="Image"
            >
            <b-skeleton
              v-else
              width="64px"
              height="64px"
            />
          </figure>
        </router-link>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <strong v-if="ensName">{{ ensName }}</strong> <small v-if="addressTwitterName">{{ addressTwitterName }}</small>
            <br v-if="ensName">
            <small>
              <a
                v-if="addressEtherscan"
                aria-label="reply"
                :href="addressEtherscan"
                target="_blank"
              >
                <b-icon
                  icon="currency-eth"
                  size="is-small"
                /></a>
              {{ ethAddress }}
            </small>
            <br>
            <span v-if="ethBalance"> {{ ethBalance }} Ether </span>

            <b-skeleton
              v-else
              width="20%"
              :animated="true"
            />
          </p>
        </div>
        <nav
          v-if="ensName"
          class="level is-mobile"
        >
          <div class="level-left">
            <a
              v-if="addressLink"
              class="level-item"
              aria-label="reply"
              :href="addressLink"
              target="_blank"
            >
              <b-icon
                icon="link"
                size="is-small"
              />
            </a>
            <a
              v-if="addressTwitterLink"
              class="level-item"
              aria-label="reply"
              :href="addressTwitterLink"
              target="_blank"
            >
              <b-icon
                icon="twitter"
                size="is-small"
              />
            </a>
            <a
              v-if="addressGithubLink"
              class="level-item"
              aria-label="retweet"
              :href="addressGithubLink"
              target="_blank"
            >
              <span class="icon is-small">
                <b-icon
                  icon="github"
                  size="is-small"
                />
              </span>
            </a>
            <a
              v-if="addressEmail"
              class="level-item"
              aria-label="like"
              :href="addressEmail"
              target="_blank"
            >
              <span class="icon is-small">
                <b-icon
                  icon="email"
                  size="is-small"
                />
              </span>
            </a>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<script>
import web3 from '@/mixins/web3';

export default {
  components: {},
  mixins: [web3],
  props: {
    ethAddress: {
      type: String,
      default: '',
    },

  },

  computed: {
    addressAvatar() {
      return `https://effigy.im/a/${this.ethAddress}.svg`;
    },
    addressEmail() {
      if (this.ensData) {
        if ('email' in this.ensData) {
          return `mailto:${this.ensData.email}`;
        }
      }
      return null;
    },
    addressGithubLink() {
      if (this.ensData) {
        if ('vnd.github' in this.ensData) {
          return `https://github.com/${this.ensData['vnd.github']}`;
        }
      }
      return null;
    },
    addressTwitterLink() {
      if (this.ensData) {
        if ('vnd.twitter' in this.ensData) {
          return `https://twitter.com/${this.ensData['vnd.twitter']}`;
        }
      }
      return null;
    },
    addressTwitterName() {
      if (this.ensData) {
        if ('vnd.twitter' in this.ensData) {
          if (this.ensData['vnd.twitter'].includes('@')) {
            return `${this.ensData['vnd.twitter']}`;
          }

          if (this.ensData['vnd.twitter'].includes('twitter.com')) {
            const username = this.ensData['vnd.twitter'].replace('twitter.com/', '').replace('https://', '').replace('http://', '');
            return `@${username}`;
          }

          return `@${this.ensData['vnd.twitter']}`;
        }
      }
      return null;
    },
    addressLink() {
      if (this.ensData) {
        if ('url' in this.ensData) {
          if (this.ensData.url.includes('http')) {
            return `${this.ensData.url}`;
          }
          return `https://${this.ensData.url}`;
        }
      }
      return null;
    },
    addressEtherscan() {
      if (this.ethAddress) {
        return `https://etherscan.io/address/${this.ethAddress}`;
      }
      return null;
    },
  },
  async created() {
    if (!this.ensName) {
      this.ensName = await this.ensLookup(this.ethAddress);
    }
    this.ethBalance = await this.getBalance(this.ethAddress);
  },
};
</script>
