
**Movie app scalable architecture**

 1. The architecture is highly scalable which can handle  5x of provided
    specs. Starting with the client, the clients sent API requests which
    hit DNS Resolver and then distributed across 2 load balancers. This
    is required as we can distribute the load and avoid a single point
    of failure.
 2. Then the request is sent to node app which consists of multiple
    nodes and each node running app in cluster mode to utilize all
    available CPUs. To retrieve data will check in the cache first if it
    is not available in the cache then will retrieve from database and
    cache it for future requests
 3. Caching is important as it stores frequently used data in memory
    which allows us to quickly send the response and avoids load on the
    database
 4. Finally, the data is retrieved from MongoDB, here we can use MongoDB
    sharding feature. This allows us to split the huge amount of data
    stored in mongo collections to be distributed in different physical
    storage devices i.e it allows horizontal scaling. Also, the load is
    distributed across multiple servers
