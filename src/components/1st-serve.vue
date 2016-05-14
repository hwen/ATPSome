<template>
	<center v-if="isLoading"><strong>Loading...</strong></center>
	<h3 class="stats-title">{{title}}</h3>
	<div class="list-item fst-serve" v-for="item in fstServe">
		<span class="head-info">{{*item.rank}}</span>
		&nbsp;&nbsp;
		<strong class="player">{{*item.name}}</strong>
		<ul class="detail-box">
			<li class="success-rate">成功率：
				<strong>{{*item.successRate}}%</strong>
			</li>
			<li class="tourn">比赛数：{{*item.matches}}</li>
		</ul>
	</div>
</template>
<script>
	export default {
		name: 'fstServe',

		data() {
			return {
				title: '',
				fstServe:[],
				isLoading: true
			};
		},

		ready() {
			let currentYear = (new Date()).getFullYear();
			let api = `/atp/stats/1st-serve/${currentYear}/all`;

			this.$http.get(api)
				.then( (res) => {
					let data = res.data;
					this.title = currentYear + '一发成功率排名';
					this.fstServe = data.detail;

					this.isLoading = false;
				}, (err) => console.log(err) );
		}
	}
</script>
<style lang="sass">
	@import '../variables';
	.fst-serve {
		.detail-box {
		    li {
		    	padding: .3rem 0;
		    }
		}
		.success-rate {
			strong {
				color: $green;
			}
		}
	}
</style>