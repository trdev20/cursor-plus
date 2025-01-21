# Add smart search to create selections in a very complex way

A command that only works on the active selection, ignoring all other selections, since its purpose is to create new selections from scratch.

It's going to be an input box with a very specific syntax.

- (|) Group separator: to separate each search group, since each group will be a selection. Each group will continue searching from the last search and not from the active selection.

- A group can be empty to duplicate the previous group (including everything like direction and steps).

- (< or >) Direction: can be used to change the search direction (left or right | relative to the active selection). Must be the first character in the group. It should change the direction of the search for all next groups until the next direction change.

- (\_) Start over: can be used to start the search over from the beginning. Must be the first character or the second one if there is a direction character.

- (< or >) Position: can be used to pick where to put the new selection (left or right). Must be the last character in the group.

- (+) Steps: to pick the (next or previous) match (based on the direction). Must be the last character or before last if there is a position character. Can be used more than once.

- (&) Reference: typing this character is equivalent to the previous search group (excluding direction and position and steps) (just the text).

- (\*) Reference: same as above but with: (excluding direction and position). You can't add text to it, only modifiers like steps, position or direction.

Example 01:

```
This is is | a dummy text just to give you an example.
I need more text and I can't think of anything else.
So I'm just going to tell you that I don't know what to write.
Have a nice day mr. reader.
```

(|) is the active selection position.

input box value:

```
text<|&|<is++|>_.+|*+
```

And it will select (| is an empty selection and () is a non-empty selection):

```
Th(is) is is  a dummy |text just to give you an example.
I need more (text) and I can't think of anything else(.)
So I'm just going to tell you that I don't know what to write.
Have a nice day mr. reader(.)
```

Example 02: (where you need to use an empty group)

```html
<div>
  |
  <div>
    <p>Card 01 Title</p>
    <p>Card 01 Description</p>
  </div>
  <div>
    <p>Card 02 Title</p>
    <p>Card 02 Description</p>
  </div>
  <div>
    <p>Card 03 Title</p>
    <p>Card 03 Description</p>
  </div>
  <div>
    <p>Card 04 Title</p>
    <p>Card 04 Description</p>
  </div>
</div>
```

input box value:

```
\<p\>|&+||

```

And it will select:

```html
<div>
  <div>
    (
    <p>)Card 01 Title</p>
    <p>Card 01 Description</p>
  </div>
  <div>
    (
    <p>)Card 02 Title</p>
    <p>Card 02 Description</p>
  </div>
  <div>
    (
    <p>)Card 03 Title</p>
    <p>Card 03 Description</p>
  </div>
  <div>
    (
    <p>)Card 04 Title</p>
    <p>Card 04 Description</p>
  </div>
</div>
```

Hi tomorrow me, maybe enable regex search by default (and only option) in the smart search.
