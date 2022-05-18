# Example site embedding polis

You can see this site live at: https://polis-embed-example.surge.sh/

## How it works

This example uses localStorage to track user identity on the _embedding page_.
It does this using a `localStorage.polisUserXID` attribute, which persists between browser sessions (from the same browser/device combo).
If this attribute does not exist, a random UUID is created, and persisted as `localStorage.polisUserXID`.

In either case, once a `polisUserXID` has been established, a div node is created with the corresponding `data-xid` attribute, and the polis embed `<script>` node is added to the DOM.
This script uses the `data-xid` attribute to ensure that all participation activity associated with a given XID value is associated with a specific user & participation record in the database.

## Other ways this could work?

This is a super simple example that demonstrates how the `data-xid` parameter works, and doesn't require any other infrastructure.
If you have your own login system or another way of asserting identity, you can use whatever XID mechanism you like.

Just be aware that XID's are __not__ unique to a specific conversation, but __are__ unique to a particular conversation owner.
Therefore, if you use XID `foobar` in two different conversations, the corresponding participation records will be associated with the same user in the database.


## LICENSE

Released under the AGPL; Copyright The Computational Democracy Project, 2021.

