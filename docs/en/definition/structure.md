

## Structure

```valkyrie
structure A {
    field: Type = default_value;
    lazy delay: Type = {
        lazy_progress
    }
}
```


```valkyrie


```


## Class

A class is a structure that automatically implements many interfaces and traits, otherwise there is no difference.

Temporarily gain the following features:


- [Clone](): How to get an independent copy object
- [Copy](): Support for zero-heap allocation cloning
- [ShowDebug](): How to display the fields that the structure actually has, without properties
- [ShowDetail](): How to display the fields that the structure actually has, with properties and getters.
- [Equality](): Determine whether two objects are interchangeable
- [Congruence](): If it is a value type, it means that the values are equal, and if it is a reference type, it means that the pointers are the same
