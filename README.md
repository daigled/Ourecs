# Grouptaste

## TODO
- Finish modularizing album, artist, and tag components
    - Artist component: currently takes two form submissions to remove a new known artist from the list of recommended artists

- Figure out how to leverage tags for recommendations
    1. Aggregate all tags, pull recs from most common tags
    2. Aggregate list of similar Artists based on all Albums present, pull recs from Artists that appear most frequently in the SimilarArtists list.