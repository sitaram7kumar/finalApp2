<template>
  <section class="card">
    <div class="show-details" v-if="!loading && details">
          <div class="show-details-image">
              <figure v-if="details.image">
                  <img :src="details.image.medium" />
              </figure>
          </div>
          <div class="show-details-info">
              <h1>
                  <a :href="details.officialSite" target="_blank"> {{ details.name }}</a>
              </h1>
              <small>{{ details.language}} | {{ joinArray(details.genres) }} | {{ details.type }}</small>
              <p class="price" v-if="details.rating">
                {{content.rating}}: <Rating :rating="details.rating && details.rating.average" />
              </p>
              <p v-if="details.schedule">
                  {{content.schedule}}: [
                  <label v-for="(v, k, index) in details.schedule" :key="k">
                      {{ printKeyValue(details.schedule, k, index) }}
                  </label> ]
              </p>
              <p v-if="details.externals">
                  <label>{{content.externals}}: </label>
                  [<label v-for="(v, k, index) in details.externals" :key="k">
                    {{ printKeyValue(details.externals, k, index) }}
                  </label>]
              </p>
              <p v-if="details.summary">{{ details.summary | safeHtml}}</p>
          </div>
      </div>
      <div v-if="loading">{{content.loadingMsg}}</div>
      <div class="error" v-if="error">{{error}}</div>
      <div v-if="casting && casting.length">
          <h3>{{content.casting}}</h3>
          <div class="casting-block" >
            <figure v-for="(cast, index) in casting" :key="cast.person.id +' '+index">
              <img v-if="cast.person.image" :src="cast.person.image.medium" />
              <div class="no-image" v-else><span>{{content.noImage}}</span></div>
              <figcaption>{{ cast.person.name }}</figcaption>
            </figure>
          </div>
      </div>
  </section>
</template>
<script>
import { getShowDetails } from '@/api'
import Rating from '@/components/rating.vue'
import eventBus from '@/event-bus'

export default {
  name: 'show-details',
  data: () => {
    return {
      details: null,
      casting: null,
      loading: false,
      error: null,
      content: {
        rating: 'Rating',
        schedule: 'Schedule',
        externals: 'Externals',
        loadingMsg: 'Loading...',
        casting: 'Casting',
        noImage: 'No Image'
      }
    }
  },
  components: { Rating },
  created () {
    eventBus.$on('change-input', data => {
      this.goHome()
    })
  },
  filters: {
    safeHtml (v) {
      return v.replace(/(<([^>]+)>)/ig, '')
    }
  },
  methods: {
    goHome () {
      if (this.$route.path !== '/') { this.$router.push('/') }
    },
    printKeyValue (obj, key, index) {
      return `${key}: ${obj[key]} ${Object.keys(obj).length > index + 1 ? ', ' : ''}`
    },
    joinArray (ary) {
      return ary.join(',')
    }
  },
  async mounted () {
    this.loading = true
    const showid = this.$route.params.showid
    if (!isNaN(showid)) {
      try {
        const allDetails = await getShowDetails(showid)
        this.loading = false
        this.details = allDetails[0].data
        this.casting = allDetails[1].data
      } catch (e) {
        this.goHome()
      }
    } else {
      this.goHome()
    }
  }
}
</script>

<style lang="less" scoped>
    .show-details {
        display: flex;
        flex-flow: column;
        @media (min-width: 769px) {
            flex-flow: row;
        }
        .show-details-info {
            text-align: left;
            font-size: 14px;
        }
    }
    .casting-block {
        display: flex;
        width: 100%;
        overflow-x: auto;
        figure {
          @media (max-width: 768px) {
              margin: 25px;
          }
          img {
            @media (max-width: 768px) {
                width: 180px;
            }
          }
        }
        .no-image {
          width: 210px;
          height: 295px;
          display: flex;
          span {
            margin: auto;
          }
        }
    }
</style>
