# Switchshop Pokémon full-stack challenge


## My notes
Step 1
Unless I'm missing something very obvious - the second point in step one isn't particularly clear nor viably workable.

I can get the limited (limit=) list from the endpoint https://pokeapi.co/api/v2/pokemon?limit=151 but that only returns a name and url - I can assume an ID purely from the index (but this is very bad practice) - or make the (correct) assumption that the ID is the last part of the "url" (e.g. /151/)  returned.

Further calls would be necessary based on the extracted id (which I've implemented). Further calls for stats and types would need:

https://pokeapi.co/api/v2/pokemon/1

I've implemented a further call based on the ID of a name/extracted ID.

Responses from RESTful calls cannot be amended - only the data returned can be filtered/reduced. A perfect example of over-fetching.

I've been through the pokeapi documentation and cannot find a means to extract only the id, name, stats and type from any given id so I've used the above API call and then destructuted the data - displaying it when the name is clicked.

I do plan to implement GraphQL example within the further steps (#3 - Prisma>SQLite) so as to overcome this issue over-fetching.

Styling here (Step 1) is basic to say the least (no responsive elements) - some inline styling and basic CSS - more to come.






The following npm audit errors (low) appear from the initial clone - just so as you're aware...

next  0.9.9 - 13.5.4-canary.11
Severity: moderate
Next.js missing cache-control header may lead to CDN caching empty reply - https://github.com/advisories/GHSA-c59h-r6p8-q9wc
Depends on vulnerable versions of postcss
Depends on vulnerable versions of zod
fix available via `npm audit fix --force`
Will install next@13.5.6, which is outside the stated dependency range
node_modules/next

postcss  <8.4.31
Severity: moderate
PostCSS line return parsing error - https://github.com/advisories/GHSA-7fh5-64p2-3v2j
fix available via `npm audit fix --force`
Will install next@13.5.6, which is outside the stated dependency range
node_modules/postcss

zod  
Zod denial of service vulnerability - https://github.com/advisories/GHSA-m95q-7qp3-xv42
fix available via `npm audit fix --force`
Will install next@13.5.6, which is outside the stated dependency range
node_modules/zod