/*
 jQuery Toggles v3.1.4
 Copyright 2014 Simon Tabor - MIT License
 https://github.com/simontabor/jquery-toggles / http://simontabor.com/labs/toggles
 */
(function(h){function l(f){var k=h.Toggles=function(b,a){if("boolean"===typeof a&&b.data("toggles"))b.data("toggles").toggle(a);else{for(var c="on drag click width height animate easing type checkbox".split(" "),e={},d=0;d<c.length;d++){var g=b.data("toggle-"+c[d]);"undefined"!==typeof g&&(e[c[d]]=g)}a=this.b=f.extend({drag:!0,click:!0,text:{on:"ON",off:"OFF"},on:!1,animate:250,easing:"swing",checkbox:null,clicker:null,width:50,height:20,type:"compact",event:"toggle"},a||{},e);this.c=b;this.active=
    a.on;b.data("toggles",this);this.h="select"===a.type;this.l=f(a.checkbox);a.clicker&&(this.n=f(a.clicker));this.m();this.k()}};k.prototype.m=function(){function b(a){return f('<div class="toggle-'+a+'">')}var a=this.c.height(),c=this.c.width();a||this.c.height(a=this.b.height);c||this.c.width(c=this.b.width);this.g=a;this.i=c;this.a={f:b("slide"),e:b("inner"),on:b("on"),off:b("off"),d:b("blob")};var e=a/2,d=c-e,g=this.h;this.a.on.css({height:a,width:d,textIndent:g?"":-e,lineHeight:a+"px"}).html(this.b.text.on);
    this.a.off.css({height:a,width:d,marginLeft:g?"":-e,textIndent:g?"":e,lineHeight:a+"px"}).html(this.b.text.off).addClass("active");this.a.d.css({height:a,width:a,marginLeft:-e});this.a.e.css({width:2*c-a,marginLeft:g||this.active?0:-c+a});this.h&&(this.a.f.addClass("toggle-select"),this.c.css("width",2*d),this.a.d.hide());this.a.e.append(this.a.on,this.a.d,this.a.off);this.a.f.html(this.a.e);this.c.html(this.a.f)};k.prototype.k=function(){function b(b){b.target===a.a.d[0]&&a.b.drag||a.toggle()}var a=
    this;if(a.b.click&&(!a.b.clicker||!a.b.clicker.has(a.c).length))a.c.on("click",b);if(a.b.clicker)a.b.clicker.on("click",b);a.b.drag&&!a.h&&a.j()};k.prototype.j=function(){function b(b){a.c.off("mousemove");a.a.f.off("mouseleave");a.a.d.off("mouseup");!c&&a.b.click&&"mouseleave"!==b.type?a.toggle():(a.active?c<-e:c>e)?a.toggle():a.a.e.stop().animate({marginLeft:a.active?0:-a.i+a.g},a.b.animate/2)}var a=this,c,e=(a.i-a.g)/4,d=-a.i+a.g;a.a.d.on("mousedown",function(e){c=0;a.a.d.off("mouseup");a.a.f.off("mouseleave");
    var f=e.pageX;a.c.on("mousemove",a.a.d,function(b){c=b.pageX-f;a.active?(b=c,0<c&&(b=0),c<d&&(b=d)):(b=c+d,0>c&&(b=d),c>-d&&(b=0));a.a.e.css("margin-left",b)});a.a.d.on("mouseup",b);a.a.f.on("mouseleave",b)})};k.prototype.toggle=function(b){this.active!==b&&(b=this.active=!this.active,this.c.data("toggle-active",b),this.a.off.toggleClass("active",!b),this.a.on.toggleClass("active",b),this.l.prop("checked",b),this.c.trigger(this.b.event,b),this.h||(b=b?0:-this.i+this.g,this.a.e.stop().animate({marginLeft:b},
    this.b.animate)))};f.fn.toggles=function(b){return this.each(function(){new k(f(this),b)})}}"function"===typeof define&&define.amd?define(["jquery"],l):l(h.jQuery||h.Zepto||h.ender||h.$||$)})(this);

function pmsLoadCommentForm($, accessTokenRequestUrl) {
    var container = $( '#respond' );
    var comment = $( '#comment' ).val();
    $.get(accessTokenRequestUrl, function (data) {
        container.replaceWith($(data));
        $( '#comment' ).val( comment ).focus();
    });
}

function pmsGooglePlusSigninCallback(authResult) {
    if (authResult.access_token) {
        var $ = jQuery;
        var gplusButton = $('#postmatic-sc-googleplus-button');
        var accessTokenRequestUrl = gplusButton.data('accessTokenRequestUrl');
        var postId = gplusButton.data('postId');
        accessTokenRequestUrl = accessTokenRequestUrl + '&access_token=' + authResult.access_token + '&post_id=' + postId;
        pmsLoadCommentForm($, accessTokenRequestUrl);
    }
}

jQuery(document).ready(function ($) {

    $('.postmatic-sc-toggle').toggles();

    $('.postmatic-sc-button').on('click', function (evt) {
        var scId = $(this).data('scId');
        if(scId) {
            var postId = $(this).data('postId');
            var windowUrl = $(this).attr("href");
            var windowName = $(this).attr("name");
            var windowSize = 'width=650,height=550,scrollbars=yes';
            var popup = window.open(windowUrl, windowName, windowSize);
            var handle;

            var checkPopupLocation = function () {
                try {
                    if (popup && popup.location) {
                        var accessTokenRequestUrl = popup.location.href;
                        if (accessTokenRequestUrl.indexOf('action=pms-' + scId + '-access-token') > 0) {
                            clearInterval(handle);
                            popup.close();

                            // By FK for FB
                            var q = accessTokenRequestUrl.indexOf("#");                            
                            if (q != -1)
                                accessTokenRequestUrl = accessTokenRequestUrl.slice(0,q);

                            accessTokenRequestUrl = accessTokenRequestUrl + '&post_id=' + postId;
                            pmsLoadCommentForm($, accessTokenRequestUrl);
                        }
                    }
                } catch (e) {

                }
            };

            handle = setInterval(checkPopupLocation, 100);
            evt.preventDefault();
            return false;
        }else{
            return true;
        }
    });

});

function init_helpscout_beacon() {
		HS.beacon.config({
				modal: false,
				topArticles: true,
				color: '#DE4F0F',
				icon: 'question',
				attachment: true,
				poweredBy: false
	});
}

