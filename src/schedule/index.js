import Vue from 'vue';
import Resource from 'vue-resource';

Vue.use(Resource);
let schedule = {};

export default schedule 

schedule.fetch = (callback) => {
	let queryUrl = getUrl();

	Vue.http.get(queryUrl.urlCurr)
		.then( (res) => {
			Vue.http.get(queryUrl.urlNext)
				.then( (sres) => {
					callback([
						{
							title: '今日比赛',
							data: formatData(res.data.data)
						},
						{
							title: '明日比赛',
							data: formatData(sres.data.data)
						}
					]);
				});
		});
};


function formatData(data) {
	let temp = [];
	data.forEach( (item) => {
		if (item.gameFName === '网球') {

			temp.push({
				name: item.name.split(' ')[0],
				startTime: item.startTime.substr(8, 2) 
					+ ':' + item.startTime.substr(10, 2),
				status: getStatus(item.status),
				competitors: item.competitors||[],
				link: item.playLink||''
			});

		}
	});

	return temp;
}

function getStatus(status) {

	switch(status) {
		case 0:
			return '未开始';
		case 1:
			return '直播中';
		case 2:
			return '已结束';
		default:
			return 'unkown';
	};
}

function getUrl() {
	let formatTime = function(time) {
		time = time + '';
	    return time.length === 1 ?
	        '0' + time : time;
	};

	let curr = new Date();

	let next = '' + curr.getFullYear() 
	    + formatTime(curr.getMonth() + 1)
	    + formatTime( (curr.getDate() + 1) );

	curr = '' + curr.getFullYear()
	    + formatTime(curr.getMonth() + 1)
	    + formatTime(curr.getDate());

	let urlCurr = 'http://static.api.lesports.com/sms/v1/someday/live/episodes?caller=1001&startDate='
		+ curr
		+ '&episodeType=2&span=1&liveType=4';

	let urlNext = 'http://static.api.lesports.com/sms/v1/someday/live/episodes?caller=1001&startDate='
		+ next
		+ '&episodeType=2&span=1&liveType=4';

	return {
		urlCurr: urlCurr,
		urlNext: urlNext
	};	
}			

