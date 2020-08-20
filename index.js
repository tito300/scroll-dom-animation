import utils from './lib/utils.js';
import constants from './lib/constants.js';
import EventHandlers from './lib/eventHandlers.js';
const { getHrefTarget, inView } = utils();

/**
 * @typedef {"^"|"v"|"->"|"<-"|".o"|"o."|".oo."|"o..o"|"*"|"-><-"|"<-->"|"^v"|"v^"|"/^"|"v/"|"v//^"} Directions
 * @typedef {{inViewDistance?: number}} Configs
 * @typedef {{offset?: number, scaleFactor?: number, time?: number, inViewDistance?: number}} AnimateOptions
 * @typedef {[string, Directions, AnimateOptions]} ElementSelector
 */

 /**
  * Factory Function
  * @function
  */
const scrollDomAnimation = (function() {
    let inViewDistance = constants.IN_VIEW;
    const _export = {}
    
    /**
     * @public
     * @param {Configs} options 
     * @returns {void}
     */
    _export.configure = function(options) {
        if(!options) return;
        if(!(options instanceof Object)) throw 'argument must be of type Object'

        inViewDistance = options.inViewDistance || constants.IN_VIEW;
    }

    // TODO: add support for object arguments
    /**
     * @public
     * @param {ElementSelector[]} elementSelectors 
     * @returns {void}
     */
    _export.animate = function(elementSelectors) {
        // @ts-ignore
        if(!elementSelectors instanceof Array) throw 'options must be of type array';

        const { handleScrollAnimation, initializeInstances } = EventHandlers(inViewDistance);

        window.onload = initializeInstances(elementSelectors);
        window.onscroll = handleScrollAnimation;
    }

    /**
     *  Helper util
     *  takes event object and scrolls smoothly to the href value of the target element
     *  @public
     *  @param {Event} e takes the event object provided by the eventlistener 
     *  @returns {void}
     *  */ 
    _export.smoothScroll = function (e) {
        e.preventDefault();
        const scrollToTarget = getHrefTarget(e);
            

        const targetElement = document.getElementById(scrollToTarget);
        targetElement.scrollIntoView({ behavior: "smooth", block: 'start' })
    }

    return _export;
})()

export default scrollDomAnimation;