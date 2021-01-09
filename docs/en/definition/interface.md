## Interface

An interface describes a set of methods that a structure needs to implement.

Interface is roughly equivalent to virtual class, but the difference is that it does not participate in mro sorting, and
its call always points to the end of mro.

```vk
virtual class A {
    who(self) { print("A") }
}
interface IA {
    who(self) { print("A") }
}
class B(A) {
    who(self) { print("B") }
}
class IB { }
extends IB: IA {
    who(self) { print("B") }
}

let b1 = new B();  // MRO = [B, A]
let b2 = new IB(); // MRO = [IB]

A::who(b1); // A
B::who(b1); // B
IA::who(b2); // B
IB::who(b2); // B
```

Valkyrie language does not recommend the use of virtual base classes, in fact most of these requirements can be met by
interface and trait.

The second difference is that there is no inheritance of interfaces, there is no interface `A` inheriting
interface `B`(`A(B)`), only interface `A` satisfies interface `B`(`A:B`)

```vk
interface DividedBy4: DividedBy2 {
    divided_by_4(self) -> bool;
}
interface DividedBy2 {
    divided_by_2(self) -> bool;
}

extends int: DividedBy4 {
    divided_by_4(self) -> bool { self % 4 == 0; }
    divided_by_2(self) -> bool { self % 2 == 0;}
}

6.divided_by_2(); // true
6.divided_by_4(); // false
DividedBy2::divided_by_2(6); // true
DividedBy4::divided_by_4(6); // false
DividedBy4::divided_by_2(6); // ERROR: `DividedBy4::divided_by_2` does not exist.
```

This makes interface more like type class.

## Trait

Certain interfaces require all fields to participate, and obviously for each subtype, the interface must be overridden.

Such an interface needs to be declared using the trait.

For example, [Show::show]() needs to be re-implemented by each subclass, and it must not inherit the display method of
the parent class by default.

And the base class also has this method, and it is not a virtual method, so it cannot force the subclass to rewrite it.

That's why we need the trait.

The declaration syntax of trait and interface is the same

```vk
trait Show {
    show(self, f: Formatter) -> Unit;
}
```

A trait can be associated with a derive macro.
