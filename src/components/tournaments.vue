<template>
  <center v-if="isLoading"><strong>Loading...</strong></center>
  <h3 v-if="!tourn">(◓Д◒)✄╰⋃╯ 该时段没有比赛</h3>
  <div class="tournaments" v-for="item in tourn">
    <h3 v-if="item.month" class="tourn-month">{{*item.month}}</h2>
    <div class="list-item" v-for="detail in item.turns">
      <ul class="main">
        <li class="level"><strong>{{*detail.level}}</strong></li>
        <li class="name"><strong>{{*detail.name}}</strong></li>
      </ul>
      <ul class="detail">
        <li class="place">{{*detail.place}}</li>
        <li class="start-date">{{*detail.startDate}}</li>
        <li class="type">{{*detail.type}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'tournaments',

    data() {
      return {
        tourn: [],
        isLoading: true
      }
    },

    ready() {

    },

    route: {
      data({to}) {
        const type = to.params.type;

          return this.$http.get('/atp/tournaments')
            .then( (res) => {
              let data = res.data.turnOfYear;
              let tourn = [];

              this.isLoading = false;

              if (type === 'month') {
                tourn.push( data[ (new Date()).getMonth() ] );
              } else if (type === 'recent' && res.data.recent) {

                tourn = [{
                  month: '今日赛事',
                  turns: res.data.recent
                }];

              } else {
                tourn = data;
              }

              return {
                tourn: tourn
              };
          });
      }
    },

    methods: {
    }

  }
</script>
<style lang="sass">
  @import '../variables';
  .tournaments {
    .main, .detail {
      display: inline-block;
      padding-left: 0;
      margin: 0;
      list-style: none;
      height: 100%;
    }
    .main {
      float: left;
      .name {
        font-size: 1.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 12rem;
      }
      .level {
        color: $green;
      }
    }
    .detail {
      float: right;
      text-align: right;
      li {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 9rem;
      }
    }
  }
</style>
