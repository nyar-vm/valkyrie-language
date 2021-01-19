

## Sized Number

The default integer type is `Integer`, short alias is `int`.

It is a reference type, which represents an arbitrary precision integer.

If you want some fixed size number, you can write 255u8

Here are some other primitive numeric type

| postfix | description              |                                        example |
|--------:|--------------------------|-----------------------------------------------:|
|    `u8` | unsigned 8 bit integer   |                                        `255u8` |
|    `i8` | signed 8 bit integer     |                                       `-127i8` |
|   `u16` | unsigned 16 bit integer  |                                     `65535u16` |
|   `i16` | signed 16 bit integer    |                                    `-32767i16` |
|   `b16` | truncated 32-bit float   |                                       `0.5f16` |
|   `u32` | unsigned 32 bit integer  |                                `4294967295u32` |
|   `i32` | signed 32 bit integer    |                               `-2147483647i32` |
|   `f32` | single precision float   |                                       `0.5f32` |
|   `u64` | unsigned 64 bit integer  |                      `18446744073709551615u64` |
|   `i64` | signed 64 bit integer    |                      `-9223372036854775807i64` |
|   `f64` | double precision float   |                                       `0.5f64` |
|  `u128` | unsigned 128 bit integer |  `340282366920938463463374607431768211455u128` |
|  `i128` | signed 128 bit integer   | `-170141183460469231731687303715884105727i128` |
|  `d128` | 128 bit decimal          |                                      `0.5d128` |

## Unit number

In addition, you can customize other postfix number types

```vk
1m + 2cm
1kg * 9.8`m/s^2`
```


