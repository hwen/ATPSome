<template>
	<center v-if="isLoading"><strong>Loading...</strong></center>
	<h3 class="rank-date" v-if="date">{{*date}} 积分排名</h2>
	<div class="list-item" v-for="item in ranks">
		<span class="head-info">{{*item.rank}}</span>
		<strong class="player">{{*item.player}}</strong>
		<span class="age">&nbsp;&nbsp;<strong>{{*item.age}}</strong> 岁</span>
		<ul class="detail-box">
			<li class="points">积分：{{*item.points}}</li>
			<li class="tourn">参赛站：{{*item.tourn}}</li>
			<li class="country">国家： {{*item.country}}</li>
		</ul>
	</div>
</template>
<script>
	export default {
		name: 'ranks',

		data() {
			return {
				ranks: [],
				date: '',
				isLoading: true
			}
		},

		ready() {
			this.$http.get('/atp/rank')
				.then( (res) => {
					this.ranks = res.data.items;
					this.date = res.data.date;

					this.isLoading = false;
				}, (err) => {
					console.log(err);
				});
		},

		methods: {

		}
	}
</script>
