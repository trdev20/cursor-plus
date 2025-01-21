## Preprocessing

You may have noticed the use of `z.preprocess` everywhere in the schema. The reason for this is to ignore invalid values ensuring that the parse will always succeed.

Example: If I have the following schema:

```ts
const strOrNumArrSchema = z.array(z.union([z.string(), z.number()]));
```

And I pass 99 valid items and only 1 invalid item, parsing will throw an error. And the whole 99 valid items will be ignored.

This is why I use `z.preprocess` to ignore invalid values. At least for now, I believe that ignoring invalid values is better than throwing an error.
