# 模板字符串

当一个字符前面加 `t` 或者被三个 `"` 包围时, 会被解析为模板字符串

## 模板注释

确切地说, 模板没有注释, 但是模板表达式中可以放置注释

```valkyrie
"""
<%/* This is comment */%>
"""
```

## Template Expression

```valkyrie
"""
<% x %>
<% None %>
<% "string" %>
"""
```

## Template If

```valkyrie
"""
<% if a > 0 %>
    yes
<% else %>
    no
<% end if %>
"""
```


### Template While

```valkyrie
"""
<% while a > 0 %>
    <% if a > 1 %>
        yes
        <% a -= 1 %>
    <% else %}
        no
    <% end if %>
<% end while %>
"""
```
