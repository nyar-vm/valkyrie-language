The Valkyrie language has the following keywords as definitions

- [type](./typing.md): Define a new type alias
- [let](./let-binding.md): Define a local variable
- [micro](./def-micro.md): Define a process of precomputing parameters
- [macro](./def-macro.md): Define a process of lazy computing parameters
- [interface](./interface.md): The conditions that the structure needs to obey
- [trait](./interface.md#trait): Interface which the subtype needs to reimplement
- [structure](./structure.md): The original structure of the stored data
- [class](./structure.md#class): Structure with automatic derive traits
- [enumerate](./enumerate.md): A number used to label different behaviors
- [flags](./flags.md): A number used to label different dualistic behaviors
- [union](./union.md): A piece of data that can be interpreted in multiple ways
- [unite](./disjoint-union.md): Disjoint union of types

It looks like a lot, but in fact it can be simply divided into two types: value declaration and type declaration.

## Term System



## Type System

The type system used by the Valkyrie language is the Extensible Row Type System

All types will be compiled to things like: `[field: P -> Q -> R, ..]`.

Because most records are open, we omit `..`.

If you want to express a closed record, you can write `[ field1: T, !! ]`

The difference between the row type and the general structure type is that no additional meta information will be lost

## Declarations

Every define keyword in the Valkyrie language is syntactic sugar for `TypeRecord`.

These declarative keywords are mainly for some engineering constraints.

- [structure + extends](./structure.md): Separate `Record`'s data and implementation.
- [class](./structure.md#class): Automatically implement some interfaces and traits.
- [interfaces](./interface.md): Virtual base class that does not participate in mro ordering.
- [trait](./interface.md#trait): The interface that every subclass is forced to reimplement.
- [enumerate](./enumerate.md): A number which various methods are appended.
- [flags](./flags.md): A number used to label different dualistic behaviors.
- [unite](./disjoint-union.md): Disjoint union of types, closed subtype.

In fact, these keywords can be absent.

You can create anonymous Object directly using `type`.

```valkyrie
type A = [
    call: (Int, ) -> String
]
let a = new A [
    call: { $x.to_string() }
]
A::call(10) # "10"
```

The subtype will only determine whether all the fields in `B` exist in `A`.

It does not care where the `B` type comes from, whether B is an original type, an inherited subtype, or the result of a type expression

## Shadow Row Type

Another feature is that Record in the valkyrie language supports repeated row.

```valkyrie
type A = [
    field: Integer,
    field: String,
]

A::field # Integer
```

Querying the field directly will return the first matching row type.

In fact Valkyrie will track the source of each row.

```valkyrie
type A = [
    field: Integer,
]
type B = [
    field: String,
]
type C = A & B {
    A::field: Integer,
    B::field: String,
}

C::field # Integer
<C as A>::field # Integer
<C as B>::field # String
```

This ability is very useful,
because the effect system will throw out many effects with the same type signatures,
and we need to accurately identify which layer call each Effect is passed from.


## Type Inference (unimplemented)

Reference: [Gradual Typing for Extensibility by Rows](https://arxiv.org/pdf/1910.08480.pdf)
