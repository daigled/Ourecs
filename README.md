# Grouptaste

## TODO
- Finish modularizing album, artist, and tag components
    - Artist component: currently takes two form submissions to remove a new known artist from the list of recommended artists

- Figure out how to leverage tags for recommendations
    1. Aggregate all tags, pull recs from most common tags
    2. Aggregate list of similar Artists based on all Albums present, pull recs from Artists that appear most frequently in the SimilarArtists list.

## Issues
- Artist object returned from last.fm does not appear to contain valid image urls
- Spotify API seems to be geared more towards getting users to log in with their spotify credentials then scraping their listening data. Artist data endpoints require an ID rather than an artist name