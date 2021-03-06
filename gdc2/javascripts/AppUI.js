var AppUI = (function() {
  
  var renderErrors = {
        webGLunsupported : '<p>This demo requires support for webGL.<br />Click <a href="http://verold.com/blog/2013/1/2/enabling-webgl-in-your-browser" target="_blank">here</a> to learn more.</p>',
        floatingPointTexturesUnavailable: '<p>This demo requires support for floating-point textures. Updating your video card drivers may resolve the issue.</p>',
        vertexTexturesUnavailable: '<p>This demo requires support for vertex textures. Updating your video card drivers may resolve the issue.</p>'
      },

      shareToolInitialized = false,

      isMobileDevice = (/iphone|ipad|ipod|android|blackberry|bb10|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));

  return {

    setLoadingProgress : function(percent) {
      if(!this.loadingProgress) {
        this.createLoadingProgress();
      }
      this.loadingProgress.setProgress(percent); 
    },

    animateLoadingProgress : function(duration, callback) {
      if(!this.loadingProgress) {
        this.createLoadingProgress();
      }
      this.loadingProgress.animate(duration, callback);
    },

    hideLoadingProgress : function() {
      if(!this.loadingProgress) {
        this.createLoadingProgress();
      }
      this.loadingProgress.hide();
    },

    createLoadingProgress: function() {
      var LoadingProgress = function() {
        this.progressContainer = $('#loading-progress-container');
        this.progressIndicator = this.progressContainer.find('.loading-progress div');
      };

      LoadingProgress.prototype.setProgress = function(percent) {
        this.progressIndicator.css({width:percent+'%'});
      };

      LoadingProgress.prototype.animate = function(duration,callback) {
        this.progressIndicator.animate({width:'100%'},duration,callback);
      };

      LoadingProgress.prototype.hide = function() {
        this.progressContainer.hide();
      };

      this.loadingProgress = new LoadingProgress();
    },

    hideHeaders : function() {
      $('#headers').hide();
    },

    showMenus : function() {
      $('#menu').show();
      if(!shareToolInitialized) {
        this.initShareTools();
      }
    },

    hideMenus : function() {
      $('#menu').hide();
    },

    renderError : function(errorType) {
      errorType = errorType || '';
      this.hideLoadingProgress(); 
      var renderErrorDom = $('#render-errors');
      if(errorType in renderErrors) {
        renderErrorDom.html(renderErrors[errorType]);
      } else {
        renderErrorDom.html('<p>Unknown webGL render error encountered</p>');
      }
      renderErrorDom.show();
    },

    showControls : function() {
      $('#settings').click();
    },

    showUI : function() {
      this.hideHeaders();
      this.showMenus();
      this.initOverlayUI();
      this.showControls();
    },

    initOverlayUI : function() {

      var links = $('#menu a'),
          duration = (!!isMobileDevice) ? 0 : 200;

      links.each(function(index,link) {
        var panel = $('#'+link.id+'-panel'),
            panels = $('.panel'),
            close = panel.find('.close').get(0),
            togglePanel = function() {
              if(panel.is(':visible')) {
                panel.hide(duration);
              } else {
                panels.not(panel.selector).hide(duration);
                panel.show(duration);
              }
            };

        $([link,close]).click(togglePanel);
      });

    },

    initShareTools : function() {
      $('#share-tools').show();
      shareToolInitialized = true;
      // gplus share functionality can
      // only be envoked when share
      // button parent div is visible
      (function() {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/plusone.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
      })();

      // facebook
      (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
      fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }

  };

})();
