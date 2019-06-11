import constants from './constants';
import animations from './animations';
import utils from './utils';

let { inView } = utils();

export default class Element {
    constructor(elementToAnimate, direction, options) {
        this.constansts = constants; 
        this.animation = this._getAnimationObj(direction);
        this.element = elementToAnimate;
        this.originalStyle = {...getComputedStyle(elementToAnimate)};
        this.clientProvidedInitials = options || {};
        this.element.style.transition = `${options.time || constants.TRANSITION_TIME}s linear`;

        this.initializePosition();
        if(inView(this.element, options.inViewDistance)) {
            this.animate();
        }
    }

    initializePosition() {
        const keys = Object.keys(this.animation.initial);
        keys.forEach(key => {
            let value = this.animation.initial[key] instanceof Function ? this.animation.initial[key](this.clientProvidedInitials, this.originalStyle) 
                : this.animation.initial[key];
            this.element.style[key] = value;
        })
    }

    animate() {
        const keys = Object.keys(this.animation.apply);
        keys.forEach(key => {
            let value;
            value = this.animation.apply[key] instanceof Function ? this.animation.apply[key](this.originalStyle[key]) 
                : this.animation.apply[key];   
            this.element.style[key] = value;
        })
    }

    _getAnimationObj(direction) {
        if(typeof direction !== 'string') throw 'direction value must be of type string';

        let result = 'random';
        if(direction === '') return result;

        result = animations[direction];
        if(!result) throw 'animation direction provided does not exist';
        
        return result;
    }
}