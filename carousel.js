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
        this.animations = {};
        this.buttons = buttons;

        // state
        for(let i = 0; i < this.slidesContainer.children.length; i++)
        {
            let element = this.slidesContainer.children[i];
            if(element.dataset.carouselIndex == "start")
                this.currentSlide = this.startSlide = i;
            else if(element.dataset.carouselIndex == "about")
                this.aboutSlide = i;
            else if(element.dataset.carouselIndex == "work")
                this.workSlide = i;

            if(element.dataset.animation == "rain")
                this.animations["rain"] = i;
            else if(element.dataset.animation == "fire")
                this.animations["fire"] = i;
        }
        this.numSlides = this.slidesContainer.children.length;

        // add events
        if(this.buttonNext && this.buttonPrevious)
        {
            this.buttonPrevious.addEventListener('click', this.handlePrevious.bind(this));
            this.buttonNext.addEventListener('click', this.handleNext.bind(this));
        }
        buttons[0].addEventListener('click', this.gotoStart.bind(this));
        buttons[1].addEventListener('click', this.gotoAbout.bind(this));
        buttons[2].addEventListener('click', this.gotoWorks.bind(this));
    }

    handle_Slides()
    {
        window.scrollTo(0, 0);
        this.carousel.style.setProperty('--current-slide', this.currentSlide);
        
        if(this.currentSlide == this.animations["rain"]) rainAnimation.start()
        else rainAnimation.stop();
        
        if(this.currentSlide == this.animations["fire"])  fireAnimation.start()
        else fireAnimation.stop();
    }

    buttonHighLight()
    {
        for(let i = 0; i < this.numSlides; i++)
        {
            if(this.currentSlide == i)
            {
                console.log("Focusing button " + i);
                this.buttons[i].classList.add('active-button');
            }
            else this.buttons[i].classList.remove('active-button');
        }
    }

    gotoStart()
    {
        this.currentSlide = this.startSlide;
        this.buttonHighLight();
        this.handle_Slides();
    }
    gotoAbout()
    {
        this.currentSlide = this.aboutSlide;
        this.buttonHighLight();
        this.handle_Slides();
    }
    gotoWorks()
    {
        this.currentSlide = this.workSlide;
        this.buttonHighLight();
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