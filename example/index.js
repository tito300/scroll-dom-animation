import scrollDomAnimation from '../index.js';
console.log('called');

scrollDomAnimation.animate([
    ['.row-1-col-1', '.o', { offset: 500 }],
    ['.row-1-col-2', 'o.', { offset: 500 }],
    ['.row-2-col-1', '->', {}],
    ['.row-2-col-2', '<-', {}],
    ['.row-4-col-1', '^', {}],
    ['.row-4-col-2', 'v', {}],
]);
// console.log(scrollDomAnimation); 