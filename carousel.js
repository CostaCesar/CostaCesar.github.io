function modulo(number, mod)
{
    let result = number % mod;
    if (result < 0) {
        result += mod;
    }
    return result;
}

class Carousel 
{
    constructor(carousel, buttons) 
    {
        // find elements
        this.carousel = carousel;
        this.buttonPrevious = carousel.querySelector('[data-carousel-btn-prev]');
        this.buttonNext = carousel.querySelector('[data-carousel-btn-next]');
        this.slidesContainer = carousel.querySelector('[data-carousel-slides]');

        // state
        this.currentSlide = this.startSlide = 0;
        this.aboutSlide = 2;
        this.workSlide = 3;
        this.numSlides = this.slidesContainer.children.length;

        // add events
        this.buttonPrevious.addEventListener('click', this.handlePrevious.bind(this));
        this.buttonNext.addEventListener('click', this.handleNext.bind(this));
        buttons[0].addEventListener('click', this.gotoStart.bind(this));
        buttons[1].addEventListener('click', this.gotoAbout.bind(this));
        buttons[2].addEventListener('click', this.gotoWorks.bind(this));
    }

    handle_Slides()
    {
        if(this.currentSlide == 0) slide0_anim.start()
        else slide0_anim.stop();
        
        if(this.currentSlide == 1)  slide1_anim.start()
        else slide1_anim.stop();
    }

    gotoStart()
    {
        this.currentSlide = this.startSlide;
        this.carousel.style.setProperty('--current-slide', this.currentSlide);
        this.handle_Slides();
    }
    gotoAbout()
    {
        this.currentSlide = this.aboutSlide;
        this.carousel.style.setProperty('--current-slide', this.currentSlide);
        this.handle_Slides();
    }
    gotoWorks()
    {
        this.currentSlide = this.workSlide;
        this.carousel.style.setProperty('--current-slide', this.currentSlide);
        this.handle_Slides();
    }

    handleNext() 
    {
        this.currentSlide = Math.min(this.currentSlide+1, this.numSlides-1)
        this.carousel.style.setProperty('--current-slide', this.currentSlide);
        this.handle_Slides();
    }

    handlePrevious() 
    {
        this.currentSlide = Math.max(this.currentSlide-1, 0)
        this.handle_Slides();
        this.carousel.style.setProperty('--current-slide', this.currentSlide);
    }
}

function load_Carousel()
{
    buttons= document.querySelectorAll('[data-btn]');
    const carousels = document.querySelectorAll('[data-carousel]');
    carousels.forEach(carousel => new Carousel(carousel, buttons));
}