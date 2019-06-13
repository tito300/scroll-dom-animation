import constants from './constants';

/**
 * each animation property has initial and apply objects.
 * 
 * initial is to initialize the position before animation.
 * apply contains the desitination values which is the original value. 
 * 
 * properties could be functions or strings. functions accept original value 
 * property which is used in case the user already had set a value for the corresponing property 
 * in his css to avoid conflictions. example: if user already has a transformX(-50px) on the element, 
 * we want to return the element to that value instead of 0px;
 * 
 */
const animations = {
    '<-': {
        initial: {
            transform: (clientConfigs, originalStyles) => getPreAnimateMatrix(clientConfigs, originalStyles, '<-'),
            opacity: '0',
        },
        apply: {
            transform: (originalValue) =>  originalValue && originalValue !== 'none' ? originalValue : `translateX(0)`,
            opacity: (originalValue) => originalValue && originalValue !== 'none' ? originalValue : '1'
        }
    },
    '->': {
        initial: {
            transform: (clientConfigs, originalStyles) => getPreAnimateMatrix(clientConfigs, originalStyles, '->'),
            opacity: '0',
        },
        apply: {
            transform: (originalValue) => originalValue && originalValue !== 'none' ? originalValue : `translateX(0)`,
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
            transform: (clientConfigs) => `scale(${clientConfigs.scaleFactor ? 1 - clientConfigs.scaleFactor : '0.7'})`,
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
 * computes pre animation matrix based on client provided configs and original client css values.
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