# scroll-dom-animation
utalizing a declarative approach, this library makes animating dom elements on the scroll event super easy.

### sample

```
                                  selector    animation direction
                                      |           |
                                      v           v
                                  
  scrollDomAnimation.animate([ '.class__name',   '->'])
```
### install
```
npm install scroll-dom-animation  
```

## content:
### [-live demo](#live-demo)
#### [-introduction](#introduction)
#### [-syntax](#syntax)
#### [-directions](#directions)
#### [-options](#options)
#### [-smoothscroll](#smooth-scroll)



## Introduction
While working on a project, I came up with this package to help me simplify and visualize my JS scroll animations in one spot without having to mess with css files and this is exactly what this library does (see [the code used for the demo](#live-demo) below). 

when you style your elements you would place them in their intended final position (after animation) and our library takes care of animation. 

There are three benefits to this approach: 
  * you can use this library on an existing project or on top of other libraries (e.g. bootstrap) without touching any css.
  * If the client's browser didn't load Js files for some reason, your application will display as intended. 
  * easy to change library in the future since your own code will not be changed.

> NOTE: don't use this library for element that will appear in the top view when page loads. Only use it for elements that will appear on scroll. This is because our library has to initiat position through JS before animating which will show if element is in view when loaded.

## Syntax
#### 1. animating elements with one selector (classname, id, etc...):
```

animate([selector, direction, options])

```       

selector could be any css selector. Direction could be any symbol from the [direction table](#directions) below. [Options](#options) is an object that is used to adjust animation.

#### 2. animating multiple elements with different selectors:
```

animate(Array[elementToAnimate]) 

```  
To animate multiple selectors you can wrap them in an array and provide this array as an argument. Check the example below:

#### Example
```
const elementsToAnimate = [
    ['.class__name1', '<-'], 
    ['.class__name2', '^'],
    ['.class__name3', '<-' {time: 0.5}]
];

scrollDomAnimation.animate(elementsToAnimate);
```

## Directions 
NOTE: the opposit direction symbols below only work on selectors that return multiple elements. In other word, multiple elements that share the same class/id name will be animated in opposit direction consecutively.

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
**scaleFactor** : only works on scale animations such as '.o'. default - 'o.': 0.1 | '.o': 0.5  
**inViewDistance**: the amount of pixels the element has to be in view before animating.  
**elementIndex** : if more than one element share the same selector, this defines which elements to apply animation to.

## live demo

### [VIEW DEMO](https://tito300.github.io/portfolio/)
All animations in the demo are done through this library using this exact code:

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

## Smooth scroll
```
const projectBtn = document.querySelector('.project__btn');

projectBtn.addEventListener('click', scrollDomAnimation.smoothScroll);
```
This library provides you a method that you can use as a callback on the btn or link that contains the href of the target as shown in the code above. 

Under the hood it uses scrollIntoView which is not supported by all browsers so make sure it works for you before using.

## Contribution

You are welcome to contribute to this package. To add more animations please checkout the /lib/animations.js module and feel free to suggest more animations.
