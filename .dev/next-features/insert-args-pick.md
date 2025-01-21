# Add a `pick` argument to the insert command

Make the insert command able to receive a `pick` argument that allows the user to pick from a list of strings that he often uses.

Example:

```json
{
  "command": "cursorPlus.insert.lineEnd",
  "args": {
    "pick": [",", ";"]
  }
}
```

The user should be able to pick from the vsc.QuickPick by typing an alias.

Advanced Example:

```json
{
  "command": "cursorPlus.insert.lineEnd",
  "args": {
    "pick": [
      ",", // text=, && alias=,
      ";", // same as above
      { "text": "foo", "alias": "f" }, // text=foo && alias=f
      { "text": "bar", "useTextAsAlias": false } // text=bar && no alias
    ],
    "defaultUseTextAsAlias": true // by default, use the text as the alias
  }
}
```
