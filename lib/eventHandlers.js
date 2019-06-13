import util from './utils';
import Element from './Element';
const { getNewElement, inView } = util();

export default  function eventHandlers(inViewDistance) {
        let elementInstances = [];
    
        function handleScrollAnimation(e) {
            (function animateInstances() {
                elementInstances.forEach(element => {
                    if(inView(element.element, inViewDistance)) {
                        element.animate();
                    } else {
                        element.initializePosition();
                    }
                })
            })()
        }
    
        const initializeInstances = (elementsToAnimate) => () => {
            if(!(elementsToAnimate instanceof Array)) throw "argument must be of type array";
    
            if(elementsToAnimate[0] instanceof Array) {
                // sample input: [[selector, direction, options], [...same]]
                elementsToAnimate.forEach(elementSelector => {
                    _getElementInstances(elementSelector);
                })            
            } else if(typeof elementsToAnimate[0] === 'string') {
                /** 
                * this is an optimized for when user provides selector as argument rather
                * than an array of selectors
                * sample input: ['.selector', direction, options]
                */                    
                _getElementInstances(elementsToAnimate);
            } else {
                throw "argument must be of type array. Example 1: ['.selector', '->', options] \n Example 2: [['.selector', '->', options], [], []]"
            }        
        }
    
        function _getElementInstances(elementSelectors) {
            const elementIndex = elementSelectors[2] ? elementSelectors[2].elementIndex : false;
            const elementSelector = elementSelectors[0];
            const animationDirection = elementSelectors[1] ? elementSelectors[1] : '';
            const options = elementSelectors[2] || { time: null, offset: null, inViewDistance, elementIndex };
            const elements = getNewElement(elementSelector);
            const directions = _getDirection(animationDirection);
    
            if(!elements.forEach) {
                let instance = new Element(elements, animationDirection, options);
                elementInstances = [...elementInstances, instance];
            } else {
                let bool = true;
                elements.forEach((each, i) => {
                    if(elementIndex && !elementIndex.includes(i)) return;
                    let instance;
    
                    if(Array.isArray(directions)) {
                        let currentDirection = bool ? directions[0] : directions[1];
                        bool = !bool;
                        instance = new Element(each, currentDirection, options)
                    } else {
                        instance = new Element(each, animationDirection, options)
                    }
                    elementInstances = [...elementInstances, instance];
                });
            }
        }
    
        function smoothScrollToAnchor(e) {
            e.preventDefault();
            const scrollToTarget = getHrefTarget(e);
            if(!scrollToTarget) return console.error('href attribute on the element provided does not contain an anchor');
        
            const targetElement = document.getElementById(scrollToTarget);
            targetElement.scrollIntoView({ behavior: "smooth", block: 'start' })
        }
    
        function _getDirection(direction) {
            if(direction.length === 4) {
                let result = [];
                result.push(direction.split('').splice(0, 2).join(''))
                result.push(direction.split('').splice(2, 4).join(''))
                return result;
            } else if(direction === '^v' || direction === 'v^') {
                return ['^', 'v']
            } else {
                return direction;
            }
        }
    
        return {
            handleScrollAnimation,
            smoothScrollToAnchor,
            initializeInstances
        }
    }