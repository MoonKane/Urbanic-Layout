window.onload = function() {

	/*  Navigation  */

	const headerStyle = window.getComputedStyle(document.querySelector('.header .main'));
	const headerHeight = parseInt(headerStyle.height) + parseInt(headerStyle.paddingTop) + parseInt(headerStyle.paddingBottom);

	const nav = document.querySelectorAll('.nav a');
	nav.forEach(value => {
		value.addEventListener('click', () => {
			const attr = value.dataset.href;
			const obj = document.querySelector(attr);
			const coords = getCoords(obj).top - headerHeight;

			window.scrollTo({ top: coords, behavior: 'smooth' });

		});
	});

	const sectionBlocks = document.querySelectorAll('.nav_Block');

	window.addEventListener('scroll', scrollChange);
	function scrollChange() {
		let obj, coords;
		const windowScrollCoords = window.scrollY;

		let lastBlock = false;

		sectionBlocks.forEach((value, index) => {
			if(!lastBlock) {
				const coordes = getCoords(value).top - headerHeight;
				if(coordes > windowScrollCoords) {
					obj = sectionBlocks[index-1];
					coords = coordes;
					lastBlock = true;
				} else if(index == sectionBlocks.length-1) {
					obj = sectionBlocks[index];
					coords = coordes;
					lastBlock = true;
				}
			}
		});

		const delActiveBlock = document.querySelector('a.active');
		const addActiveBlock = document.querySelector(`a[data-href="#${obj.id}"]`);

		delActiveBlock.classList.remove('active');
		addActiveBlock.classList.add('active');
	}
	scrollChange();

	function getCoords(elem) {
		var box = elem.getBoundingClientRect();
	
		return {
			top: box.top + scrollY,
			left: box.left + scrollX
		};
	
	}


	/*  Slider  */

	const sliderBlocks = document.querySelectorAll('.slider_wrapper .slide');
	const leftSlider = document.querySelector('.welcome .left .sidebar_block');
	const rightSlider = document.querySelector('.welcome .right .sidebar_block');

	const sliderActiveBox = document.querySelectorAll('.boxs li');

	let activeSlideNumber = 0;

	switchSlidesDisplay(activeSlideNumber);

	leftSlider.addEventListener('click', sliderLeft);
	rightSlider.addEventListener('click', sliderRight);
	for(let i = 0; i < sliderActiveBox.length; i++) {
		sliderActiveBox[i].addEventListener('click', () => {
			switchSlidesDisplay(i);
		});
	}

	function sliderLeft() {
		if(activeSlideNumber == 0)
			switchSlidesDisplay(sliderBlocks.length-1);
		else
			switchSlidesDisplay(activeSlideNumber-1);
	}

	function sliderRight() {
		if(activeSlideNumber == sliderBlocks.length-1)
			switchSlidesDisplay(0);
		else
			switchSlidesDisplay(activeSlideNumber+1);
	}

	function switchSlidesDisplay(number) {
		for(let i = 0; i < sliderBlocks.length; i++) {
			if(number == i) {
				sliderBlocks[i].style.display  = 'block';
				sliderActiveBox[i].classList.add('slide_active');
				activeSlideNumber = i;
			} else {
				sliderBlocks[i].style.display  = 'none';
				sliderActiveBox[i].classList.remove('slide_active');
			}
		}
	}

	/*  Our_Portfolio Chapter_Blocks  */ 

	const tags = document.querySelectorAll('.chapter_pharagraf');
	const blocks = document.querySelectorAll('.photo_block');

	let activeTag = 0;

	tags.forEach((tagsTag, i) => {
		tagsTag.addEventListener('click', () => {
				

				tagsTag.classList.add('active');
				tags[activeTag].classList.remove('active');
				activeTag = i;

				if(tagsTag.dataset.id == 'all') {
					blocks.forEach(blocksTag => {
						styleChange(blocksTag, false);
					});
				} else {
					blocks.forEach(blocksTag => {
						if(blocksTag.dataset.id == tagsTag.dataset.id) {
							styleChange(blocksTag, false);
						} else {
							styleChange(blocksTag, true);
						}
					});
				}
		});
	});

	function styleChange(tag, hidden) {
		if(hidden == true) {
			/* tag.style.opacity = 0;
			tag.style.visibility = 'hidden';
			tag.style.position = 'absolute';*/
			tag.style.display = 'none';
		} else if(hidden == false) {
			/* tag.style.opacity = 1;
			tag.style.visibility = 'visible';
			tag.style.position = 'inherit'; */
			tag.style.display = 'block';
		}
	}

}