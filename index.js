import utils from './lib/utils';
import constants from './lib/constants';
import eventHandlers from './lib/eventHandlers';
const { getHrefTarget, inView } = utils();

const scrollDomAnimation = (function() {
    let inViewDistance = constants.IN_VIEW;
    const scrollDomAnimation = {}

    scrollDomAnimation.configure = function(options) {
        if(!options) return;
        if(!(options instanceof Object)) throw 'argument must be of type Object'

        inViewDistance = options.inViewDistance || constants.IN_VIEW;
    }

    // TODO: add support for object arguments
    scrollDomAnimation.animate = function(elementSelectors) {
        if(!elementSelectors instanceof Array) throw 'options must be of type array';

        const { handleScrollAnimation, initializeInstances } = eventHandlers(inViewDistance);

        window.onload = initializeInstances(elementSelectors);
        window.onscroll = handleScrollAnimation;
    }

    /**
     *  takes event object and scrolls smoothly to the href value of the target element
     *  @param {Event} event takes the event object provided by the eventlistener 
     *  */ 
    scrollDomAnimation.smoothScroll = function (e) {
        e.preventDefault();
        const scrollToTarget = getHrefTarget(e);
            

        const targetElement = document.getElementById(scrollToTarget);
        targetElement.scrollIntoView({ behavior: "smooth", block: 'start' })
    }

    return scrollDomAnimation;
})()

export default scrollDomAnimation;