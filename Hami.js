function fullscreenButton(n){var o=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream;if(o&&"vimeo"===n.type&&(t.style.display="none"),components.fullscreenButton)return components.fullscreenButton;var t=document.querySelector(".oneline-fullscreen-button");return t.addEventListener("click",function(){var e;e=document.querySelector(".oneline-player"),a()?e.requestFullscreen?e.requestFullscreen():e.msRequestFullscreen?e.msRequestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT):o&&"html"===n.type&&n.node().webkitEnterFullscreen():document.exitFullscreen?document.exitFullscreen():document.msExitFullscreen?document.msExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen(),t.blur()}),document.addEventListener("webkitfullscreenchange",e),document.addEventListener("fullscreenchange",e),document.addEventListener("mozfullscreenchange",e),document.addEventListener("MSFullscreenChange",e),t.style.display="block",components.fullscreenButton=t,components.fullscreenButton;function e(){var e=document.querySelector(".oneline-wrap");if(a()){var o=new CustomEvent("fullscreenExit");e.classList.remove("oneline-fullscreen")}else{o=new CustomEvent("fullscreenEnter");e.classList.add("oneline-fullscreen")}n.node().dispatchEvent(o)}function a(){return!(document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement)}}function videoHtml(e){var n=document.getElementById("video"),t=n.parentNode;return n.muted=e.muted,e.autoplay&&n.setAttribute("autoplay",""),e.loop&&n.setAttribute("loop",""),n.src=e.url,n.addEventListener("error",function(){var e=t.querySelector(".oneline-error-message");if(null!==n.error){var o="Video error";switch(n.error.code){case 1:o="Video aborted";break;case 2:o="Video expired, reload the page";break;case 3:o="Network error";break;case 4:o="Video not found or not supported"}e.innerText=o,t.classList.add("oneline-error"),t.classList.remove("oneline-load")}}),n.addEventListener("waiting",function(){debug&&console.log("waiting"),t.classList.add("oneline-load")},!1),n.addEventListener("canplaythrough",function(){debug&&console.log("canplay"),t.classList.remove("oneline-load")},!1),{type:"html",load:function(e){n.src=e.url,e.autoplay&&n.setAttribute("autoplay","")},node:function(){return n},play:function(){n.play()},pause:function(){n.pause()},mute:function(){n.muted=!0},unmute:function(){n.muted=!1},getPaused:function(e){e(n.paused)},getWidth:function(e){e(n.videoWidth)},getHeight:function(e){e(n.videoHeight)},getTime:function(e){e(n.currentTime)},setTime:function(e){n.currentTime=e},setLoop:function(e){e?n.setAttribute("loop",""):n.removeAttribute("loop")},getDuration:function(e){e(n.duration)},getMuted:function(e){e(n.muted)},onLoadstart:function(e){n.addEventListener("loadstart",e,!1)},onLoadend:function(e){n.addEventListener("loadended",e,!1)},onReady:function(e){n.addEventListener("loadedmetadata",e,!1)},onPlay:function(e){n.addEventListener("play",e,!1)},onPause:function(e){n.addEventListener("pause",e,!1)},onTimeupdate:function(e){n.addEventListener("timeupdate",e,!1)},onVolumechange:function(e){n.addEventListener("volumechange",e,!1)},onEnded:function(e){n.addEventListener("ended",e,!1)},onSeeked:function(e){n.addEventListener("seeked",e,!1)}}}var HOST="https://onelineplayer.com",components={},userCanTouch=!1,hideTimeout=null,debug=!1;function init(n){n||(n=getOptions()),isVimeo(n.url)&&isLegacyCustomer()?getVimeoVideoData(n.url,n.quality,function(e,o){n.url=e,n.poster=o,initPlayer(n)},function(e){debug&&console.log("Server error",e),initPlayer(n)}):initPlayer(n)}function initPlayer(o){components={},initTouch();var n=loadVideo(o),t=document.querySelector(".oneline-wrap");return t.classList.add("oneline-load"),playerStyle(o.style),o.poster&&poster(n,o.poster),o.overlay&&overlay(n,o),o.autopause&&n.onPlay(function(){for(var e=getOtherPlayers(),o=0;o<e.length;o++)e[o].postMessage("stop","*")}),n.onLoadstart(function(){debug&&console.log("loadstart"),t.classList.add("oneline-load"),t.classList.remove("oneline-error")}),n.onLoadend(function(){debug&&console.log("loadend"),t.classList.remove("oneline-load")}),n.onPlay(function(){debug&&console.log("play"),t.classList.add("oneline-hide-controls"),t.classList.add("oneline-playing"),t.classList.remove("oneline-paused"),hideTimeout=setTimeout(function(){t.classList.add("oneline-hide-all")},3e3)}),n.onPause(function(){debug&&console.log("pause"),t.classList.add("oneline-paused"),t.classList.remove("oneline-load"),t.classList.remove("oneline-playing"),t.classList.remove("oneline-hide-all"),clearTimeout(hideTimeout)}),n.onSeeked(function(){t.classList.remove("oneline-load")}),t.addEventListener("mouseleave",function(){t.classList.remove("oneline-hide-controls"),t.classList.remove("oneline-hide-all"),t.classList.remove("active")}),t.addEventListener("mouseenter",function(){t.classList.remove("oneline-hide-controls"),t.classList.remove("oneline-hide-all"),clearTimeout(hideTimeout)}),window.addEventListener("message",function(e){"start"===e.data&&n.play(),"stop"===e.data&&n.pause()}),n.onReady(function(){for(var e in debug&&console.log("loadedmetadata"),t.classList.add("oneline-ready"),t.classList.remove("oneline-load"),o.autoplay||t.classList.add("oneline-paused"),o.time&&time(n),o.progressBar&&progressBar(n),o.playButton&&playButton(n,o),o.muteButton&&muteButton(n),o.fullscreenButton&&fullscreenButton(n),components)-1!==["playButton","progressBar","muteButton","fullscreenButton"].indexOf(e)&&(components[e].onclick=function(e){(e.clientX||e.clientY)&&t.classList.remove("keyboard-control")},document.onkeyup=function(e){9===e.keyCode&&t.classList.add("keyboard-control")},document.onkeydown=function(e){var o="BUTTON"===document.activeElement.tagName;32!==e.keyCode||o||n.getPaused(function(e){e?n.play():n.pause()})},components[e].onfocus=function(){t.classList.add("active")},components[e].onblur=function(){t.classList.remove("active")})}),n}function playerStyle(e){var o=document.querySelector(".oneline-wrap");"dark"===e?o.classList.add("oneline-dark"):o.classList.remove("oneline-dark")}function loadVideo(e){var o=document.getElementById("video"),n=document.getElementById("embed-video");if(isVimeo(e.url)){n.style.display="block";var t=videoVimeo(e)}else{o.style.display="block";t=videoHtml(e)}return t}function getOptions(){return{url:decodeURIComponent(getParam("url")),poster:decodeURIComponent(getParam("poster")),autoplay:paramIsOn("autoplay"),loop:paramIsOn("loop"),autopause:paramIsOn("autopause"),muted:paramIsOn("muted"),clickable:!paramIsOff("clickable"),time:paramIsOn("time"),progressBar:paramIsOn("progressBar"),playButton:paramIsOn("playButton"),overlay:paramIsOn("overlay"),muteButton:paramIsOn("muteButton"),fullscreenButton:paramIsOn("fullscreenButton"),logo:paramIsOn("logo"),style:getParam("style"),buttonColor:getParam("buttonColor"),buttonSize:getParam("buttonSize"),overlayColor:getParam("overlayColor"),overlayOpacity:getParam("overlayOpacity"),quality:getParam("quality")}}function reset(){var e=document.querySelector(".oneline-wrap");e.classList.remove("oneline-load"),e.classList.remove("oneline-hide-controls"),e.classList.remove("oneline-hide-all"),e.classList.remove("oneline-paused"),e.classList.remove("oneline-dark")}function muteButton(o){if(components.muteButton)return components.muteButton;var n=document.querySelector(".oneline-mute-button");o.getMuted(function(e){e&&n.classList.add("muted")});var e=userCanTouch?"touchend":"click";return n.addEventListener(e,function(){o.getMuted(function(e){e?o.unmute():o.mute()})}),o.onVolumechange(function(){o.getMuted(function(e){e?n.classList.add("muted"):n.classList.remove("muted")})}),n.style.display="block",components.muteButton=n,components.muteButton}function overlay(o,e){var n=document.querySelector(".oneline-overlay"),t=document.querySelector(".oneline-wrap");if(e&&e.overlayColor?n.style.backgroundColor=e.overlayColor:n.style.backgroundColor=null,e&&e.overlayOpacity?(n.dataset.opacity=e.overlayOpacity,o.getPaused(function(e){e&&(n.style.opacity=n.dataset.opacity)})):(delete n.dataset.opacity,n.style.opacity=null),components.overlay)return components.overlay;n.classList.add("oneline-clickable");var a=userCanTouch?"touchend":"click";return n.addEventListener(a,function(){t.classList.add("oneline-started"),o.getPaused(function(e){e?o.play():o.pause()})},!1),o.onPlay(function(){void 0!==n.dataset.opacity&&(n.style.opacity=0)}),o.onPause(function(){void 0!==n.dataset.opacity&&(n.style.opacity=n.dataset.opacity)}),n.addEventListener("mouseleave",function(){t.classList.remove("oneline-hide-controls"),t.classList.remove("oneline-hide-all")}),n.addEventListener("mouseenter",function(){userCanTouch||(t.classList.remove("oneline-hide-controls"),t.classList.remove("oneline-hide-all"),clearTimeout(hideTimeout))}),n.style.display="block",components.overlay=n,components.overlay}function playButton(o,e){var n=document.querySelector(".oneline-play-pause"),t=document.querySelector(".oneline-wrap");e&&(e.buttonSize||e.buttonSizePercent)?(n.style.width=e.buttonSize+"px",n.style.marginTop=-e.buttonSize/2+"px",n.style.marginLeft=-e.buttonSize/2+"px"):(n.style.width=null,n.style.marginTop=null,n.style.marginLeft=null);for(var a=e&&e.buttonColor?e.buttonColor:null,r=n.querySelectorAll(".oneline-icon"),i=0;i<r.length;i++)r[i].style.fill=a;if(components.playButton)return components.playButton;var c=userCanTouch?"touchend":"click";return n.addEventListener(c,function(){t.classList.add("oneline-started"),o.getPaused(function(e){e?o.play():o.pause()})},!1),n.style.display="block",components.playButton=n,components.playButton}function poster(e,o){var n=document.querySelector(".oneline-poster");if(n.style.backgroundColor="#000",n.style.backgroundImage="url("+o+")",components.poster)return components.poster;o&&(n.style.display="block"),e.onPlay(function(){n.style.display="none"}),components.poster=n}function progressBar(t){if(components.progressBar)return components.progressBar;var a=!1,o=null,r=document.querySelector(".oneline-progress"),i=document.querySelector(".oneline-progress-fill"),c=document.querySelector(".oneline-progress-seek-fill"),n=document.querySelector(".oneline-wrap");return t.onPlay(function(){!function e(){m(),o=setTimeout(e,50)}()}),t.onPause(function(){clearTimeout(o)}),t.onEnded(function(){i.style.width=r.offsetWidth+"px"}),r.addEventListener("mousedown",function(e){u(e),a=!0},!1),r.addEventListener("mouseup",function(){a=!1},!1),r.addEventListener("mousemove",function(e){l(e,!1)},!1),r.addEventListener("touchstart",function(e){a=!0,e.returnValue=!1},!1),r.addEventListener("touchmove",function(e){l(e,!0)},!1),r.addEventListener("touchend",function(){a=!1},!1),document.addEventListener("keydown",function(e){39===e.keyCode&&s(5),37===e.keyCode&&s(-5)},!1),r.style.display="block",components.progressBar=r;function s(o){t.getTime(function(e){t.setTime(e+o)})}function l(e,o){o&&(e.returnValue=!1);var n,t=d(e);n=t,c.style.width=n+"%",a&&u(e)}function u(e){var o=d(e);n.classList.add("oneline-load"),t.getDuration(function(e){t.setTime(o/100*e),m()})}function m(){t.getTime(function(n){t.getDuration(function(e){var o;o=100*n/e,i.style.width=o+"%"})})}function d(e){var o=e.changedTouches,n=r.getBoundingClientRect().left,t=(o?e.pageX:e.clientX)-n,a=r.offsetWidth;return 0<t&&t<a?100*t/a:0}}function time(e){var o=document.querySelector(".oneline-time");return e.getTime(function(e){o.innerHTML=formatTime(e)}),o.style.display="block",components.time?components.time:(n(),e.onTimeupdate(function(){n()}),components.time=o);function n(){e.getTime(function(e){o.innerHTML=formatTime(e)})}}function formatTime(e){e=Math.floor(e);var o=Math.floor(e/3600),n=Math.floor((e-3600*o)/60),t=e-3600*o-60*n,a=(n=n<10?"0"+n:n)+":"+(t=t<10?"0"+t:t);return 0<o&&(a=o+":"+a),a}function paramIsOn(e){var o=getParam(e);return"true"===o||"1"===o}function paramIsOff(e){var o=getParam(e);return"false"===o||"0"===o}function getParam(e){for(var o=window.location.search.substring(1).split("&"),n=0;n<o.length;n++){var t=o[n].split("=");if(t[0]===e)return t[1]}return null}function serializeObject(e){var o=[];for(var n in e)e.hasOwnProperty(n)&&o.push(encodeURIComponent(n)+"="+encodeURIComponent(e[n]));return o.join("&")}function initTouch(){document.querySelector(".oneline-player").addEventListener("touchstart",function(){userCanTouch=!0},!0)}function getOtherPlayers(){for(var e=[],o=0;o<window.parent.frames.length;o++){var n=window.parent.frames[o];n.location.origin===HOST&&n!==window&&e.push(n)}return e}function isLegacyCustomer(){var e=document.referrer?getDomainFromUrl(document.referrer):null;if(void 0!==domains)for(var o=0;o<domains.length;o++)if(e===domains[o]||e==="www."+domains[o])return!0;return!1}function getDomainFromUrl(e){var o=e.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);return o&&o[1]}function getVimeoVideoData(e,t,a,r){var i=new XMLHttpRequest;i.open("GET","https://onelineplayer-api.herokuapp.com/vimeo?url="+encodeURI(e)),i.send(null),i.onreadystatechange=function(){if(4===i.readyState)if(200===i.status){var e=JSON.parse(i.responseText),o=e.poster,n=void 0!==t&&e.video.hasOwnProperty(t)?e.video[t]:e.video[Object.keys(e.video)[0]];a(n,o)}else r(i.status)}}var domains=["greenpills.fr","shapingnewtomorrow.de","soyaconcept.com","eye-lights.com","bendsoap.com","ccvshop.nl","redside.elledecoration.ru","luna.selina.com","shapingnewtomorrow.se","soyaconcept.de","ladymuskoka.com","warnerchappell.com","cliogoldbrenner.com","95glory.com.tw","anexbaby.ro","shapingnewtomorrow.dk","kedzich.com","casecompany.world","casecompany.be","soyaconcept.dk","tour.topstretching.com","method.blue","school.uprock.ru","sengefabriksudsalg.dk","mirrolab.agency","careers.colt.net","artemlubimov.online","readymag.com","lapee.dk","laboucle.com","soyaconcept.se","shapingnewtomorrow.com","clarev.com","bareentshirt.dk","adngroup.com","padelstreamer.com","beaconstationaugusta.com","kubrick.life","maximusmotel.com.br","indera.be","nogf.cyberbiz.co","maisonflaneur.com","azs.ukrnafta.com","banki.ru","elonaccessories.com","strong4mefitness.com","schulcampus-roebel.de","enterol.cz","autobrush.dk","deedsalone.com","sportyapp.com","devdeeds.wpengine.com","casecompany.berlin","tarelkaworkshop.ru","womenatdior.com","oppo.wsffest.com","amalys.com","yoya-official.com.ua","socialserviceclub.io","casecompany.it","maximusbeheer.nl","he-homes.com","fengyueba.net","4u-team.com","casecompany.amsterdam","taragraphy.com","aquiris.com.br","grafikr.dk","boinogrill.com.br","bagi.com","casecompany.paris","stasaki.com","site.fuerzastudio.com","strikingly.com","vasyukhin.ru","leadgenapp.io","capi.com","smertefribevaegelse.dk","black-euphoria.com","a-1.group","philosophie.is","uk.warnerchappell.com","isness.ru","cargis.pro","azaistudios.com","welps.ru","blindsight.space","parrotmob.com","agencyinc.co.uk","zippo.com","tatianae.com","mars-colony.tilda.ws","casecompany.se","genflow.com","ladegaard.myshopify.com","mx.warnerchappell.com","oamole.com","chickstarter.co.uk","graduates.worldpay.com","lendersa.com","thegamebox.nl","casecompany.es","densa.ch","fontkey.design","247airservices.com","iamdoutian.com","creditselecto.com","center-synergy.kz","copmetrics.com","verifier.meetchopra.com","designandpractice.com","buroburo.ru","breakthroughforcats.me","editions.lisasaysgah.com","interestingspeakers.com","phabletshield.com","artablocks.ru","baidu.com","caseknives.com","knollmuehle.at","cn.strikingly.com","jm-design.co","integrity-wealth.com","betoplus.ru","kindmate.net","agarchitecture.net","smith-leverock.co.uk","sahilnathu.com","bonzanini.work","earlycareers.colt.jobs","mob.school","monkeybusinesskosuyolu.com","studiokohl.com","eugenemarkin.com","kampanje.bid","kickerlift.com","selfmadebygianfrancovillegas.com","dev.sportyapp.com","barzaboom.ro","suun.productions","designprogramming.io","freedominternational.org","mingl.studio","smoglounge.com","arbreetcie.com","caetanocapricio.com.br","cisorstudio.com","come-on-design.ru","localhost:44329","andreiminakov.com","laconsoleretrogaming.com","panaszok.com","ply.studio","ulrikemueller.eu","appropriateculture.tv","tmactest4.cyberbiz.co","unikgadgets.com","nymax.webflow.io","sergeyandronov.com","11-22beauty.ru","andreylee.com","ecodrum.ch","giacomojoyce.com","bareentshirt.myshopify.com","eu.mouseflow.com","oppo.tilda.ws","technicon.grafikrdev.dk","thomasralph.co.uk","gotutor.dk","greenpills.co","myshli.com","sklep749289.shoparena.pl","dehoek-meijel.nl","theculturereport.com","ru.foridev.com","shopping2genie.fr","rediansg.com","aitoasuorituskykya.fi","engagetech.careers","minglton.com","porsche.rasa.team","conceptstadium.com","mitya.today","play.endel.io","simoneetlescarottes.com","blog.arengu.com","clubamazing.com","edu-energy-guard.azurewebsites.net","help.readymag.com","shop.punkrawklabs.net","soyaconcept-dk.myshopify.com","theorhodes.design","decor.tsvetkovdesign.com","forum.topstretching.com","gacybercenter.org","irozhlas.cz","lenzhaus.de","medwell.ru.tilda.ws","se.warnerchappell.com","shapingnewtomorrow.myshopify.com","wapp.gethellobox.com","wearewunder.bar","willneeteson.com","dominikwierl.com","edsaugusta.com","erayhin.de","happydemics.com","leadpool.com.br","merzspezial.marieclaire.ru","mysterymagic.co","pro.mirrolab.com","yvettemurrell.com","academy.binary-studio.com","alexanderfirsov.com","danaraujo.com","dentaltermin.com","dshowconcept.tilda.ws","iomoltodipiu.com","ippt.890m.com","kristinamand.com","ledindy.com","svora.digital","tandoorvietnam.com","toyger.tw","yjltop.com","annual-report2018.rtlgroup.com","bladerunner.tilda.ws","it.warnerchappell.com","legion.uprock.ru","nl.warnerchappell.com","ralift.pro","rollis.tilda.ws","summits.rasa.team","texasborderbusiness.com","voteforkimberly.org","alheemea.com","blackeuphoria.webflow.io","branding.warnerchappell.com","de.warnerchappell.com","drgrahamshomes.co.uk","fr.warnerchappell.com","greenpills.es","groza.digital","kairader.com","maximus-beheer.nl","app.convertri.com","brandlikethis.com","davispcc.com","denzeldin.com","element-b.de","fanshotline24.ru","flowmoscow.ru","greenpills.de","joryan.net","next.36kr.com","olartia.net","oliverhoegjensen.work","pilihunters.myshopify.com","rvanbaaren-werkenbijccvshop.ccvsite.nl","sntstoredk.myshopify.com","soybuda.com","thepathofthefool.com","uniquiz.rasa.team","95glory.com","aestetik.tilda.ws","bonita.mcarnolds.dev","crowl3y.github.io","deedsalone.dev","ediswater.com","gotutor.no","happysynapse.com","hastrid.be","honestli.nl","instant-hack.to","ivangoghbar.ru","justwoman.tw","lamericantrading.com.br","leopard-cobalt-yjhz.squarespace.com","lingolib.com","linkin.bio","manifest.endel.io","medium.com","mvivid.eu","mysterymagic.webflow.io","project1585874.tilda.ws","saveyourdeal.myshopify.com","serkez.creatives.media","stadsparc.nl","student.subset.se","translatoruser-int.com","uc.zhuzi.me","velvet-staging-stable.now.sh","511.team","apply.fullmoon.digital","b2s-pro.ru","canonsl3training.com","capi2.ptchr","chesu.ru","curatevisual.com","dev-greenitup.firebaseapp.com","drensucasa.com","fontkey.kognise.repl.co","gotutor.no:8890","laboucle.cz","lacameraverte.com","nashville.warnerchappell.com","nasonero.studio","newkids.md","powercovercase.com","process.dominikwierl.com","reeceselvadorai.com","schulcampus.squarespace.com","shaunobeirne.com","soyaconcept-com.myshopify.com","soyaconcept-se.myshopify.com","talkingthetalksexed.com.au","testbanki.ru","thomsondesigns.webflow.io","tigrettcat.com","tildoshnaya.pro","tomato.kosmonauts.co","translate.googleusercontent.com","trofotodesign.ru","zstudios.com.ar","5d8639fcdbb168312645f7b1--happy-payne-de1ad0.netlify.com","5d864c5e607c851e9f44fcce--happy-payne-de1ad0.netlify.com","5d88799dc3a00b64c15033c1--happy-payne-de1ad0.netlify.com","9aaztbtkc5xuare8-2901966883.shopifypreview.com","air-x.anexbaby.com","alphabrass.com","ambulance-pro.bubbleapps.io","apps.pagefly.io","atelier.boxhitart.fr","bb.thinkpixels.nl","bend-soap-company-2.myshopify.com","cargocollective.com","clare-v-staging16.myshopify.com","cmdz.studio","de-kavel.nl","dev.kalle.donbran.co","dt58yjvk985rn0vp-289308678.shopifypreview.com","egorcherkasov.tilda.ws","es.warnerchappell.com","feedly.com","filmizlesene.ml","fontkey--kognise.repl.co","freedomcambodia.org","freedomhall.kiev.ua","gaveshop-flygtning.dk","googleweblight.com","holy-lake-7976.animaapp.io","iindie.co","iledeserge.com","ilk.agency","indus.wilddogdevelopment.com","ixxooi.com","jewelry-0701-ice-life.com","katybikova.com","kindmate.test","kmasilamani.com","lanzhang76.github.io","letrado.ua","linnwergelius.github.io","lux.luxboxcase.com","mj89sp3sau2k7lj1eg3k40hkeppguj6j-a-sites-opensocial.googleusercontent.com","mob-school.tilda.ws","moinqureshi.trade","musicvienna.com","myweb.ncku.edu.tw","nurlat-tat.ru","oloelemu.ru","oneglobal.jiveon.com","paulrnovak.com","paymaster.aqsipos.ru","preprod.cliogoldbrenner.com","project1238951.tilda.ws","project1282741.tilda.ws","project1515081.tilda.ws","project1553463.tilda.ws","project1624577.tilda.ws","qug.la","redhotbyalexina.com","rickyvann.com","rsmit.ccvsite.nl","samvelmkrtchyan.com","sas.utmn.ru","selina.com","star-agency.ru","stg.warnerchappell.com","sun-moon.org","tbenschop.ccvsite.nl","team-d-0.testbanki.ru","travelex.madebywiser.com","urist24.pro","vbkgdabi9581hmto-5423562816.shopifypreview.com","vinimondodev.myshopify.com","warnerchappell.dk","warnerchappell.se","widoobiz.com","wsffest.com","www-int.arengu.com","zwetz.design"];function videoVimeo(e){var n=new Vimeo.Player("embed-video",getVimeoOptions(e));return e.muted||n.setVolume(1),{type:"vimeo",load:function(e){n.loadVideo(getVimeoOptions(e))},node:function(){return n.element},play:function(){n.play()},pause:function(){n.pause()},mute:function(){n.setVolume(0)},unmute:function(){n.setVolume(1)},getPaused:function(e){n.getPaused().then(e)},getWidth:function(e){n.getVideoWidth().then(e)},getHeight:function(e){n.getVideoHeight().then(e)},getTime:function(e){n.getCurrentTime().then(e)},setTime:function(e){n.setCurrentTime(e)},setLoop:function(e){n.setLoop(e)},getDuration:function(e){n.getDuration().then(e)},getMuted:function(o){n.getVolume().then(function(e){o(0===e)})},onLoadstart:function(e){n.on("bufferstart",e)},onLoadend:function(e){n.on("bufferend",e)},onReady:function(e){n.on("loaded",e)},onPlay:function(e){n.on("play",e)},onPause:function(e){n.on("pause",e)},onTimeupdate:function(e){n.on("timeupdate",e)},onVolumechange:function(e){n.on("volumechange",e)},onEnded:function(e){n.on("ended",e)},onSeeked:function(e){n.on("seeked",e)}}}function isVimeo(e){return e&&e.match(/vimeo\.com\/(\d+)/i)}function getVimeoId(e){return matches=e.match(/vimeo\.com\/(\d+)/i),matches?matches[1]:null}function getVimeoOptions(e){return{url:e.url,controls:!1,muted:e.muted,autoplay:e.autoplay,loop:e.loop,quality:e.quality,responsive:!0}}
