# scroll-dom-animation
utalizing a declarative approach, this library makes animating dom elements on the scroll event super easy.

## sample

```
                                  class name     animation direction
                                        |               |
                                        v               v
                                  
  scrollDomAnimation.animate([ '.element__Selector',   '->',  options])
```
## [demo](https://tito300.github.io/portfolio/)

All animations in the this demo are done through this library using this code:

```
const elementsToAnimate = [
    ['.project__img', '-><-', { time: 0.4 }], 
    ['.project__num', '-><-', { time: 0.5 }],
    ['.projects__header', '^'],
    ['#about .card', 'o.', {time: 0.4}],
    ['#about .card-title', '.o', {scaleFactor: 0.5}],
    ['#about .card-text', '*', {time: 0.8}],
    ['#resume .card', '^'],
    ['#resume .card-link', '->', { time: 0.7}],
    ['#connect .btn', '^v', {time: 0.5, offset: 20},], 
]

scrollDom.animate(elementsToAnimate);
```

## How it works
This library allows you to animate your existing dom elements without having to change any of the original css code which works very well with css libraries such as bootstrap. This also means when you style your elements you would place them in their intended final position (after animation) and our library takes care of animation. 

There are three benefits to this approach: 
  * you can use this library on an existing project without touching any css.
  * If the client's browser didn't load Js files for some reason, your application will display as intended. 
  * easy to change library in the future since your own code will not be changed.

NOTE: don't use this library for element that will appear in the top view when page loads. Only use it for elements that will appear on scroll. This is because our library has to initiat position through JS before animating which will show if element is in view when loaded.

## Syntax
` animate(argument) `       
argument could be in two forms:  
  * form1: [selector, direction, options]  
  * form2: [form1, form1, form1] 

Basically, the second form is an array of the first (an array of arrays). The first one is useful when animating one element (or multiple elements with the same class name) and also when adding animation dynamically at different places in your code. Otherwise form2 is good to add multiple animations at once as shown in the example below.

## Example
```
const elementsToAnimate = [
    ['.class__name1', '<-'], 
    ['.class__name2', '^'],
    ['.class__name3', '<-']
];

scrollDomAnimation.animate(elementsToAnimate);
```

## options
In addition to the selector and direction properties shown in the examples above, each selector array takes a 3rd options object (optional) to customize the animation of the corresponding element.

```
                                                         options
                                                        |        |
                                                        v        v
scrollDomAnimation.animate(['.class__name1', '<-', { time: 1, offset: 80 }]);
```

**time** : sets transition time of the animation in seconds - default 0.3  
**offset** : animation distance in pixels - default 50   
**inViewDistance**: the amount of pixels the element has to be in view before animating.  
**elementIndex** : if more than one element share the same selector, this defines which elements to apply animation to.

## Directions 
NOTE: the opposit direction symbols below only work on selectors the return multiple elements.

| symbol  |  discription                     |
|---------|----------------------------------|
| ->      | to right                         |
| <-      | to left                          |
| -><- OR <-->  | consecutive elements in opposit direction |
| ^       | upward                           |
| v       | downward                         |
| ^v OR v^ | consecutive elements in opposit direction      |
| /^      | upward to right                  |
| v/      | downward to left                 |
| v//^    | consecutive elements in the opposit direction   |
| *       | fadein                           |
| .o      | scaleup                          |
| o.      | scaledown                        |
| .oo.  OR  o..o   | consecutive elements in opposit direction |

## Smooth scroll
```
const projectBtn = document.querySelector('.project__btn');

projectBtn.addEventListener('click', scrollDomAnimation.smoothScroll);
```
Following the same principle of applying animations without modifying original code, you only need to add this method as callback for the event listener.     
Of course your element (in this case projectBtn) has to have an href attribute pointing to the target elemet's id.

## Contribution

You are welcome to contribute to this package. To add more animations please checkout the /lib/animations.js module and feel free to suggest more animations.
