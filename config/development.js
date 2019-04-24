const config = {
    authToken: 'MUQweXBmQmVBZnR4MWlaZ1FnNllRZ1pPTjp3UjdhWmpBZ1lZYmxzd0xiclpVQm90ZmhvSWRGb3poMldXbnV3bDh3SXZaUDhKbEpCZw==',
    twitter_tokenUrl: 'https://api.twitter.com/oauth2/token',
    twitter_getTweetsUrl: 'https://api.twitter.com/1.1/search/tweets.json?',
    twitter_getTweetByIdUrl: 'https://api.twitter.com/1.1/statuses/show.json?id=',
    twitter_getUserByIdUrl: 'https://api.twitter.com/1.1/users/show.json?user_id=',
    twitter_postFavoriteUrl: 'https://api.twitter.com/1.1/favorites/create.json'
}

module.exports = config;