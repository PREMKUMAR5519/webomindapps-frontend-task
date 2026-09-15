# Notes

> Fill this in as you work. This document is assessed alongside your code.

## Bugs I found

For each: what was wrong, **why** it was wrong, and how I fixed it.

1. Repeated API request: the fetch depended on 'products', which it also updated, creating a request loop.I changed the
   dependency array to '[]' so it runs on mount.
2. Product state and fetched data using any : this bypassing typescript checks.  I replaced them with 'Product[]'
   and added the rating fields to the product interface.
3. Search ignored when filtering by category : An early return
   checked only the category. I separated the search and category
   conditions and combined them with '&&'
4. Case-sensitive search : Title matching treated uppercase and
   lowercase differently. I lowercased both strings and trimmed
   surrounding spaces from the search text.
5. Unstable product keys : Array indexes changed when filtering,
   causing React to reuse item identities incorrectly. I replaced
   index keys with product IDs.
6. Timestamp hydration mismatch error: Generating the time during
   rendering could produce different server and browser output.
   I set it through 'useEffect' and stode the time using useState and used in inline code.
7. Empty results shown during loading: The grid rendered while
   products were still an empty array awaiting the response.
   I now show it only when loading finishes without an error.

## Features I completed
1. Error state : Added an error panel displaying the hook's error
  message, with 'role="alert"' and a suggestion to refresh the page.
  The grid stays hidden when loading fails.

2. Modal animation : Added a fading backdrop and a short movement
  and scale transition using Framer Motion. I kept 'AnimatePresence'
  mounted around the conditional content so closing animations can
  finish before removal.

## Decisions

Anywhere I had to choose between options — and why I chose what I did.
- Kept the starter structure because the fixes did not require a
  rebuild or additional application libraries.

- Used separate filter conditions to make the combined logic easier
  to read and explain.

- Used the existing Framer Motion dependency for animations.

- Used 'Product[]' for compile-time checking. This trusts the API
  shape; runtime validation remains a possible improvement.


## With more time

What I'd improve or add next.

- Add a retry button instead of requiring a page refresh.
- Validate API responses at runtime.
- Add a loading spinner alongside the loading message to make
  the fetching state clearer.
- Improve the UI with more consistent spacing, stronger text
  contrast, and clearer hover and keyboard-focus states.