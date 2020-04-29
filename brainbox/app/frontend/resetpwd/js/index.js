import "../less/index.less"
import axios from "axios"


function getParam(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]")
  let regexS = "[\\?&]" + name + "=([^&#]*)"
  let regex = new RegExp(regexS)
  let results = regex.exec(window.location.href)
  // the param isn't part of the normal URL pattern...
  //
  if (results === null) {
    // maybe it is part in the hash.
    //
    regexS = "[\\#]" + name + "=([^&#]*)"
    regex = new RegExp(regexS)
    results = regex.exec(window.location.hash)
    if (results === null) {
      return null
    }
  }
  return results[1]
}

function checkPassword() {
  let password1 = $("#password1Input").val();
  let password2 = $("#password2Input").val();

  // If password not entered
  if (password1 == '') {
    $("#errorMessage").html("Please enter Password")
    return false
  }

  // If confirm password not entered
  else if (password2 == '') {
    $("#errorMessage").html("Please enter confirm password")
    return false
  }

  // If Not same return False.
  else if (password1 != password2) {
    $("#errorMessage").html("Password did not match: Please try again...")
    return false
  }
  $("#errorMessage").html("")
  return true;
}

$(window, document, undefined).ready(function () {

  $('input').blur(function () {
    let $this = $(this);
    if ($this.val())
      $this.addClass('used');
    else
      $this.removeClass('used');
  });

  let $ripples = $('.ripples');

  $ripples.on('click.Ripples', function (e) {

    let $this = $(this);
    let $offset = $this.parent().offset();
    let $circle = $this.find('.ripplesCircle');

    let x = e.pageX - $offset.left;
    let y = e.pageY - $offset.top;

    $circle.css({
      top: y + 'px',
      left: x + 'px'
    });

    $this.addClass('is-active');

  });

  $ripples.on('animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd', function (e) {
    $(this).removeClass('is-active');
  });

  $(document).on("click", "#resetPassword", () => {
    if (!checkPassword()) {
      $("#password1Input").focus()
    }
    else {
      axios.post("../password", {
        token: getParam("token"),
        password: $("#password1Input").val()
      })
        .then(() => {
          $(".form").append("<div class='overlay'><div>Password changed with success<a class='button' href='../login'>Login</a></div></div>")
        })
        .catch(() => {
          $(".form").append("<div class='overlay'><div>Your password reset link has expired<a class='button' href='../'>Back</a></div></div>")
        })
    }

    return false
  })

  let token = getParam("token")
  axios.get("../password/token/" + token)
    .then(() => {
      $("#password1Input").focus()
    })
    .catch(() => {
      $(".form").append("<div class='overlay'><div>Your password reset link has expired<a class='button' href='../'>Back</a></div></div>")
    })

});
