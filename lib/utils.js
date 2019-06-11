import constants from './constants';

/**
 * contains helper functions
 * @returns {Object} 
 */
export default function utils() {
    /**
         * takes an element and checks of its in view
         * @param {Object} element
         * @returns {Boolean}
         */
        function inView(element, inViewDistance = constants.IN_VIEW) {
            const viewHeight = window.innerHeight;
            return viewHeight - element.getBoundingClientRect().top > inViewDistance ? true
                : false;
        }
    /**
     * returns the href target stripped
     * @param {Event} e takes an event object
     * @returns {String}
     */
    function getHrefTarget(e) {
        const hrefParts = e.target.href.split('/');
        let scrollToTarget = hrefParts[hrefParts.length - 1];
        if (scrollToTarget.includes('#')) scrollToTarget = scrollToTarget.split('#')[1]
        return scrollToTarget;
    }

    function getRandomBool() {
        return Math.floor(Math.random() * 2) && true;
    }

    return {
        inView,
        getHrefTarget,
        getRandomBool
    }
}