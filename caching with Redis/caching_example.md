
# Caching in Node.js with Redis

## Introduction to Caching

**Caching** is a technique used to temporarily store frequently accessed data in a faster storage area (the cache), so that future requests for the same data can be served quicker.

- Instead of fetching data from a slow source like a database or external API every time, the data is cached for quick retrieval.
- Caching improves the performance of applications by reducing load on the server and minimizing response times.

### Benefits of Caching
1. **Faster access** to frequently used data.
2. **Reduces load** on databases or external services.
3. **Improves performance** by avoiding repetitive operations.

---

## Simple Example: Node.js with Redis

This example shows how to cache API data in Redis using a Node.js server. Redis is a popular in-memory data structure store used as a database, cache, and message broker.

### Prerequisites

1. Install the following packages:
    ```bash
    npm install express axios redis
    ```

2. Install and run Redis on your system. For installation instructions, refer to [Redis documentation](https://redis.io/documentation).

### Example Code

```javascript
const express = require('express');
const axios = require('axios');
const redis = require('redis');

// Create Redis client
const redisClient = redis.createClient();

// Connect to Redis
redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

const app = express();
const PORT = 3000;

// Define an API endpoint to get data (e.g., from a public API)
app.get('/data', (req, res) => {
    const redisKey = 'apiData';  // Cache key

    // Check if data is in Redis cache
    redisClient.get(redisKey, async (err, data) => {
        if (err) throw err;

        if (data) {
            // If data is found in cache, return it
            res.send({
                source: 'cache',
                data: JSON.parse(data)
            });
        } else {
            // If not in cache, fetch from external API
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
                const apiData = response.data;

                // Store the data in Redis cache for 60 seconds
                redisClient.setex(redisKey, 60, JSON.stringify(apiData));

                // Return the API response
                res.send({
                    source: 'api',
                    data: apiData
                });
            } catch (error) {
                res.status(500).send('Error fetching data');
            }
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

### How It Works

1. The client requests data from the `/data` endpoint.
2. The server checks Redis to see if the data is cached.
3. If the data is found in the cache, it returns the cached version.
4. If the data is **not** in the cache, it fetches the data from the external API, saves it in Redis, and returns the data.
5. The cached data expires after 60 seconds, so after that, fresh data is fetched again.

### To Run the Example

1. Install and run Redis.
2. Start the Node.js app by running `node app.js`.
3. Visit `http://localhost:3000/data` in your browser.

The first request fetches from the API, while subsequent requests within 60 seconds will be served from the cache.
