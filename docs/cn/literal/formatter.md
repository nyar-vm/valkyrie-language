# 格式化字符串

The String Formatter is a utility that allows you to customize the formatting of strings in Valkyrie programming language.

It provides various options to format strings based on different parameters.

## `{v}`

The `{v}` placeholder is used to insert the value of variable `v` into a string. It is equivalent to calling `v.display()`.

```valkyrie
"{v}" // v.display()
```

To explicitly initialize the string with the default formatter, it is recommended to add `f` before the string.

```valkyrie
f"{v}"   // v.display()
```

## `{v:formatter}`

The `{v:formatter}` syntax allows you to specify a custom formatter for the variable `v`. This enables you to format the value according to specific rules or patterns.

```valkyrie
"{v:?}" // v.display("?")
```

For example, you can format a `DateTime` object to display the date and time in a specific format.

```valkyrie
let time = DateTime("2020-02-29 20:02:29");
"{time:dd.MM.yyyy HH:mm:ss}"
// Output: 02.29.2020 20:02:29
```

Alternatively, you can use the `display` function of the `DateTime` object to achieve the same result.

```valkyrie
time.display("dd.MM.yyyy HH:mm:ss")
```

## `{v, ...arguments}`

The `{v, ...arguments}` syntax allows you to provide additional arguments to the formatter. This can be useful when you need to specify formatting options such as culture or locale.

```valkyrie
let time = DateTime("2020-02-29 20:02:29");
"{time, 'dd.MM.yyyy HH:mm:ss', culture: 'en-US'}"
// Output: 02/29/2020 20:02:29
```

In the above example, the `culture` argument is used to format the date and time according to the English (United States) locale.

You can achieve the same result by calling the `display` function of the `DateTime` object and providing the desired formatting options.

```valkyrie
time.display("%Y-%m-%d %H:%M:%S", culture: 'en-US')
```

## Formatter

The `Display` trait provides the underlying implementation for formatting.

It defines the following methods:

```valkyrie
trait ToString {
    format(self, mut formatter: Formatter, ...args): Result<(), DisplayError>;
    #hide(completion)
    format_hint(self): u64 { 0 }
    final display(self, ...args) {
        let mut f = Formatter(UTF8Text(capacity: self.format_hint()));
        self.format(f)
        f.buffer
    }
}
```

- The `format` method is responsible for formatting the value and writing it to the `formatter` object.
    - It takes the value itself (`self`) and additional formatting arguments (`args`).
    - It returns a `Result` indicating whether the formatting was successful or not.
- The `format_hint` method provides a hint about the expected capacity of the formatter.
  - This can be useful for optimizing memory allocation when formatting large strings.
- The `display` method is a convenience function that initializes a `Formatter` object, calls `format` on the value, and returns the formatted string as a buffer.

By implementing the `Display` trait and providing custom formatting logic, you can customize the display of objects in Valkyrie.

## Formatter Derive

The `Formatter Derive` feature in Valkyrie allows you to automatically generate the implementation of the `Display` trait for a custom class or structure. This eliminates the need to manually implement the `format` method for formatting the object's display.

To use the `Formatter Derive`, you need to annotate your class or structure with `#derive(Display)`. This tells the Valkyrie compiler to generate the necessary code for formatting the object.

Here's an example of using the `Formatter Derive` for a `Point` class:

```valkyrie
#derive(Display)
class Point {
    x: f64,
    y: f64,
}
```

With the `#derive(Display)` annotation, the Valkyrie compiler will automatically generate the implementation of the `Display` trait for the `Point` class. This implementation will include the `format` method, which formats the object's display based on the provided formatting options.

After applying the `Formatter Derive` to the `Point` class, you can use the `display` function or the `{}` placeholder to format and display `Point` objects.

```valkyrie
let p = new Point { x: 2.5, y: 3.7 };
f"{p}"  // Output: "Point { x: 2.5, y: 3.7 }"
```

The generated implementation of the `Display` trait will use the default formatting options for the class members. If you want to customize the formatting, you can override the `format` method in your class and provide your own logic.

By using the `Formatter Derive`, you can simplify the implementation of the `Display` trait for your custom classes and structures, making it easier to format and display objects in a desired way.
