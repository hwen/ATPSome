<template>
	<center v-if="isLoading"><strong>Loading...</strong></center>
	<h3 class="stats-title">{{title}}</h2>
	<div class="list-item break-points-converted" v-for="item in breakPointConvert">
		<span class="head-info">{{*item.rank}}</span>
		<strong class="player">&nbsp;{{*item.name}}</strong>
		<ul class="detail-box">
			<li class="percent">转化率：{{*item.percentage}}%</li>
			<li class="point-won">破发数：{{*item.pointsWon}}</li>
			<li class="total-point"><strong>破发点： {{*item.totalPoints}}</strong></li>
			<li><strong>比赛数：{{*item.matches}}</strong></li>
		</ul>
	</div>
</template>
<script>
	export default {
		name: 'breakPointConvert',

		data() {
			return {
				breakPointConvert: [],
				title: '',
				isLoading: true
			}
		},

		ready() {
			let currentYear = (new Date()).getFullYear();	
			let api = `/atp/stats/break-points-converted/${currentYear}/all`;	
				
			this.$http.get(api)
				.then( (res) => {
					this.breakPointConvert = res.data.detail;
					this.title = currentYear + '破发点转化率排名';

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
	.break-points-converted {
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