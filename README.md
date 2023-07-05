
# Polis Embed Examples

This repository contains a number of examples illustrating how to embed a Polis conversation in another website.

## Important note on identity!

It's **important** to note that if you try embedding Polis on your webpage without using the `XID` system, when participants close the web page and return at a later date, they will have to start over, and you'll end up with a duplicate participation record.

This is because of default browser privacy settings regarding third party cookies.
The consequence is that your site is responsible for tracking identity between sessions (via cookies, local storage, or even with a custom auth solution, depending on your scenario).

## Polis' `XID` System

In short, by assigning a `data-xid=` parameter to the HTML (or DOM) element on which you're running the Polis embed, the given `XID` will be associated with the participant record.
Participants returning to an embed will be able to pick up where they left off if the embed container has the same `XID` as a previous browser session.

It's important to note that `XID` values are unique per conversation owner.
Thus if a given `XID` value is used for two conversations started by the same user, the corresponding participation records will be associated with the same user in the database.
Proper use of the `XID` system must keep this in mind, and as a result random UUIDs are a good solution, since (if used/generated carefully) these are nearly impossible to collide.

### Associating metadata

Because participant `XID` values can be associated with participation records in exports, Polis opinion data can potentially be merged with demographic opinion data, if that data has been keyed by the same set of `XID` values.


## Examples

With all of the above in mind, these examples illustrate a set of common configurations illustrating different ways of using the`XID` system.

* `basic-embed`: The most basic embedding. Stores an `XID` on the embedding page's `localStorage` for anonymous
* `url-token-embed`: Uses url query parameters specifying the `XID` to maintain identity (e.g. for mailing out single use invite urls)
* `basic-typeform-embed`: An example of how you can use Typeform to collect demographic metadata as part of a participation experience

Please feel free to submit PRs for new examples which show a more nuanced/customized setup.
 
## Embed callbacks

There are occasions where it may be useful to have the embedding webpage/app dynamically react to events that occur in the Polis embed iframe.
This is possible by adding an event listener to the window as follows:

```html
<div class="container">
  <div class="polis" data-conversation_id="43hmhaj9vm"></div>
  <div class="data">
    <h2>postMessages from iframe</h2>
    <p>Try resizing window, voting, and submitting new comments.</p>
    <ul id="post-messages"></ul>
  </div>
</div>

<script async src="https://pol.is/embed.js"></script>
<script type="text/javascript">
  window.addEventListener('message', function (event) {
    var data = event.data || {};
    if (!event.origin.match(/pol.is$/)) {
      return;
    }
    var listEl = document.getElementById('post-messages');
    var listItemEl = document.createElement('li')
    listItemEl.innerHTML = JSON.stringify(data, null, 2);
    listEl.appendChild(listItemEl);
  })
</script>
```
