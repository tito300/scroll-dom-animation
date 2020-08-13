import scrollDomAnimation from '../index.js';
console.log('called');

scrollDomAnimation.animate([
    ['.first-el', '->'],
    ['.first-el', '<-'],
    ['.third-el', '->'],
]);
// console.log(scrollDomAnimation); 