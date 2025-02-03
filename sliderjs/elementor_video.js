(function ($) {
  "use strict";
  var episodes_advanced = function ($scope, $) {
    $scope
      .find(".jws-episodes_advanced-element")
      .eq(0)
      .each(function () {
        var $this = $(this);
        var $container = $this.find(".episodes-content");
        if ($container.hasClass("jws_episodes_advanced_slider")) {
          let next = $this.find(".jws-button-prev");
          let prev = $this.find(".jws-button-next");
          jwsThemeModule.owl_caousel_init($container);
          if ($container.data("nav") !== undefined) {
            next = $($container.data("nav").next);
            prev = $($container.data("nav").prev);
            next.click(function () {
              $container.trigger("next.owl.carousel");
            });
            prev.click(function () {
              $container.trigger("prev.owl.carousel");
            });
            $container.find(".owl-nav").hide();
          }
        }
      });
  };
  var video_category = function ($scope, $) {
    var $wap = $scope.find(".jws-videocat-list");
    $wap.eq(0).each(function () {
      var $container = $(this).find(".jws-videocat");
      jwsThemeModule.owl_caousel_init($container);
    });
  };
  var video_special = function ($scope, $) {
    var $container = $scope.find(".jws-video-special-element");
    $container.eq(0).each(function () {
      var $this = $(this);
      let $trailer = $this.find(".video-player").data("trailer");
      var parent_id = $this
        .parents(".elementor-widget-jws_video_special")
        .data("id");
      let video_id = "video-special-" + parent_id + "";
      let video;
      $(window).on("resize scroll", function () {
        if ($this.isInViewport(400)) {
          $this.addClass("video-play");
          if ($this.find(".video-player video").length < 1) {
            $this
              .find(".video-player")
              .html(
                '<video id="' +
                  video_id +
                  '"  autoplay loop muted playsinline><source src="' +
                  $trailer +
                  '" type="video/mp4"></video>'
              );
          } else {
            video = document.getElementById(video_id);
            if (video.paused) {
              video.play();
            }
          }
        } else {
          if (video !== undefined && !video.paused) {
            video.pause();
          }
          $this.removeClass("video-play");
        }
      });
      $this.find(".change-speaker").click(function () {
        video.muted = !video.muted;
        $(this).toggleClass("muted");
        if ($(this).hasClass("muted")) {
          $(this).html('<i class="jws-icon-speaker-x"></i>');
        } else {
          $(this).html('<i class="jws-icon-speaker-high"></i>');
        }
      });
    });
  };
  var person_advanced = function ($scope, $) {
    $scope
      .find(".jws-person-advanced-element")
      .eq(0)
      .each(function () {
        var $this = $(this);
        var $container = $this.find(".person-advanced-content");
        if ($container.hasClass("jws-person-advanced-slider")) {
          jwsThemeModule.owl_caousel_init($container);
        }
      });
  };
  var videos_advanced = function ($scope, $) {
    $scope
      .find(".jws-videos-advanced-element")
      .eq(0)
      .each(function () {
        var $this = $(this);
        var $container = $this.find(".videos-advanced-content");
        if ($container.hasClass("jws-videos-advanced-slider")) {
          jwsThemeModule.owl_caousel_init($container);
        }
      });
  };
  var tv_shows_advanced = function ($scope, $) {
    $scope
      .find(".jws-tv-shows-advanced-element")
      .eq(0)
      .each(function () {
        var $this = $(this);
        var $container = $this.find(".tv-shows-advanced-content");
        if ($container.hasClass("jws-tv-shows-advanced-slider")) {
          jwsThemeModule.owl_caousel_init($container);
        }
      });
  };
  var tv_shows_tabs = function ($scope, $) {
    var $container = $scope.find(".jws-tv_shows-tabs-element");
    $container.eq(0).each(function () {
      var $this = $(this);
      var wrap = $container.find(".tv_shows-content");
      if (wrap.hasClass("slider")) {
        jwsThemeModule.owl_caousel_init(wrap);
      }
      $this.find(".tv_shows-nav a").on("click", function (e) {
        e.preventDefault();
        var intervalID;
        wrap.addClass("loading");
        $this.addClass("jws-animated-post");
        clearInterval(intervalID);
        var data = $(this).parents(".tv_shows-nav").data("args");
        if ($(this).data("id") != "undefined") {
          data.manual_ids = $(this).data("id");
        }
        data.action = "jws_ajax_tv_shows_tabs";
        $this.find(".tv_shows-nav a").removeClass("active");
        $(this).addClass("active");
        if (!wrap.find(".loader").length) {
          wrap.append(
            '<div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
          );
        }
        $.ajax({
          url: jws_script.ajax_url,
          data: data,
          type: "POST",
          dataType: "json",
        })
          .success(function (response) {
            wrap.removeClass("loading");
            let content = response.data.content;
            if (wrap.hasClass("slider")) {
              wrap.html(content);
              if (wrap.hasClass("owl-loaded")) {
                wrap.trigger("destroy.owl.carousel");
              }
              jwsThemeModule.owl_caousel_init(wrap);
            } else {
              wrap.html(content);
            }
            var iter = 0;
            intervalID = setInterval(function () {
              wrap.find(".jws-post-item").eq(iter).addClass("jws-animated");
              iter++;
            }, 100);
          })
          .complete(function () {})
          .error(function (ex) {
            console.log(ex);
          });
      });
    });
  };
  var jws_playlist_trailer = function ($scope, $) {
    var $container = $scope.find(".jws_playlist_trailer");
    $container.eq(0).each(function () {
      var $this = $(this);
      var data_slick = $container.data("slick");
      $this
        .not(".slick-initialized")
        .slick({
          swipeToSlide: !0,
          slide: ".playlist_trailer-item",
          asNavFor: ".playlist-nav",
        });
      $this
        .next(".playlist-nav")
        .not(".slick-initialized")
        .slick({
          prevArrow: $(".nav_prev"),
          nextArrow: $(".nav_next"),
          asNavFor: ".jws_playlist_trailer",
          swipeToSlide: !0,
          slide: ".nav-item",
          focusOnSelect: !0,
        });
    });
  };
  var movies_advanced = function ($scope, $) {
    $scope
      .find(".jws-movies_advanced-element")
      .eq(0)
      .each(function () {
        var $this = $(this);
        var $container = $this.find(".movies_advanced_content");
        if ($container.hasClass("jws_movies_advanced_slider")) {
          jwsThemeModule.owl_caousel_init($container);
        }
        jwsThemeModule.loadmore_btn($this);
      });
  };
  var jws_history = function ($scope, $) {
    $scope
      .find(".jws-history-element")
      .eq(0)
      .each(function () {
        var $this = $(this);
        var $container = $this.find(".history_content");
        if ($container.hasClass("jws_movies_advanced_slider")) {
          jwsThemeModule.owl_caousel_init($container);
        }
      });
  };
  var jws_my_list = function ($scope, $) {
    $scope
      .find(".jws-my-list-element")
      .eq(0)
      .each(function () {
        var $this = $(this);
        var $container = $this.find(".my-list_content");
        if ($container.hasClass("jws_movies_advanced_slider")) {
          jwsThemeModule.owl_caousel_init($container);
        }
      });
  };
  var isYoutubeVideo = function (url) {
    return url.includes("youtube.com");
  };
  var getYouTubeID = function (url) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??(v=)?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[8].length == 11) {
      return match[8];
    } else {
      return null;
    }
  };
  var video_slider = function ($scope, $) {
    function video_init($trailer, video_id, player, $int, $this) {
      var player_api;
      if ($trailer) {
        if (isYoutubeVideo($trailer)) {
          var $trailer_url = getYouTubeID($trailer);
          player.append('<div id="' + $trailer_url + '" ></div>');
          if (typeof YT != "undefined") {
            var player = new YT.Player($trailer_url, {
              videoId: $trailer_url,
              playerVars: { loop: 1, playlist: $trailer_url },
              width: "100%",
              height: "100%",
              events: { onReady: onPlayerReady },
            });
          }
          function onPlayerReady(event) {
            event.target.playVideo();
            if ($this.find(".change-speaker").hasClass("muted")) {
              event.target.mute();
            }
            $this.find(".change-speaker").click(function () {
              console.log($trailer_url);
              if (event.target.isMuted()) {
                $(this).html('<i class="jws-icon-speaker-high"></i>');
                event.target.unMute();
              } else {
                event.target.mute();
                $(this).html('<i class="jws-icon-speaker-x"></i>');
              }
            });
          }
        } else {
          setTimeout(function () {
            player.html(
              '<video id="' +
                video_id +
                '"  autoplay muted playsinline><source src="' +
                $trailer +
                '" type="video/mp4"></video>'
            );
          }, 1500);
          $("#" + video_id).on("ended", function () {
            $(this).hide();
          });
        }
      }
    }
    $scope
      .find(".jws-slider_video-element")
      .eq(0)
      .each(function () {
        var $this = $(this);
        var parent_id = $this
          .parents(".elementor-widget-jws_slider_video")
          .data("id");
        var thumbnail_nav = $this.find(".thumbnail-nav");
        var $container = $(this).find(".jws_slider_video_slider");
        let video_id = "videojs-" + parent_id + "";
        let $trailer;
        let $trailer_url;
        let player;
        $container.on("initialized.owl.carousel", function (event) {
          var current = event.item.index;
          var current_side_item = $this.find(".owl-item").eq(current);
          var current_side = current_side_item.find(".slider-item");
          player = current_side.find(".video-player");
          $this
            .find(".jws-button-prev")
            .text(parseInt(current_side.data("index")));
          $this
            .find(".jws-button-next")
            .text(parseInt(current_side.data("index") + 1));
          $this
            .find(".jws-nav-pre span")
            .css(
              "width",
              (parseInt(current_side.data("index")) / event.item.count) * 100 +
                "%"
            );
          $trailer = player.data("trailer");
          $this
            .find(".video-action")
            .append(
              '<div class="change-speaker muted"><i class="jws-icon-speaker-x"></i></div>'
            );
          var hasInteracted = !1;
          $(document).on("mousemove touchstart", function () {
            if (!hasInteracted) {
              video_init($trailer, video_id, player, "int", $this);
              hasInteracted = !0;
            }
          });
          current_side_item.prev().removeClass("nextdiv").addClass("prevdiv");
          current_side_item.next().removeClass("prevdiv").addClass("nextdiv");
        });
        jwsThemeModule.owl_caousel_init($container);
        $container.on("translate.owl.carousel", function (event) {
          var current = event.item.index;
          var current_side_item = $this.find(".owl-item").eq(current);
          var current_side = current_side_item.find(".slider-item");
          current_side_item.prev().removeClass("nextdiv").addClass("prevdiv");
          current_side_item.next().removeClass("prevdiv").addClass("nextdiv");
        });
        $container.on("translated.owl.carousel", function (event) {
          const elem = $this.find(".owl-item").eq(event.item.index);
          var oke = $this.find(".owl-item:not(.cloned)").index(elem);
          var current = event.item.index;
          var current_side = $this
            .find(".owl-item")
            .eq(current)
            .find(".slider-item");
          player = current_side.find(".video-player");
          $trailer = player.data("trailer");
          $this.find(".video-player").empty();
          video_init($trailer, video_id, player, "chag", $this);
          if (
            !$this.find(".change-speaker").hasClass("muted") &&
            $this.find(".change-speaker").length
          ) {
            setTimeout(function () {
              var video = document.getElementById(video_id);
              if (video == null) return !1;
              video.muted = !1;
            }, 1500);
          }
          $this.find(".jws-button-prev").text(current_side.data("index"));
          if (parseInt(current) > event.item.count) {
            $this.find(".jws-button-next").text("1");
          } else {
            $this
              .find(".jws-button-next")
              .text(parseInt(current_side.data("index") + 1));
          }
          $this
            .find(".jws-nav-pre span")
            .css(
              "width",
              (parseInt(current_side.data("index")) / event.item.count) * 100 +
                "%"
            );
        });
        $this.find(".jws-button-next").click(function () {
          $container.trigger("next.owl.carousel");
        });
        $this.find(".jws-button-prev").click(function () {
          $container.trigger("prev.owl.carousel");
        });
        $this.find(".change-speaker").click(function () {
          var video = document.getElementById(video_id);
          $(this).toggleClass("muted");
          if (video == null) return !1;
          if ($(this).hasClass("muted")) {
            $(this).html('<i class="jws-icon-speaker-x"></i>');
          } else {
            $(this).html('<i class="jws-icon-speaker-high"></i>');
          }
          if (isYoutubeVideo($trailer)) {
          } else {
            video.muted = !video.muted;
          }
        });
        let thumbnail = $(this).find(".video-thumbnail-nav");
        if (thumbnail.length) {
          $container.on("changed.owl.carousel", function (event) {
            syncPosition(event, thumbnail);
          });
          var options = thumbnail.data("owl-option");
          thumbnail.owlCarousel(options);
          thumbnail.find(".owl-item").eq(0).addClass("current");
          thumbnail.on("click", ".owl-item", function (e) {
            e.preventDefault();
            var number = $(this).find(".slider-item").data("index");
            var clone = $container.find(".cloned").length;
            var change_nav = $container
              .find(".owl-item")
              .not(".cloned")
              .find('.slider-item[data-index="' + number + '"]');
            $container.trigger(
              "to.owl.carousel",
              change_nav.parent().index() - clone / 2
            );
          });
        }
      });
  };
  var syncPosition = function (el, thumbnail_nav) {
    var count = el.item.count - 1;
    var current = Math.round(el.item.index - el.item.count / 2 - 0.5);
    if (current < 0) {
      current = count;
    }
    if (current > count) {
      current = 0;
    }
    current = current + 1;
    console.log(current);
    var change_nav = thumbnail_nav
      .find(".owl-item")
      .not(".cloned")
      .find('.slider-item[data-index="' + current + '"]');
    var change = change_nav.parent().index();
    thumbnail_nav
      .find(".owl-item")
      .removeClass("current")
      .eq(change)
      .addClass("current");
    var end = thumbnail_nav.find(".owl-item.active").last().index();
    if (change > end) {
      thumbnail_nav.data("owl.carousel").to(change - 1, 100, !0);
    } else {
      thumbnail_nav.data("owl.carousel").to(change, 100, !0);
    }
  };
  var jws_top_videos = function ($scope, $) {
    $scope
      .find(".jws-top-videos-tabs-element")
      .eq(0)
      .each(function () {
        var $this = $(this);
        var $container = $this.find(".top-videos-content");
        if ($container.hasClass("slider")) {
          jwsThemeModule.owl_caousel_init($container);
        }
      });
  };
  $(window).on("elementor/frontend/init", function () {
    var widgets = {
      "jws_slider_video.default": video_slider,
      "jws_movies_advanced.default": movies_advanced,
      "jws_playlist_trailer.default": jws_playlist_trailer,
      "jws_tv_shows_tabs.default": tv_shows_tabs,
      "jws_tv_shows_advanced.default": tv_shows_advanced,
      "jws_videos_advanced.default": videos_advanced,
      "jws_person_advanced.default": person_advanced,
      "jws_video_special.default": video_special,
      "jws-videos-category.default": video_category,
      "jws_episodes_advanced.default": episodes_advanced,
      "jws_top_videos.default": jws_top_videos,
      "jws_history.default": jws_history,
      "jws_my_list.default": jws_my_list,
    };
    $.each(widgets, function (widget, callback) {
      if ("object" === typeof callback) {
        $.each(callback, function (index, cb) {
          elementorFrontend.hooks.addAction(
            "frontend/element_ready/" + widget,
            cb
          );
        });
      } else {
        elementorFrontend.hooks.addAction(
          "frontend/element_ready/" + widget,
          callback
        );
      }
    });
  });
})(jQuery);
