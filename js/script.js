(function () {
  function fadeContent(el) {
    var bounding = el.getBoundingClientRect();
    var top = bounding.top;
    var winHeight = window.innerHeight || document.documentElement.clientHeight;
    var animator = (top - winHeight) < 0 ? "fade-in" : "fade-out";
    el.style.animation = animator + " 3s ease-in-out forwards";
  }

  function toggleModal(str, e) {
    e.preventDefault();

    var el = document.getElementById(str);
    var outer = document.getElementById("modal-outer");
    var inner = document.getElementById("modal-inner");
    var content = document.getElementById("modal-content");

    if (str == "exit") {
      inner.style.animation = "fade-out 1s ease forwards";

      setTimeout(function () {
        outer.style.animation = "fade-out 1s ease forwards";
      }, 500);

      setTimeout(function () {
        content.innerHTML = "";
        outer.style.zIndex = "-1";
      }, 1000);
    }
    else {
      outer.style.zIndex = "1";
      content.innerHTML = el.innerHTML;
      outer.style.animation = "fade-in 1s ease forwards";

      setTimeout(function () {
        inner.style.animation = "fade-in 1s ease forwards";
      }, 500);
    }
  }

  function toggleUp(el) {
    var bounding = el.parentElement.getBoundingClientRect();
    var top = bounding.top;

    if (top <= -222) {
      el.style.visibility = "visible";
      el.style.bottom = "0";
      el.style.right = el.parentElement.offsetLeft + "px";
    }
    else {
      el.style.visibility = "hidden";
    }
  }

  function gotoDestination(tgt, e) {
    e.preventDefault();

    var top = tgt.offsetTop;
    scrollTo({
      top: top,
      behavior: "smooth"
    });
  }

  function events() {
    var about = document.getElementById("about");
    var projects = document.getElementById("projects");
    var contact = document.getElementById("contact");
    var up = document.getElementById("up");
    var exit = document.getElementById("modal-exit");
    var backs = document.querySelectorAll(".card-side-back a");
    var links = document.querySelectorAll("#nav a.nav-link, #up a");
    var modalOuter = document.getElementById("modal-outer");

    var arr = [about, projects, contact, up];

    arr.forEach(function (a) {
      func = a.id == "up" ? toggleUp.bind(this, a) : fadeContent.bind(this, a);
      window.addEventListener("scroll", func);
    });

    arr = Array.prototype.slice.call(backs);
    arr.push(exit);

    arr.forEach(function (a) {
      a.addEventListener("click", toggleModal.bind(this, a.getAttribute("data-target")));
    });

    modalOuter.addEventListener("click", function (e) {
      if (e.target.id === 'modal-outer') {
        toggleModal("exit", e);
      }
    });

    arr = Array.prototype.slice.call(links);

    arr.forEach(function (a) {
      var tgt = document.getElementById(a.getAttribute("href").substring(1));
      a.addEventListener("click", gotoDestination.bind(this, tgt))
    });
  }

  events();
})();