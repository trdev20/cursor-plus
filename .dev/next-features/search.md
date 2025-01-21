# Add search commands to (move, select, delete, insert) commands

## Example (move)

- `cursorPlus.move.nextOccurrence`
- `cursorPlus.move.previousOccurrence`

You can also enable regex search in this scenario:

1. Input value matches this regex pattern (it can be escaped):

```js
/^\.r$/i;
```

2. Then the regex search will be enabled. If the user did it again, it will be disabled.

3. Make sure the input value will be reset to an empty string so the user can type the string to search for.

4. Search for the string and move the cursor to the next/previous (depending on the direction) occurrence of the string.
