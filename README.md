# Proverbs for Code

I've adopted this principle of concretizing lessons I've learnt by
assocating them with proverbs. I have been recently using ChatGPT
to provide proverbs once I explain the lesson I'm trying to internalize.

It's been a little tedious having to retype the prompt each time
for ChatGPT so I can get a proverb back, so I've opted to build a
little React app instead that takes the lesson and gets a list of
proverbs from ChatGPT.

## Launching the app

From a terminal run the following:

```
yarn run start
```

## Todos
- [x] Load a specific number of suggestions
- [ ] Don't repeat proverbs
- [x] Load more suggestions 
- [ ] Disregard a suggestion and get another in it's place
- [ ] Clear all suggestions

## Updating the image

Once changes have been merged into main, there's a Github action
that deploys the image to Docker Hub. The image is tagged with the
latest commit hash and the latest tag.

## Use Cases

### Don't repeat suggestions

For this use case, we don't want to get any proverbs that we've gotten
before. We don't want ChatGPT's involvement in the solution to dominate
the technical design for this use case. If this were just an ordinary
server that had a database of suggestions, we could imagine a generic,
flexible feature where it allows us to request some random suggesions
but we tell it the ones we've gotten before. This would allow us to
use that for many other us cases. So, there's a big question about
responsibility. Who should be keeping track of the seen suggestions?
Should our client be responsible for that, or should the server provide
that functionality? It would be nice if the service took care of it though.
That would mean, from our business logic's point of view, we have a stateful
service that knows what we've gotten already and it never repeats suggestions.
This would require that the suggestion service have some notion of state on
it's backend. It would need to be able to reduce redundancy for the same
"session". It does feel like a fair expectation from our business logic. 
It's a critical business rule. **We don't ever want the same proverb for the
same lesson.** Later we may want to see a history or something, but generally
we want uniqueness per lesson.
