<template>
	<center v-if="isLoading"><strong>Loading...</strong></center>
	<h3 class="stats-title">{{title}}</h2>
	<div class="list-item return-game-won" v-for="item in returnGameWon">
		<span class="head-info">{{*item.rank}}</span>
		<strong class="player">&nbsp;{{*item.name}}</strong>
		<ul class="detail-box">
			<li class="percent">赢球率：{{*item.percentage}}%</li>
			<li class="game-won">获胜局数：{{*item.gamesWon}}</li>
			<li class="total-game"><strong>总局数： {{*item.totalGames}}</strong></li>
			<li><strong>比赛数：{{*item.matches}}</strong></li>
		</ul>
	</div>
</template>
<script>
	export default {
		name: 'returnGameWon',

		data() {
			return {
				returnGameWon: [],
				title: '',
				isLoading: true
			}
		},

		ready() {
			let currentYear = (new Date()).getFullYear();
			let api = `/atp/stats/return-games-won/${currentYear}/all`;
			
			this.$http.get(api)
				.then( (res) => {
					this.returnGameWon = res.data.detail;
					this.title = currentYear + '接发局赢球率排名';

					this.isLoading = false;
				}, (err) => {
					console.log(err);
				});
		},

		methods: {

		}
	}
</script>
<style lang="sass">
	@import '../variables';
	.return-game-won {
		height: 5rem;
		line-height: 5rem;
		.detail-box {
			line-height: normal;
			margin-top: .2rem;
			.percent {
				font-weight:bold;
				color: $green;
			}
		}
	}
</style>