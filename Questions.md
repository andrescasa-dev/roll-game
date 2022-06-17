# How i can define read only properties?
in the roll game i have a private property "_isDead"  that i want that to be a "Read only" property. I see two way:

## Don't define its setter
if we want to be able to modify a property, but that the dev use can't do that.  This could a solution.

## Use Object.defineProperty in the constructor
with this approach we won't be able to use the property even in the same class.
This is useful when we want to declare a constant-like property.
```js
Object.defineProperty(this, "_isDead", {writable: false, configurable: false}); in the constructor
```
