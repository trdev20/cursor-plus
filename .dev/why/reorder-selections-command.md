This command purpose is only to reorder the selections in the editor.

Example Usage:

Let's say we have a command that inserts from 1 to x (where x is the number of selections)

and we have the following selections: (|) is a selection:

```json
{
  "prop|": "value",
  "prop|": "value",
  "prop|": "value"
}
```

If the selections are not sorted, the command result will be something like this:

```json
{
  "prop3": "value",
  "prop1": "value",
  "prop2": "value"
}
```

If selections are sorted before running the command, the result will always be:

```json
{
  "prop1": "value",
  "prop2": "value",
  "prop3": "value"
}
```

So our command can be used like this:

```json
{
  "key": "...",
  "command": "runCommands",
  "args": {
    "commands": ["cursorPlus.reorder.selections", "some-extension.insert-1-to-x"]
  }
}
```
