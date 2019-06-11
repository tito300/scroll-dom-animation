import constants from './constants';
import utils from './utils';

let getRandomBool = utils().getRandomBool;
/**
 * each animation property has initial and apply objects.
 * 
 * initial is to initialize the position before animation so that
 * user doesn't have to touch css.
 * 
 * apply contains the desitination values. properties could be functions or
 * strings. functions accept original value property if user already had set
 * a value for the corresponing property in his css to avoid conflictions.
 */
const animations = {
    '-><-': {
        initial: {
            transform: (clientConfigs) => `translateX(${getRandomBool() && '-'}${clientConfigs.offset || constants.MOVEMENT_DISTANCE}px)`,
            opacity: '0',
        },
        apply: { 
            transform: (originalValue) => originalValue || `translateX(0)`,
            opacity: (originalValue) => originalValue && originalValue !== 'none' ? originalValue : '1'
        },
    },
    '<-': {
        initial: {
            transform: (clientConfigs, originalStyles) => getPreAnimateMatrix(clientConfigs, originalStyles, '<-'),
            opacity: '0',
        },
        apply: {
            transform: (originalValue) => originalValue || `translateX(0)`,
            opacity: (originalValue) => originalValue && originalValue !== 'none' ? originalValue : '1'
        }
    },
    '->': {
        initial: {
            transform: (clientConfigs, originalStyles) => getPreAnimateMatrix(clientConfigs, originalStyles, '->'),
            opacity: '0',
        },
        apply: {
            transform: (originalValue) => originalValue || `translateX(0)`,
            opacity: (originalValue) => originalValue && originalValue !== 'none' ? originalValue : '1'
        }
    }, 
    '^': {
        initial: {
            transform: (clientConfigs, originalStyles) => getPreAnimateMatrix(clientConfigs, originalStyles, '^'),
            opacity: '0',
        },
        apply: {
            transform: (originalValue) => originalValue || `translateY(0)`,
            opacity: (originalValue) => originalValue && originalValue !== 'none' ? originalValue : '1'
        }
    }, 
    'v': {
        initial: {
            transform: (clientConfigs, originalStyles) => getPreAnimateMatrix(clientConfigs, originalStyles, 'v'),
            opacity: '0',
        },
        apply: {
            transform: (originalValue) => originalValue || `translateY(0)`,
            opacity: (originalValue) => originalValue && originalValue !== 'none' ? originalValue : '1'
        }
    }, 
    '/^': {
        initial: {
            transform: (clientConfigs, originalStyles) => getPreAnimateMatrix(clientConfigs, originalStyles, '/^'),
            opacity: '0',
        },
        apply: {
            transform: (originalValue) => originalValue || `translate(0px, 0px)`,
            opacity: (originalValue) => originalValue && originalValue !== 'none' ? originalValue : '1'
        }
    }, 
    'v/': {
        initial: {
            transform: (clientConfigs, originalStyles) => getPreAnimateMatrix(clientConfigs, originalStyles, 'v/'),
            opacity: '0',
        },
        apply: {
            transform: (originalValue) => originalValue || `translate(0px, 0px)`,
            opacity: (originalValue) => originalValue && originalValue !== 'none' ? originalValue : '1'
        }
    }, 
    '.o': {
        initial: {
            transform: (clientConfigs) => `scale(${clientConfigs.scaleFactor || '0.5'})`,
            opacity: '0',
        },
        apply: {
            transform: (originalValue) => originalValue && originalValue !== 'none' ? originalValue : `scale(1)`,
            opacity: (originalValue) => originalValue && originalValue !== 'none' ? originalValue : '1'
        }
    }, 
    'o.': {
        initial: {
            transform: (clientConfigs) => `scale(${clientConfigs.scaleFactor ? 1 + clientConfigs.scaleFactor : '1.1'})`,
            opacity: '0',
        },
        apply: {
            transform: (originalValue) => originalValue && originalValue !== 'none' ? originalValue : `scale(1)`,
            opacity: (originalValue) => originalValue && originalValue !== 'none' ? originalValue : '1'
        }
    }, 
    '.oo.': {
        initial: {
            transform: (clientConfigs) => `scale(${!clientConfigs.scaleFactor ? getRandomBool() ? '0.5' : '1.1' 
                : getRandomBool() ? clientConfigs.scaleFactor :  clientConfigs.scaleFactor + 1 })`,
            opacity: '0',
        },
        apply: {
            transform: (originalValue) => `scale(${originalValue && originalValue !== 'none' ? originalValue : '1'})`,
            opacity: (originalValue) => originalValue && originalValue !== 'none' ? originalValue : '1'
        }
    },
    '*': {
        initial: {
            opacity: '0',
        },
        apply: {
            opacity: (originalValue) => originalValue && originalValue !== 'none' ? originalValue : '1'
        }
    }, 
     
}

/**
 * computes pre animated position based on client provided configs and original client css.
 * we take original css into consideration to return elements to their original position in
 * case client uses the same css properties we modify here.
 *  
 * matrix(scaleX(),skewY(),skewX(),scaleY(),translateX(),translateY())
 * 
 * @param {Object} clientConfigs client options per element
 * @param {Object} originalStyles original client css
 * @param {String} direction 
 */ 
function getPreAnimateMatrix(clientConfigs, originalStyles, direction) {
    if(direction === '^' || direction === 'v') {
        let booleanSign = direction === '^' ? '' : '-' 
        let offset = clientConfigs.offset || constants.MOVEMENT_DISTANCE;
        let transform = originalStyles.transform;
        
        offset = booleanSign === '-' ? offset*(-1) : offset;
        if(transform && transform !== 'none') {
            let value = parseInt(transform.split(',')[5].split(')')[0]);
            value = offset ? value + offset : value + constants.MOVEMENT_DISTANCE;
            return `matrix(1, 0, 0, 1, 0, ${value})`
        } else {
            return `matrix(1, 0, 0, 1, 0, ${offset})`;
        } 
    } else if(direction === '->' || direction === '<-') {
        let booleanSign = direction === '<-' ? '' : '-' 
        let offset = clientConfigs.offset || constants.MOVEMENT_DISTANCE;
        let transform = originalStyles.transform;

        offset = booleanSign === '-' ? offset*(-1) : offset;
        if(transform && transform !== 'none') {
            let position0 = parseInt(transform.split(',')[0].split('(')[1])
            let position1 = parseInt(transform.split(',')[1].split(',')[0])
            let position2 = parseInt(transform.split(',')[2].split(',')[0])
            let position3 = parseInt(transform.split(',')[3].split(',')[0])
            let position5 = parseInt(transform.split(',')[5].split(',')[0])
            let value = parseInt(transform.split(',')[4].split(',')[0]);
            value = offset ? value + offset : value + constants.MOVEMENT_DISTANCE;
            console.log(`matrix(${position0}, ${position1}, ${position2}, ${position3}, ${value}, ${position5})`)
            return `matrix(${position0}, ${position1}, ${position2}, ${position3}, ${value}, ${position5})`
        } else {
            return `matrix(1, 0, 0, 1, ${offset}, 0)`;
        } 
    } else if(direction === '/^' || direction === 'v/') {
        let booleanSign = direction === '/^' ? '' : '-' 
        let offset = clientConfigs.offset || constants.MOVEMENT_DISTANCE;
        let transform = originalStyles.transform;

        offset = booleanSign === '-' ? offset*(-1) : offset;
        if(transform && transform !== 'none') {
            let position0 = parseInt(transform.split(',')[0].split('(')[1])
            let position1 = parseInt(transform.split(',')[1].split(',')[0])
            let position2 = parseInt(transform.split(',')[2].split(',')[0])
            let position3 = parseInt(transform.split(',')[3].split(',')[0])
            let valueX = parseInt(transform.split(',')[4].split(',')[0]);
            let valueY = parseInt(transform.split(',')[5].split(')')[0]);
            valueX = offset ? value + offset : value + constants.MOVEMENT_DISTANCE;
            valueY = offset ? value + offset : value + constants.MOVEMENT_DISTANCE;
            console.log(`matrix(${position0}, ${position1}, ${position2}, ${position3}, ${valueX}, ${valueY})`)
            return `matrix(${position0}, ${position1}, ${position2}, ${position3}, ${valueX}, ${valueY})`
        } else {
            if(booleanSign === '-') {
                return `matrix(1, 0, 0, 1, ${Math.abs(offset)}, ${offset})`;
            } else {
                return `matrix(1, 0, 0, 1, ${offset*(-1)}, ${offset})`;
            }
        }  
    }
}

export default animations;