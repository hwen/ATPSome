<template>
	<center v-if="isLoading"><strong>Loading...</strong></center>
	<h3 class="stats-title">{{title}}</h2>
	<div class="list-item break-point-save" v-for="item in breakPointSave">
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
		name: 'breakPointSave',

		data() {
			return {
				breakPointSave: [],
				title: '',
				isLoading: true
			}
		},

		ready() {
			let currentYear = (new Date()).getFullYear();
			let api = `/atp/stats/break-points-saved/${currentYear}/all`;
							
			this.$http.get(api)
				.then( (res) => {
					this.breakPointSave = res.data.detail;
					this.title = currentYear + '挽救破发点排名';

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
	.break-point-save {
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