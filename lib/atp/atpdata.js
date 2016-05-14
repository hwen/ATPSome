var superagent = require('superagent');
var cheerio = require('cheerio');

// routes
exports.getRank = getRank;
exports.getTournaments = getTournaments;
exports.getPlayerList = getPlayerList;
exports.getPlayerDetail = getPlayerDetail;
exports.getStats = getStats;

function getRank(req, res) {
    var url = "http://www.atpworldtour.com/en/rankings/singles";

    superagent.get(url)
        .end(function (err, sres) {

            if (err) {
                res.send(err);
            }

            var $ = cheerio.load(sres.text);
            var rank = {};

            rank.date = $('.current', '#filterHolder').text();
            rank.items = [];

            var table = $('tbody','#rankingDetailAjaxContainer');

            $('tr', table).each(function(index, element) {
                if ( (index + 1) > 50) return;

                var el = $(element);

                rank.items.push({
                    rank: trim( $('.rank-cell', el).text() ),
                    player: trim( $('.player-cell', el).text() ),
                    country: trim( $('img', el).attr('alt') ),
                    age: trim( $('.age-cell', el).text() ),
                    points: trim( $('.points-cell', el).text() ),
                    tourn: trim( $('.tourn-cell', el).text() )
                });
            });

            res.send(rank);
        });
}


function getTournaments(req, res) {
    var url = 'http://cn.atpworldtour.com/Tournaments/Event-Calendar.aspx';

    superagent.get(url)
        .end(function (err, sres) {

            if (err) {
                res.send(err);
            }

            var $ = cheerio.load(sres.text);
            var tournaments = {};
            tournaments.turnOfYear = [];
            tournaments.recent = [];

            tournaments.year = $('h1', '#calendarHeader').text();

            $('.calendarTable').each(function(index, el) {
                var tempTurnList = {};
                tempTurnList.month = (index+1) + '月';
                tempTurnList.turns = [];

                $('tr', el).each(function(i, element) {
                    var tdArr = $('td', element);

                    var detail = {
                        name: trim( $('a', tdArr[2]).text() ),
                        place: trim( $($('strong', tdArr[2])[1]).text() ),
                        level: getTurnLevel(tdArr[0]),
                        startDate: getStartDate($(tdArr[1]).text()),
                        type: trim($(tdArr[3]).text() ),
                        champion: trim( $($('a', tdArr[7])[0]).text() )
                    };

                    tempTurnList.turns.push(detail);

                    if ( $(tdArr[1]).hasClass('liveMatch') ) {
                        tournaments.recent.push(detail);
                    }
                });

                tournaments.turnOfYear.push(tempTurnList);
            });

            res.send(tournaments);


            function getTurnLevel(element) {
                var imgTxt = $('img', element).attr('alt');

                if (imgTxt.indexOf('250') > -1)
                    return 'ATP250';
                else if (imgTxt.indexOf('500') > -1)
                    return 'ATP500';
                else if (imgTxt.indexOf('1000') > -1)
                    return 'ATP1000';
                else if (imgTxt.indexOf('atp finals') > -1)
                    return '年终总决赛';
                else
                    return imgTxt;
            }

            function getStartDate(str) {
              return str.replace(/[^0-9|.]/ig, '');
            }
        });

}

//top 200 guys
function getPlayerList(req, res) {
    var urls = [
        'http://cn.atpworldtour.com/Rankings/Singles.aspx?d=18.04.2016&r=1&c=#',
        'http://cn.atpworldtour.com/Rankings/Singles.aspx?d=18.04.2016&r=101&c=#'
    ];

    var playerList = [];

    catchPlayerList(urls[0], res, function(list1) {

        catchPlayerList(urls[1], res, function(list2) {
            playerList = list1.concat(list2);

            res.send(playerList);
        });

    });
}


function catchPlayerList(url, res, callback) {

    superagent.get(url)
        .end(function(err, sres) {

            if (err) {
                res.send(err);
            }

            var $ = cheerio.load(sres.text);
            var playerList = [];
            var baseUrl = 'http://cn.atpworldtour.com';

            var tr = $('tr', '.bioTableAlt');

            for (var i=1; i<tr.length; i++) {
                var firstTd = $('.first', tr[i]);
                playerList.push({
                    name: trim( $('a', firstTd).text() ),
                    nameEn: getEnglishName($('a', firstTd).attr('href')),
                    url: baseUrl + $('a', firstTd).attr('href'),
                    rank: trim( $('.rank', firstTd).text() )
                });
            }

            callback(playerList);
        });

    function getEnglishName(str) {
        var temp = str.split('/');

        temp = temp.filter(function(item) {
            if (item.indexOf('.aspx') > -1) {
                return true;
            }
        });

        temp = temp[0].substr(0, temp[0].indexOf('.aspx'));

        return temp.replace(/-/gi, ' ');
    }
}

function getPlayerDetail(req, res) {
    var url = 'http://cn.atpworldtour.com/Tennis/Players/Al/R/Radu-Albot.aspx';

    var baseUrl = 'http://cn.atpworldtour.com';

    superagent.get(url)
        .end(function(err, sres) {
            if (err) {
                res.send(err);
            }

            var $ = cheerio.load(sres.text);
            var infoList = $('li', '#playerBioInfoList');

            var playerDetail = {
                name: trim( $('h1', '#playerBioInfoCardHeader').text() ),
                age: trim( $(infoList[0]).text() ),
                shot: baseUrl + $('img', '#playerBioHeadShot').attr('src'),
                birthplace: trim( $(infoList[1]).text() ),
                height: trim( $(infoList[3]).text() ),
                type: trim( $(infoList[5]).text() ),
                turnPro: trim( $(infoList[6]).text() ),
                website: trim( $(infoList[7]).text() )
            };

            res.send(playerDetail);
        })
}

function getStats(req, res) {
    var params = {
        statsType: req.params.statsType,
        year: req.params.year,
        surface: req.params.surface
    };

    console.log(params);

    var fn = getStatsTypeFn(params.statsType);

    fn(params.year, params.surface, function(data) {
        res.send(data);
    });
}


function getStatsTypeFn(statsType) {
    var fn;
    switch(statsType) {
        case 'aces':
            fn = getAceStats;
            break;
        case '1st-serve':
            fn = getFirstServe;
            break;
        case '1st-serve-points-won':
            fn = getFirstSPW;
            break;
        case '2nd-serve-points-won':
            fn = getSecondSPW;
            break;
        case 'service-games-won':
            fn = getSGW;
            break;
        case 'break-points-saved':
            fn = getBPS;
            break;
        case '1st-serve-return-points-won':
            fn = getFirstSRPW;
            break;
        case '2nd-serve-return-points-won':
            fn = getSecondSRPW;
            break;
        case 'break-points-converted':
            fn = getBPC;
            break;
        case 'return-games-won':
            fn = getRGW;
            break;
        default:
            fn = function(){};
    };

    return fn;
}

function getBPC(year, surface, callback) {
    var url = 'http://www.atpworldtour.com/en/stats/break-points-converted/'+
    year + '/' + surface + '/all/?ajax=true';

    catchStatsDataPoints(url, function(data) {
        callback(data);
    });
}

function getRGW(year, surface, callback) {
    var url = 'http://www.atpworldtour.com/en/stats/return-games-won/'+
    year + '/' + surface + '/all/?ajax=true';

    catchStatsDataGames(url, function(data) {
        callback(data);
    });
}

function getSecondSRPW(year, surface, callback) {
    var url = 'http://www.atpworldtour.com/en/stats/2nd-serve-return-points-won/'+
    year + '/' + surface + '/all/?ajax=true';

    catchStatsDataPoints(url, function(data) {
        callback(data);
    });
}

function getFirstSRPW(year, surface, callback) {
    var url = 'http://www.atpworldtour.com/en/stats/1st-serve-return-points-won/'+
    year + '/' + surface + '/all/?ajax=true';

    catchStatsDataPoints(url, function(data) {
        callback(data);
    });
}

function getBPS(year, surface, callback) {
    var url = 'http://www.atpworldtour.com/en/stats/break-points-saved/'+
    year + '/' + surface + '/all/?ajax=true';

    catchStatsDataPoints(url, function(data) {
        callback(data);
    });
}

function getSGW(year, surface, callback) {
    var url = 'http://www.atpworldtour.com/en/stats/service-games-won/'+
    year + '/' + surface + '/all/?ajax=true';

    catchStatsDataGames(url, function(data) {
        callback(data);
    });
}

function getSecondSPW(year, surface, callback) {
    var url = 'http://www.atpworldtour.com/en/stats/2nd-serve-points-won/'+
    year + '/' + surface + '/all/?ajax=true';

    catchStatsDataPoints(url, function(data) {
        callback(data);
    });
}

function getFirstSPW(year, surface, callback) {
    var url = 'http://www.atpworldtour.com/en/stats/1st-serve-points-won/'+
    year + '/' + surface + '/all/?ajax=true';

    catchStatsDataPoints(url, function(data) {
        callback(data);
    });
}

function getFirstServe(year, surface, callback) {
    var url = 'http://www.atpworldtour.com/en/stats/1st-serve/'+
    year + '/' + surface + '/all/?ajax=true';

    catchStatsData(url, function(data, $) {

        $('.stats-listing-row').each(function(index, element) {
            var tdArr = $(element).children();

            data.detail.push({
                rank: trim( $( $('td', tdArr[0])[0] ).text() ),
                name: trim( $('a', '.stats-listing-name', tdArr[0]).text() ),
                successRate: trim( $(tdArr[1]).text() ),
                matches: trim( $(tdArr[2]).text() )
            });
        });

        callback(data);
    });
}

function getAceStats(year, surface, callback) {
    var url = 'http://www.atpworldtour.com/en/stats/aces/'+
    year + '/' + surface + '/all/?ajax=true';

    catchStatsData(url, function(aceStats, $) {

        $('.stats-listing-row').each(function(index, element) {
            var tdArr = $(element).children();

            aceStats.detail.push({
                rank: trim( $( $('td', tdArr[0])[0] ).text() ),
                name: trim( $('a', '.stats-listing-name', tdArr[0]).text() ),
                acesNumber: trim( $(tdArr[1]).text() ),
                matches: trim( $(tdArr[2]).text() )
            });
        });

        callback(aceStats);
    });
}


function catchStatsData(url, callback) {
    superagent.get(url)
        .end(function(err, sres) {

            var $ = cheerio.load(sres.text);

            var temp = {};

            temp.title = $('.section-title', '.stats-listing-wrapper').text();
            temp.detail = [];

            callback(temp, $);
        });
}


function catchStatsDataPoints(url, callback) {
    superagent.get(url)
        .end(function(err, sres) {

            var $ = cheerio.load(sres.text);

            var temp = {};

            temp.title = $('.section-title', '.stats-listing-wrapper').text();
            temp.detail = [];

            $('.stats-listing-row').each(function(index, element) {
                var tdArr = $(element).children();

                temp.detail.push({
                    rank: trim( $( $('td', tdArr[0])[0] ).text() ),
                    name: trim( $('a', '.stats-listing-name', tdArr[0]).text() ),
                    percentage: trim( $(tdArr[1]).text() ),
                    pointsWon: trim( $(tdArr[2]).text() ),
                    totalPoints: trim( $(tdArr[3]).text() ),
                    matches: trim( $(tdArr[4]).text() )
                });
            });

            callback(temp);
        });
}

function catchStatsDataGames(url, callback) {
    superagent.get(url)
        .end(function(err, sres) {

            var $ = cheerio.load(sres.text);

            var temp = {};

            temp.title = $('.section-title', '.stats-listing-wrapper').text();
            temp.detail = [];

            $('.stats-listing-row').each(function(index, element) {
                var tdArr = $(element).children();

                temp.detail.push({
                    rank: trim( $( $('td', tdArr[0])[0] ).text() ),
                    name: trim( $('a', '.stats-listing-name', tdArr[0]).text() ),
                    percentage: trim( $(tdArr[1]).text() ),
                    gamesWon: trim( $(tdArr[2]).text() ),
                    totalGames: trim( $(tdArr[3]).text() ),
                    matches: trim( $(tdArr[4]).text() )
                });
            });

            callback(temp);
        });
}

//remove space of start and end of the string
function trim(str) {
  return str.replace(/^\s+|\s+$/g, '');
}
