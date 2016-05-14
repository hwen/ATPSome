<template>
	<center v-if="isLoading"><strong>Loading...</strong></center>
	<h3 class="stats-title">{{title}}</h3>
	<div class="list-item stats-aces" v-for="item in aces">
		<span class="head-info">{{*item.rank}}</span>
		&nbsp;&nbsp;
		<strong class="player">{{*item.name}}</strong>
		<ul class="detail-box">
			<li class="aces-number">ace数：
				<strong>{{*item.acesNumber}}</strong>
			</li>
			<li class="tourn">比赛数：{{*item.matches}}</li>
		</ul>
	</div>
</template>
<script>
	export default {
		name: 'aces',

		data() {
			return {
				title: '',
				aces:[],
				isLoading: true
			};
		},

		ready() {
			let currentYear = (new Date()).getFullYear();
			let api = `/atp/stats/aces/${currentYear}/all`;
			
			this.$http.get(api)
				.then( (res) => {
					let data = res.data;
					this.title = currentYear + ' Aces 数排名';
					this.aces = data.detail;

					this.isLoading = false;
				}, (err) => console.log(err) );
		}
	}
</script>
<style lang="sass">
	@import '../variables';
	.stats-aces {
		.detail-box {
		    li {
		    	padding: .3rem 0;
		    }
		}
		.aces-number {
			strong {
				color: $green;
			}
		}		
	}

</style>