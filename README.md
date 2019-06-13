# scroll-dom-animation
utalizing a declarative approach, this library makes animating dom elements on the scroll event super easy.

## sample

```
                                  class name     animation direction
                                        |               |
                                        v               v
                                  
  scrollDomAnimation.animate([ '.element__Selector',   '->',  options])
```
## content:
### [-live demo](#live-demo)
#### [-how it works](#how-it-works)
#### [-syntax](#syntax)
#### [-directions](#directions)
#### [-options](#options)
#### [-smoothscroll](#smooth-scroll)



## How it works
This library allows you to animate your existing dom elements without having to change any of the original css code which works very well with css libraries such as bootstrap. This also means when you style your elements you would place them in their intended final position (after animation) and our library takes care of animation. 

There are three benefits to this approach: 
  * you can use this library on an existing project or on top of other libraries without touching any css.
  * If the client's browser didn't load Js files for some reason, your application will display as intended. 
  * easy to change library in the future since your own code will not be changed.

> NOTE: don't use this library for element that will appear in the top view when page loads. Only use it for elements that will appear on scroll. This is because our library has to initiat position through JS before animating which will show if element is in view when loaded.

## Syntax
#### 1. One element or multiple elements with the same class:
```

animate(elementToAnimate[])

```       
where elementToAnimate is an array that looks like this:  
`  [selector, direction, options]   `    
selector could be any css selector. Direction could be any symbol from the [direction table](#directions) below. [Options](#options) is an object that is used to adjust animation.

#### 2. Multiple elements with different classes:
```

animate(Array[elementToAnimate]) 

```  
To animate multiple selectors you can provide multiple selectors in an array. Check the example below:

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
NOTE: the opposit direction symbols below only work on selectors that return multiple elements. In other word, elemets that share the same class/id name.

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
Following the same principle of applying animations without modifying original code (whether CSS or HTML), this library provides you a method that you can use as a callback on the btn or link that contains the href of the target as shown in the code above. 

Under the hood it uses scrollIntoView which is not supported by all browsers so make sure it works for you before using.

## Contribution

You are welcome to contribute to this package. To add more animations please checkout the /lib/animations.js module and feel free to suggest more animations.
