<template>
	<center v-if="isLoading"><strong>Loading...</strong></center>
	<h3 class="stats-title">{{title}}</h2>
	<div class="list-item fst-return-point-won" v-for="item in fstReturnPointWon">
		<span class="head-info">{{*item.rank}}</span>
		<strong class="player">&nbsp;{{*item.name}}</strong>
		<ul class="detail-box">
			<li class="percent">赢球率：{{*item.percentage}}%</li>
			<li class="point-won">得分：{{*item.pointsWon}}</li>
			<li class="total-point"><strong>总分： {{*item.totalPoints}}</strong></li>
			<li><strong>比赛数：{{*item.matches}}</strong></li>
		</ul>
	</div>
</template>
<script>
	export default {
		name: 'fstReturnPointWon',

		data() {
			return {
				fstReturnPointWon: [],
				title: '',
				isLoading: true
			}
		},

		ready() {
			let currentYear = (new Date()).getFullYear();
			let api = `/atp/stats/1st-serve-return-points-won/${currentYear}/all`;	
						
			this.$http.get(api)
				.then( (res) => {
					this.fstReturnPointWon = res.data.detail;
					this.title = currentYear + '接一发赢球率排名';
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
	.fst-return-point-won {
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
