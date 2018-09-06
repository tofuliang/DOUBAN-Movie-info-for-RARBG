// ==UserScript==
// @name         DOUBAN Movie info for RARBG
// @namespace    http://rarbg.to/
// @version      0.4.4
// @description  Adds douban movie info to RARBG.to
// @author       tofuliang
// @match        https://rarbg.to/*
// @match        http://rarbg.to/*
// @match        https://rarbg.is/*
// @match        http://rarbg.is/*
// @match        https://rarbgprx.org/*
// @match        http://rarbgprx.org/*
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @connect      api.douban.com
// ==/UserScript==

function isEmpty(s) {
    return !s || s === 'N/A';
}

$('body').on('mouseenter', 'a[data-imdbId]', function() {
    var imdbId = $(this).attr('data-imdbId');
    var aTag = this;
    overlib('<span>数据加载中...</span>');
    function showDouBanInfo(data,aTag) {
        var html = '<style type="text/css"> .db-container {width: 600px; } .db-title p {font-size: x-large; margin: 5px 0px; text-align: center; font-weight: bolder; } .db-left {width: 150px; float: left; text-align: center; } .db-poster {margin: 10px 10px; text-align: center; } .db-score {margin: 0 10px; } .db-score p {font-size: large; } .db-info {width: 450px; float: right; } </style>';
        html += '<div class="db-container">';
        html += '    <div class="db-title">';
        html += '        <p>' + data.title + ' ' + data.alt_title + ' (' + data.attrs.year.join(' / ') + ')</p>';
        html += '    </div>';
        html += '    <div class="db-left"><div class="db-poster"><img style="max-width: 135px;" src="' + data.image + '"></div>';
        html += '    <div class="db-score">';
        html += '        <p>' + data.rating.average + ' / ' + data.rating.numRaters + '</p>';
        html += '    </div></div>';
        html += '    <div class="db-info">';
        if (!isEmpty(data.attrs.pubdate)) { html += '        <p>上映时间: ' + data.attrs.pubdate.join(' / ') + '</p>'; }
        if (!isEmpty(data.attrs.movie_duration)) { html += '        <p>片长: ' + data.attrs.movie_duration.join(' / ') + '</p>'; }
        if (!isEmpty(data.attrs.title)) { html += '        <p>别名: ' + data.attrs.title.join(' / ') + '</p>'; }
        if (!isEmpty(data.attrs.director)) { html += '        <p>导演: ' + data.attrs.director.join(' / ') + '</p>'; }
        if (!isEmpty(data.attrs.writer)) { html += '        <p>编剧: ' + data.attrs.writer.join(' / ') + '</p>'; }
        if (!isEmpty(data.attrs.cast)) { html += '        <p>主演: ' + data.attrs.cast.join(' / ') + ' </p>'; }
        if (!isEmpty(data.attrs.movie_type)) { html += '        <p>类型: ' + data.attrs.movie_type.join(' / ') + '</p>'; }
        if (!isEmpty(data.attrs.country)) { html += '        <p>制片国家/地区: ' + data.attrs.country.join(' / ') + '</p>'; }
        if (!isEmpty(data.attrs.language)) { html += '        <p>语言: ' + data.attrs.language.join(' / ') + '</p>'; }
        if (!isEmpty(data.summary)) { html += '        <p>简介: ' + data.summary + '</p>'; }
        html += '    </div>';
        html += '</div>';
        overlib(html);
        var link = data.mobile_link.replace('m.douban.com','douban.com');
        $(aTag).attr('href',link).attr('target','_blank');
    }
    var data = GM_getValue('douBanInfo_' + imdbId, undefined);

    if (undefined !== data && +(new Date()) - data.lastModify < 86400000) {
        showDouBanInfo(data,aTag);
        return;
    }

    GM_xmlhttpRequest({
        method: 'GET',
        url: 'https://api.douban.com/v2/movie/imdb/' + imdbId,
        onload: function(response) {
            var data = JSON.parse(response.responseText);
            if (5000 === data.code) {
                overlib('<span>你太潮了,豆瓣都没资料...</span>');
            }else if (!isEmpty(data.alt)) {
                data.lastModify = +(new Date());
                GM_setValue('douBanInfo_' + imdbId, data);
                showDouBanInfo(data,aTag);
            }else{
                overlib('<span>天晓得发生什么是了...</span>');
            }
        },
        onerror: function () {
            overlib('<span>你网络有问题...</span>');
        },
        ontimeout: function () {
            overlib('<span>豆瓣不鸟你...</span>');
        }
    });
});

$(document).on('ready AutoPagerize_DOMNodeInserted', function(e) {
    $('a[href^="/torrents.php?imdb="]').each(function(i,e){
        var ee = $(e);
        if(ee.attr('doubaned') =='doubaned') return;
        var imdbId = $(this).attr('href').split("=").pop();
        ee.after('<a data-imdbId="'+imdbId+'" style="margin-left:5px;"><img src="https://img3.doubanio.com/favicon.ico" style="height:18px;"></img></a>');
        ee.attr('doubaned','doubaned');
    });
    $('.lista span:contains("IMDB:")[hightlighted!=1]').each(function() {
        var txt = $(this).text();
        var rate = txt.match(/MDB: ([\d\.]+)\/\d+/);
        if (undefined !== rate[1] && 6.0 <= parseFloat(rate[1])) {
            $(this).html($(this).text().replace(rate[1], '<span style="color: rgb(183, 0, 0); font-size: large;">' + rate[1] + '</span>')).attr('hightlighted', 1);
        }
    });
    var thisYear = (new Date()).getFullYear();
    var years = [thisYear - 2, thisYear - 1, thisYear];
    for (var i in years) {
        $('a[href^="/torrent/"]:contains("' + years[i] + '")[hightlighted!=1]').each(function() {
            $(this).html($(this).text().replace(years[i], '<span style="font-size: large; font-weight: bold; color: #CE00B9; ">' + years[i] + '</span>')).attr('hightlighted', 1);
        });
    }
});
$(document).bind("ready", function() {});
$(document).ready(function() {
    $(document).trigger("ready");
});
