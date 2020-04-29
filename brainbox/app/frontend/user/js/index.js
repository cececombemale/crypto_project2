import axios from "axios"
import "../less/index.less"
import "font-awesome/css/font-awesome.css"
import conf from "./Configuration"
import inlineSVG from "../../_common/js/inlineSVG"


// Resolve name collision between jQuery UI and Twitter Bootstrap
/*** Handle jQuery plugin naming conflict between jQuery UI and Bootstrap ***/
$.widget.bridge('uibutton', $.ui.button)
$.widget.bridge('uitooltip', $.ui.tooltip)


// required to be compatible with jquery.layout and jquery.handsontable
//
jQuery.uaMatch = function (ua) {
  ua = ua.toLowerCase()
  var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
    /(webkit)[ \/]([\w.]+)/.exec(ua) ||
    /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
    /(msie) ([\w.]+)/.exec(ua) ||
    ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
    []
  return {
    browser: match[1] || "",
    version: match[2] || "0"
  }
}
if (!jQuery.browser) {
  let matched = jQuery.uaMatch(navigator.userAgent)
  let browser = {}
  if (matched.browser) {
    browser[matched.browser] = true
    browser.version = matched.version
  }
// Chrome is Webkit, but Webkit is also Safari.
  if (browser.chrome) {
    browser.webkit = true
  } else if (browser.webkit) {
    browser.safari = true
  }
  jQuery.browser = browser
}


// need to be global for the "static" version hosted on gh-pages
//
window.conf = conf


$(window).load(function () {

  // export all required classes for deserialize JSON with "eval"
  // "eval" code didn't sees imported class or code
  //

  let socket = io({
      path: '/socket.io'
    })

  // remove the fileOpen/Save stuff if we run in a "serverless" mode. e.g. on gh-pages
  // (fake event from the socket.io mock )
  //
  axios.get("../permissions").then( (response) => {
    let permissions = response.data
    let app = require("./Application")
    app.init(permissions)
    $(".loader").fadeOut(500, function () {
      $(this).remove();
    })
    inlineSVG.init()
  })

})
