function modulo(number, mod)
{
    let result = number % mod;
    if (result < 0) {
        result += mod;
    }
    return result;
}

class Slide
{
    constructor(index, animation)
    {
        this.index = index;
        this.animation = animation;
    }

    handle_animations()
    {
        if(this.animation == "rain")
            rainAnimation.start()
        else rainAnimation.stop();

        if(this.animation == "fire")
            fireAnimation.start()
        else fireAnimation.stop();
    }
}
class Carousel 
{
    constructor(carousel, buttons) 
    {
        // find elements
        this.carousel = carousel;
        this.slidesContainer = carousel.querySelector('[data-carousel-slides]');
        this.buttons = buttons;
        this.slides = {};

        // state
        for(let i = 0; i < this.slidesContainer.children.length; i++)
        {
            let element = this.slidesContainer.children[i];
            this.slides[i] = new Slide(element.dataset.carouselIndex, element.dataset.animation);
            
            buttons[i].addEventListener('click', this.gotoSlide.bind(this, i));
        }
        this.numSlides = this.slidesContainer.children.length;

        // add events
    }

    gotoSlide(i)
    {
        this.currentSlide = i;
        this.handle_Slides();
    }

    handle_Slides()
    {
        window.scrollTo(0, 0);
        this.carousel.style.setProperty('--current-slide', this.currentSlide);
        
        this.slides[this.currentSlide].handle_animations();
        this.buttonHighLight();
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
}

function load_Carousel()
{
    buttons = document.querySelectorAll('[data-btn]');
    const carousels = document.querySelectorAll('[data-carousel]');
    carousels.forEach(carousel => new Carousel(carousel, buttons));
}