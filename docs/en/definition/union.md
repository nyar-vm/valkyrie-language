在 VK 中, 有如下四种声明和类型的方式

| Keywords      | Layout           | Detail                                                      |
|---------------|------------------|-------------------------------------------------------------|
| [enumerate]() | `[u8; N]`        | A number, used to represent different states                |
| [flags]()     | `[u8; N]`        | A number used to represent different binary opposite states |
| [union]()     | `[u8; X]`        | Some bytes, used to represent different states              |
| [unite]()     | `[u8; N][u8; X]` | Some bytes, used to represent different states              |

- X is the largest size of all variant types
- N is the given size of the representation
