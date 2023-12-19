# Switchshop Pokémon full-stack challenge


### My (WS) notes

**Step 1**

Unless I'm missing something very obvious - the second point in step one isn't particularly clear nor viably workable.

I can get the limited `limit=` list from the endpoint `https://pokeapi.co/api/v2/pokemon?limit=151` but that only returns a name and url - I can assume an ID purely from the index (but this is very bad practice) - or make the (correct) assumption that the ID is the last part of the "url" (ending /151/)  returned. _Assumptions are also bad practice but I'm sure this is documented somewhere on the API docs._

Further calls would be necessary based on the extracted id (which I've implemented - yet no caching/cancelling/aborting/batching as yet):

`https://pokeapi.co/api/v2/pokemon/{id}`

Responses from RESTful calls cannot be amended - only the data returned can be filtered/reduced. This is a perfect example of over-fetching. I mention this only as the instructions state **"Modify your endpoint to remove all other fields on each Pokémon and serve the reduced data to your application"** - you can reduce the response but the response (just as the song [https://youtube.com/watch?v=MTRgvPrUuU8]) remains the same :/

I do plan to implement a GraphQL example within the further steps (#3 - Prisma>SQLite) so as to overcome these issues - on the TODO list.

Styling here (Step 1) is basic to say the least (no responsive elements) - some inline styling and basic CSS - another TODO.


**Step 2**

Simple enough - I've not had to add any responsive css page size breaks given the flex spacing/wraps of the images. Added a little animation to spice it up a wee bit.

**Step 3**

I'd tried to populate/seed the newly created SQLite db but failed - a combination of local permissions not playing ball - sudo'ing commands do not overcome the issue.

I'll come back to this but I'm wary of time so I'll move on to Step 4 (I'll use the simpler Step 3 branch to add some sorting) and come back to this.


**nota bene**

The following npm audit errors (_low_) appear from the initial clone - just so as you're aware...

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
