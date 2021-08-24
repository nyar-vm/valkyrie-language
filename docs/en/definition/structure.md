## Class

The `class` keyword is used to define a class in Valkyrie.

It allows you to encapsulate data and methods into a single entity.

Here's an example of a class definition:

```valkyrie
class A {
    field: Type = default_value;
    method(): Return {
        method_body
    }
}
```

In the above code snippet, we define a class named `A`.

It has a single field named `field` of type `Type` with a default value.

The `field` can be accessed and modified by the methods defined within the class.

## Private Fields

In Valkyrie, private fields in a class can be denoted by using an underscore (`_`) prefix. These fields are intended to be accessed and modified only within the class itself. Here's an example:

```valkyrie
class A {
    _field: Type = default_value;
}
```

In the above code snippet, we define a class `A` with a private field `_field` of type `Type` and a default value. The underscore prefix convention is commonly used to indicate that the field is private and should not be accessed directly from outside the class.

## Property

Properties in Valkyrie allow you to define custom getter and setter methods for accessing and modifying class fields. Here's an example:

```valkyrie
class A {
    _field: Type = default_value;
    get field(self): Type {
        self._field
    }
    set field(self, value: Type) {
        self._field = value
    }
}
```

In the above code snippet, we define a class `A` with a private field `_field`. We also define a property `field` with a custom getter and setter. The getter method (`get field()`) returns the value of `_field`, and the setter method (`set field(value)`) sets the value of `_field` to the provided value. By using properties, we can encapsulate the access and modification of the field and add any additional logic if needed.

## Property Derive

In Valkyrie, properties can be derived automatically using attributes. The `#[get, set]` attribute is used to generate the default getter and setter methods for a field. Here's an example:

```valkyrie
class A {
    #[get, set]
    _field: Type = default_value;
}
```

In the above code snippet, we define a class `A` with a private field `_field_name`.

By applying the `#[get, set]` attribute to `_field_name`, Valkyrie automatically generates the default getter and setter methods for the field.

This provides a convenient way to define properties without explicitly writing the getter and setter methods.

### Static Method

If the first argument of a method in a class is not `self`, then it is considered a static method. Static methods can be called directly on the class itself using the `::` syntax. Here's an example:

```valkyrie
extends A {
    // static method
    method1(): String {
        "call method1"
    }
}
```

In the above code snippet, we extend the class `A` and define a static method named `method1()`. This method can be called as `A::method1()`.

## Instance Method

In Valkyrie, instance methods are associated with specific instances of a class and can be called on those instances. Here are two examples of instance methods:

```valkyrie
extends A {
    /// instance method
    method2(self): String {
        self.field.to_string()
    }
}
```

In the above code snippet, we extend the class `A` and define an instance method named `method2()`.

This method takes `self` as the first argument, which represents the instance on which the method is called.

Within the method, we access the `field` of the instance using `self.field` and convert it to a string using the `to_string()` method.

The method returns the string representation of the `field`.

```valkyrie
extends A {
    /// instance method
    method3(mut self, value): String {
        self.set_value(value)
    }
}
```

In the above code snippet, we extend the class `A` and define another instance method named `method3()`.

These instance methods can be called on instances of the class `A` by using the dot notation.

For example, if we have an instance named `a` of class `A`, we can call `a.method2()` and `a.method3(value)` or `A::method3(a, value)` to execute the respective methods.

## Structure

The `structure` keyword is used to define a structure (similar to a struct) in Valkyrie. Structures allow you to group related data together. Here's an example of a structure definition:

```valkyrie
structure B {
    field: Type = default_value;
}
```

In the above code snippet, we define a structure named `B`. It has a single field named `field` of type `Type` with a default value. The fields of a structure can be accessed and modified directly.

### Parameter Passing Comparison

When passing parameters to functions or methods, there are different ways to handle the ownership and mutability of the value being passed. The table below compares the parameter passing behavior between classes (`class A`) and structures (`structure B`):


| Parameter   | `class A`     | `structure B`    |
|-------------|---------------|------------------|
| `x: X`      | pass `&x`     | pass `x.clone()` |
| `ref x: X`  | pass `&x`     | pass `&x`        |
| `mut x: X`  | pass `&mut x` | pass `move x`    |
| `move x: X` | pass `move x` | pass `move x`    |

In the case of `class A`, when passing a parameter `x` of type `X` without any additional keywords, the ownership of `x` is not transferred.

Instead, a reference to `x` (`&X`) is passed. If the parameter is declared as `ref x: X`, a reference to `x` (`&X`) is passed explicitly.

Lastly, for `mut x: X`, a mutable reference to `x` (`&mut X`) is passed, allowing the function or method to modify `x`.

For `structure B`, the behavior is slightly different.

When passing a parameter `x` of type `X` without any additional keywords, a clone of `x` (`x.clone()`) is passed, transferring the ownership.

If the parameter is declared as `ref x: X`, a reference to `x` (`&x`) is passed, without transferring ownership.

Lastly, for `mut x: X`, the ownership of `x` is moved to the function or method using the `move` keyword.

These differences in parameter passing can be useful in different scenarios depending on the desired ownership and mutability semantics.

## Implementation Details

The structure will be compiled into a `Record`, and all fields are regarded as row type `field: (self) -> T`.

```valkyrie
type A = [
    field: (self) -> Type,
    delay: (self) -> Lazy<Type>,
    method1: () -> String,
    method2: (self) -> String,
]
```

This means that the two calls `a.b` and `a.b()` are indistinguishable.

For convenience, leave out the parentheses if `b` is like a noun, and add parentheses if `b` is like a verb.
