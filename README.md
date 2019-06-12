# scroll-dom-animation
utalizing a declarative approach, this library makes animating dom elements on the scroll event super easy.

## sample

```
                                  class name     animation direction
                                        |               |
                                        v               v
                                  
  scrollDomAnimation.animate([ '.element__Selector',   '->',  options])
```
## How it works
This library allows you to animate your existing dom elements without having to change any of the original css code. Meaning when you style your elements you would place them in their intended final position (after animation) and our library takes care of animation. 

There are three benefits to this approach: 
  * you can use this library on an existing project without touching any css.
  * If the client's browser didn't load Js files for some reason, your application will display as intended. 
  * If you decided to change animation libraries in the future, you can do that easily since your css in the same.


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
                                                             |
                                                             v
scrollDomAnimation.animate(['.class__name1', '<-', { time: 1, offset: 80 }]);
```

**time** : sets transition time of the animation in seconds - default 0.3  
**offset** : animation distance in pixels - default 50   
**elementIndex** : if more than one element share the same selector, this defines which elements to apply animation to. 

## Directions 
| symbol  |  discription                     |
|---------|----------------------------------|
| ->      | to right                         |
| <-      | to left                          |
| -><-    | either left or right (random)    |
| ^       | upward                           |
| v       | downward                         |
| /^      | upward to right                  |
| v/      | downward to left                 |
| *       | fadein                           |
| .o      | scaleup                          |
| o.      | scaledown                        |
| .oo.    | scale either up or down (random) |

## Smooth scroll
to be documented

## package state
this package is still under construction and should be finished in a few days.