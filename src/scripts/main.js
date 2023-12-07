// Current year
const currentYear = () => {
	const target = document.querySelector('.js-year')

	if (!target) return

	const date = new Date()
	target.innerHTML = date.getFullYear().toString()

}

currentYear()

// Menu
const navCheckbox = document.querySelector('.nav-toggle-checkbox')
const header = document.querySelector('.header')

const menuOpen = (headerEl) => {
	headerEl.classList.add('header--menu-is-open')
	headerEl.classList.remove('header--menu-is-closed')
}

const menuClose = (headerEl) => {
	headerEl.classList.add('header--menu-is-closed')
	headerEl.classList.remove('header--menu-is-open')
}

const openMenuChecker = () => {
	const overlay = document.querySelector('.nav__overlay')

	if (!header && !navCheckbox && !overlay) return

	navCheckbox.addEventListener('change', (e) => {
		if (e.target.checked) {
			menuOpen(header)

		} else {
			menuClose(header)

		}
	})

	overlay.addEventListener('click', () => {
		navCheckbox.checked = false
		menuClose(header)
	})
}

openMenuChecker()

// --- close menu after click (because one page)
const navLinks = document.querySelectorAll('.nav__link')

if (navLinks) {
	const header = document.querySelector('header')

	navLinks.forEach((link) => {
		link.addEventListener('click', () => {
			navCheckbox.checked = false
			menuClose(header)
		})
	})
}


// Scrolling handler
const headerTag = document.querySelector('header')
const main = document.getElementById('main')
const scrollChecker = document.createElement('div')

scrollChecker.setAttribute('data-scroll', '')
main.before(scrollChecker)

const headerObserver = new IntersectionObserver((entries) => {
	headerTag.classList.toggle('js-is-scrolled', !entries[0].isIntersecting)
}, {rootMargin: '120px 0px 0px 0px'})

headerObserver.observe(scrollChecker)

// --- services
const servicesEntries = document.querySelectorAll('.services__item')
const servicesObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry, index) => {
		// entry.target.classList.toggle('js-is-in-viewport', entries[index].isIntersecting)
		if (entries[index].isIntersecting) {
			entry.target.classList.add('js-is-in-viewport')
		}
	});
}, {rootMargin: '64px 0px 0px 0px'});

servicesEntries.forEach((i) => {
	if (i) {
		servicesObserver.observe(i);
	}
});


// Video hero
const isVideoPlaying = (video) => (video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2)

const videoCreator = () => {
	let video = document.createElement("video")
	video.setAttribute("webkit-playsinline", "")
	video.setAttribute("playsinline", "")
	video.setAttribute("muted", "")
	video.setAttribute("loop", "loop")
	video.setAttribute("width", "100%")
	video.setAttribute("height", "100%")
	video.setAttribute("class", "hero-video__item")
	video.setAttribute("autoplay", "")
	video.setAttribute("preload", "metadata")

	if (window.matchMedia("(min-width: 992px)").matches) {
		video.setAttribute("data-v-desktop", "")
		video.setAttribute("src", "/video-hero--desktop.mp4")
		video.setAttribute("poster", "/bg-default-hero.jpg")

	} else {
		video.setAttribute("data-v-mobile", "")
		video.setAttribute("src", "/video-hero--mobile.mp4")
		video.setAttribute("poster", "/bg-default-hero--mobile.jpg")
	}

	const videoContainer = document.querySelector('.hero-video')
	videoContainer.appendChild(video)
	video.muted = true // without it - it doesn't autoplay realiably

	const videoControls = document.querySelector('.hero__controls')
	videoControls.setAttribute('data-status', 'playing')
	videoContainer.classList.add('js-video-is-loaded')

	/*video.addEventListener('loadeddata', () => {

		if (video.readyState >= 3) { // 3 = HAVE_FUTURE_DATA (https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState)
			console.log('inside readystate');
			videoContainer.classList.add('js-video-is-loaded')

			if (isVideoPlaying(video)) {
				videoControls.setAttribute('data-status', 'playing')
			}
		}
	}, false)*/

	videoControls.addEventListener('click', (e) => {
		if (isVideoPlaying(video)) {
			video.pause()
			e.target.setAttribute('data-status', 'paused')

		} else {
			video.play()
			e.target.setAttribute('data-status', 'playing')

		}
	})
}

videoCreator()