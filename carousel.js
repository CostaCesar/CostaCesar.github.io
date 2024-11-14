var g_carrousel;

let g_touch_start_X = 0
let g_touch_end_X = 0
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
        this.currentSlide = 0;

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

    GoNext() 
    {
        let new_slide = Math.min(this.currentSlide+1, this.numSlides-1);
        this.gotoSlide(new_slide);
    }
    
    GoPrevious() 
    {
        let new_slide = Math.max(this.currentSlide-1, 0);
        this.gotoSlide(new_slide);
    }
}

function checkDirection() {
    const k_touch_tolerance = 50;

    if (g_touch_end_X + k_touch_tolerance < g_touch_start_X )
    {
        // Left Swap
        g_carrousel.GoNext();
    }
    if (g_touch_end_X > g_touch_start_X  + k_touch_tolerance)
    {
        // Right Swap
        g_carrousel.GoPrevious();
    }
}

function load_Carousel()
{
    buttons = document.querySelectorAll('[data-btn]');
    const carousel = document.querySelector('[data-carousel]');
    g_carrousel = new Carousel(carousel, buttons);

    document.addEventListener('touchstart', e => {
        g_touch_start_X  = e.changedTouches[0].screenX
    })
    document.addEventListener('touchend', e => {
        g_touch_end_X = e.changedTouches[0].screenX
        checkDirection()
    })
}

