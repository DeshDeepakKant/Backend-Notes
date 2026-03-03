# 1. Roadmap for backend from first principles

Video URL: https://www.youtube.com/watch?v=R96uun75Sls

## Roadmap intro

[0:00] backend engineering is a very wide scope and when I say backend engineering it is
[0:07] much more than building a set of crud apis the way I think backend engineering
[0:12] is about building reliable scalable fall tolerant and maintainable code bases and
[0:19] efficient systems and if one were to start today
[0:25] to learn back in development there are a lot of resources and
[0:30] at least 1,00 resources but how do you decide what to learn how do you prioritize how do you
[0:36] see the big picture when and how all these different concepts come together and this is the reason it takes people
[0:43] years to get their head around a lot of these Concepts and principles because people primarily start with a limited
[0:50] scope of training uh whether it is from a college or a boot camp or a simple cop
[0:56] course and they eventually build onp top of that with trial and error and with
[1:01] help of other developers over time now I am a backend engineer and I have faced
[1:08] this struggle initially when I started out I had to constantly search for resources learn from other developers I
[1:15] have read a lot of books on backend development I have studied hundreds of open- source code bases to see how
[1:22] people in the industry are building stuff and it was a very timec consuming procedure and the second problem is
[1:29] people start with backend development from a particular language or Frameworks
[1:34] point of view it could be Express or spring boot or Ruby on Rails and the
[1:41] problem with that is you look at the problems that you solve with the lens of your particular language and ecosystem
[1:48] and there are blind spots in that let's imagine you have to switch to a different language let's say you were
[1:54] working with rubyan rails for years and one day your company decided to migrate to golang for performance reasons in
[2:00] that situation how much of your knowledge can you transfer if you don't understand the underlying systems so
[2:08] here I have decided to put together a comprehensive list of videos which are based on foundational concepts of a
[2:15] backend system and these are from various books that I've read over the years the open source code base we'll
[2:20] start with a very high level understanding of how backend systems work behind the scenes we'll look at how

## A high-level understanding

[2:27] request from browser flows through different hops the network firewalls over the internet and how it is routed
[2:34] to our backend server that is situated in a remote AWS server and how it responds to that request and we'll look
[2:41] at what the response looks like and that should give us a pretty vivid idea of
[2:47] how systems communicate how a client communicates with a server and how the server responds from there we'll move to

## HTTP protocol

[2:53] understanding HTTP protocol what is the role it plays and how the communication
[2:59] is established through HTTP and how HTTP raw messages look like and what are the
[3:05] HTTP headers what are the role of the headers the different types of headers like request headers or representational
[3:12] headers General headers and security headers and we'll look at different types of HTTP methods like get method
[3:18] post put delete and when to use them and what are the semantics and what are the principles behind them we'll look at
[3:25] what is the cost flow and how does it work we'll look at how simple request defers from a pre-flight request and how
[3:33] a pre-flight request FL looks like from our browser to the server and back to our browser we'll look at HTTP responses
[3:39] the structure of it and different status codes that server returns and when to return which type of code and what are
[3:46] the most commonly used HTTP status codes then we'll look at HTTP caching what are the different types of caching
[3:53] techniques using HTTP we have eags we have uh max age headers then we'll look at the differences between http 1. 1 and
[4:00] HTTP 2.0 and HTTP 3.0 and what are the differences between them we will look at
[4:05] how content negotiation looks like between client and server using different headers we'll see how persistent connections work in HTTP
[4:12] we'll look at HTTP compression different types of compression techniques like gzip and deflate and BR and which is the
[4:19] commonly used technique we'll see the security aspect of it the SSL TLS and htps then we'll move on to routing how

## Routing

[4:26] routing Maps URLs to server side logic and what is the connection between routing and HTTP methods different
[4:32] components of routes like path parameters and query parameters different types of routes static routes
[4:38] Dynamic routes nested routes hierarchical routes catchall Wild Card routes and regular expression based
[4:44] routes how to do API versioning using HTTP different types of versioning techniques we'll see what is the best
[4:49] way to deprecate it outout and what are the best practices in the industry we look at the benefits of Route grouping
[4:55] and how it helps with versioning permissions and shared middleware we'll see how to secure routes how to optimize
[5:02] route matching performance then we'll move on to serialization and der serialization this basically means how

## Serialisation and deserialisation

[5:08] before sending it over to the network our server translates the data into a particular format and after receiving
[5:14] the data from uh let's say client over the internet and how and how it translates the data received from the
[5:21] client over the internet to its own native format that is called DC realization and we will see what is the
[5:26] need of it and how it helps with the interoperability standard the different formats that are used in serialization
[5:33] der serialization we have text based formats which is Json or XML we have binary formats which is prot off and
[5:40] what are the performance differences between these two and when to use which one we'll look at how different
[5:45] programming languages Implement serialization and der serialization we will explore a popular text based format
[5:50] for serialization and der serialization which is Json the structure of Json the different data types like strings numbers booleans arrays and objects how
[5:58] realization of nested objects and collections are handled in Json how DC serializing into data structures the
[6:04] native data structures works like in let's say python dictionary or goang structs or JavaScript object what are
[6:11] the common errors while dealing with Json like handling missing or extra Fields dealing with null values or date
[6:17] serialization issues and time zone issues and how to implement custom serialization while before sending or
[6:24] serializing data into Json we'll look at error handling and serialization der serialization for example invalid data
[6:31] data conversion errors unknown Fields look at the security concerns if it like injection attacks why to do validation
[6:37] before DC realization and validating Json schemas before processing data using Json schema validation we'll see
[6:44] the performance aspect of it like reducing the serialized data through compression and eliminating unnecessary
[6:50] Fields like serialization performance between text based and binary formats like Json versus protuff the tradeoffs
[6:57] between readability and performance because in text based format you can easily check the payload and see that
[7:03] does not work the same in binary formats but binary formats are faster so when you you use a binary format and when you
[7:09] use a text Bas format that is a valid trade-off then we'll move to authentication and authorization why do

## Authentication and authorisation

[7:14] we use it different types of authentication like State full State L we have basic authentication better
[7:21] token authentications we'll look at sessions jws cookies we'll Deep dive on oo protocol and open ID connect we'll
[7:28] see how API keys work how multiactor authentications work what is salting hashing and different cryptographic
[7:34] techniques used in authorization we'll explore aack rback reback we'll look at
[7:40] what are the best practices in security like securing cookies avoiding csrf xss
[7:46] mitm like audit logging which basically means recording authentication authorization events for Audits and
[7:54] monitoring failed login attempts privilege escalation and access to sensitive resources we'll look at a
[7:59] skating authenticated related error messages preventing information leakage to attackers through detailed error messages like handling edge cases for
[8:07] example consistency in responses across different failure modes like rate limiting and account lockout we'll see
[8:12] how to avoid timing attacks for example attackers can exploit time differences in error responses to infer valid
[8:19] credentials for example an error for a wrong password might take longer than an error for a valid username because to
[8:25] check for a password you have to do some kind of hashing uh or uh some use some
[8:31] kind of cryptographic technique which takes a little bit of time so people can General the tiny bit of timing
[8:38] difference between them and guess passwords even though that's very difficult but we don't want to keep any
[8:44] security Halls then the next topic we'll explore is validation and transformation the different types of validation like

## Validation and transformation

[8:49] syntactic validation for example checking whether resting is a email or not whether it is a valid phone number
[8:55] or not or whether it is a valid date format or not there is semantic valid for example a date uh a date of birth
[9:02] cannot be in the future or the age of a person should be between one and 120
[9:08] these are called semantic validations then we have type validation for example checking the input values match expected
[9:15] types whether it is a string or not whether it is an integer or not whether it is an array or not whether it is an
[9:20] object or not these types of checks are called type validation we'll see what are the best practices for validation
[9:26] what is the difference between client side validation and what is the of server side validation the importance of server side validation even if client
[9:33] side validation is already implemented because client side validation improves user experience by providing instant
[9:39] feedback but server side validation is the true security implementation because that is the gateway to your business
[9:45] logic we'll look at the importance of failing fast by reducing unnecessary processing by returning early and we'll
[9:51] look at uh why to keep consistency between front end validation and backend validation then there is Transformations
[9:58] for example type casting converting string to number or number to string because uh in query parameters or path
[10:04] parameters whatever we receive is a string but let's say we are expecting an ID field which is a number so before we
[10:10] send it to our handlers we have to convert that string into a number so that step is called a transformation
[10:15] which we have to take care of in our validation Pipeline and different date formats for example the front end might
[10:22] send a different format or we might be expecting a time stamp so that also has to taken care of in the validation
[10:28] pipeline then there is normalization for example converting an email to lower case or trimming white space from a
[10:34] string or adding country code to a phone number these are called normalizations then there is sanitization for security
[10:41] issues for example we have to sanitize a string that is submitted by the user to
[10:46] prevent attacks like SQL injection then there is complex validation Logic for example relationships let's say User
[10:53] submitted a form and it has two Fields one is password and another is confirm password so we have to check whether the
[10:59] two strings are the same or not so that is a relationship based validation then there is conditional validation so let's
[11:05] say in the form there are two Fields one is partner name and the second is
[11:11] married which is a Boolean true or false so a partner field might only be required if the married is true so that
[11:18] is a conditional validation so these kinds of checks we have to do then there is chain validation like converting a
[11:23] string to lower case then roving special characters and then checking its length then we'll look at error handling in
[11:29] validation like sending meaningful error messages to front end so that the user can fix them and aggregating all
[11:35] validation errors in one response for client side display or Aus skating error messages so instead of saying invalid
[11:42] password we'll have to say invalid credentials to prevent different types of attacks then we will see how to
[11:47] gracefully handle failed Transformations for example an invalid Json and a failed date conversion and how to let the user
[11:54] know in a meaningful message then we'll look at the performance trade-offs of validation and how to optimize it by
[12:00] returning early avoiding redundant validations then our next topic is going to be middleware we'll look at what is a

## Middlewares

[12:08] middleware and when to use them what are the common use cases of middlewares the role of a middleware in a request cycle
[12:14] for example a pre-quest middleware or a post response middleware the flow of middlewares for example techniques like
[12:21] chaining a middleware is executed in a sequence passing control to the next middleware until request reaches its
[12:26] final Handler how to order middleware is appropriate for example we have to go in this order we have to log the request we
[12:32] have to check whether the user is authenticated or not we have to do validation and we have to do route
[12:38] handling and then we have to do error handling so this order matters in middleware flow we'll see how the next
[12:44] function Works in middleware and exiting middleware early how middleware can SE
[12:50] circuit the request pipeline by handling 404 errors we'll look at some of the common middlewares like security
[12:55] middlewares which add security headers like X content type or strict Transport Security or content security policy or
[13:02] middlewares which add appropriate course headers to every single request or response and middleware to avoid csrf
[13:10] attack middleware to rate limit then we have authentication middleware to reuse
[13:15] the route protecting logic across our apps then we have logging and monitoring middlewares for request logging or
[13:21] structur logging for observability or easier debugging in production then we have error handling middlewares which
[13:28] catches and form mats application Level errors for consistent API responses then we have compression or performance
[13:34] related middlewares which basically compresses response bodies to reduce the size of data sent over the networks then
[13:39] we have data passing middleware passing incoming request bodies like Json URL encoded forms and file uploads handles
[13:45] multiplatform data for the file uploads then we'll look at the performance and scalability aspect of middleware like
[13:52] what are the best practices to keep middlewares lightweight and efficient ensuring middleware is applied in the
[13:57] correct order or how how middleware order can affect the performance and security of the application the next

## Request context

[14:03] topic is going to be request context request context basically means the metadata that is often passed through
[14:10] application middlewares controllers and services it is kind of a request coped
[14:15] State right the state is only valid for that request so here we'll explore the
[14:20] life cycle of a request maintaining State for the duration of a request sharing data across different layers of
[14:26] the application without coupling how context provides a temporary request scoped State we look at what are the
[14:31] different components of a request context the request metadata for example the HTTP method the URL headers the
[14:37] query parameters and the body and there is the session and user information for example in the authentication middleware
[14:43] we fetch the user information and then we add it to the request context so for that request scope the users information
[14:50] is injected into the context then we have tracking and loging information like unique request IDs or Trace IDs
[14:56] then we have request specific data like custom data in injected during the request life cycle like caching data permission checks we'll look at what are
[15:02] the use cases for example authentication rate limiting tracing logging we'll explore the connection between
[15:08] middlewares and request contexts we'll see what are the different types of timeouts the request timeouts custom timeouts cancellation signals we'll see
[15:15] what are the best practices like keeping it lightweight to prevent memory overhead ensuring context data is cleaned up after request life cycle to
[15:22] prevent memory leaks avoiding tightly coupling components through context or over relying on it for passing data then

## Handlers, controllers and services

[15:28] we'll move to handlers and controllers the MVC pattern and what handlers and controllers and services the
[15:34] responsibilities of all of them and reducing code with middleware then we have centralized error handling in
[15:39] handlers and consistent success and error message formats and how to implement them in controllers then we'll

## CRUD deepdive

[15:46] look at the different types of crud operations like how cud operations map HTTP methods and what are the common
[15:52] apis associated with each method for example post method is usually used for creation and submissions and the status
[15:59] code is usually 2011 created or a400 if it's a bad request and get requests are
[16:05] usually associated with fetching a list of resources or fetching a single resource and we have put and Patch to
[16:11] update resources and delete to delete resources we look at how to implement pagination and how to implement a search
[16:19] API how to do sorting and how to do filtering and we'll see what are the best practices for example strict
[16:25] validation consistent response formatting limiting payload redacting sensitive Fields error handling
[16:31] authentication and authorization then we'll explore what is the restful architecture and what are the best practices for implementing rest apis the

## RESTful architecture and best practices

[16:39] principle of Designing apis around resources and sticking to sttp semantics
[16:44] and best practices for filtering and pagination uh what are the different types of versioning like URI versioning
[16:50] header versioning query string media type we'll see how to design apis with open API spec in mind you'll see content
[16:57] negotiation capturing exceptions and providing meaningful messages supporting client side caching e taxs and
[17:04] optimizing large requests and responses after that we'll move on to a very important topic which are databases in

## Databases

[17:10] databases we'll look at relational and non-relational what are the differences and to when to use which we look at some
[17:16] of the theoretical Concepts like acid and cap theorem we'll take a look at basic quering and joints and database
[17:22] design best practices like schema design indexing we look at different optimization methods like query
[17:28] optimization caching connection pooling then we have data Integrity like constraints and validations transactions
[17:35] and concurrency we'll see how ORS work whether to use an orm what are the
[17:40] tradeoffs and we'll look at what are database migrations that we'll move on to business logic layer which is also

## Business logic layer (BLL)

[17:46] called BL what is the role of it what are the different layers of a request cycle for example we have validation
[17:52] layer we have routing we have middlewares and we have handl and controls which all of them fall under
[17:57] presentation layer because they they deal with users data whether it is accepting users data or sending a user
[18:04] data so those are part of a presentation layer after that we have business logic layer which is the middle one which
[18:11] deals with our Core Business logic and after that we have the data access layer
[18:17] which deals with databases perform squaring or inserts or deletions and business logic layer uses the data
[18:23] access layer behind the scenes we'll look at different design principles like separation of concerns single
[18:28] responsibility open close dependency inversion what are the components of a business logic layer for example we have
[18:33] Services we have domain models which represent core entities like a user or an order then we have business tools
[18:40] then we have business validation logic we'll look at service layer design best practices we'll look at how to handle
[18:45] errors properly and how to propagate those errors from our service layer to our presentation layer after that we

## Caching

[18:51] have caching we'll discuss what is the need of caching and how it differs from database persistence what are the
[18:57] different types of caching we have memory caching browser caching database caching and what is the need of client
[19:02] side caching and server side caching the different caching strategies for example cash aside right through right behind or
[19:09] right back read through the different cash eviction strategies for example lru
[19:14] lfu TTL and fifo need for cash invalidation like manual Cash invalidation Time To Live invalidation
[19:21] or event bash invalidation the different levels of caching level one which is in memory level two which is Network
[19:27] distributed and there is is the hierarchical caching which combines level one and level two caching
[19:33] strategies where frequently used data is stored in a fast small cach which is the level one cache and the less frequently
[19:40] used data is stored in a slower or large cach which is the level two cache we'll see how caching for web apps looks like
[19:46] that is caching static assets or caching API responses using headers we'll see how to cach with databases for example
[19:52] query caching like storing the results of heavy joints in redis and look at
[19:59] Cash hit and cash Miss ratio and how to optimize them after that we'll move on

## Transactional emails

[20:04] to transactional emails what are the use of them what are the common use cases the anatomy of a transactional email the
[20:10] subject the preheader the body header main content CTA footer and how to personalize with different Dynamic
[20:16] parameters then we have task queuing and scheduling what are the common use cases

## Task queuing and scheduling

[20:21] for example queuing might be used for sending emails or processing image files and third party API integration like
[20:28] Payment Processing or web hooks or offloading heavy computation like badge processing for example a user clicks a
[20:33] button to clear all my data so to clear all the users data we have to call we
[20:39] have to execute different queries for different tables to clear all the users data and that might take some time so
[20:45] instead of blocking the request we return the response instantly and we trigger a background job by pushing into
[20:50] the task Cube we'll look at scheduling what are the use cases for example for example running database backups
[20:56] recurring notifications and reminders data synchronization or maintenance related issues for example clearing logs
[21:03] or caches the different components of a task Q There is the producer Q consumer
[21:09] broker backend the flow of a task dependency for example it might be chain dependency or it might have parent child
[21:16] relationship we look at task groups executing multiple task concurrently and waiting for all of them to complete at
[21:21] the same time we look at how to handle errors and Implement retries in task use we'll look at task prioritization and
[21:28] and rate limiting for example giving importance to task like Payment Processing before you process task like
[21:33] sending notifications after that we'll move on to elastic search why do we use elastic search and how does it work

## Elasticsearch

[21:39] behind the scenes the different techniques that are used for example inverted index term frequency and inverse document frequency segments and
[21:46] shards what are the use cases of elastic search for example providing a type ahead experience or log analytics or
[21:53] social media search for example full text search for user profiles posts comments we'll see how to create and
[21:59] manage indexes we'll see how to search and query different types of searching basic searching full text search
[22:04] relevance scoring we'll see how to optimize search performance by tweaking text versus keyword Fields understanding
[22:10] analyzers and boosting and pagination we'll take a look at some of the advanced search patterns for example
[22:16] filtering aggregation fuzzy search then we'll see how kibana works and how to use elastic search in a user friendly
[22:22] way and different best practices for example defining field mappings explicitly optimizing the number number
[22:28] of shards indexing data in batches and avoiding wild cards then we have error handling the different types of errors

## Error handling

[22:35] in our apps could be syntax errors runtime errors logical errors and different error handling strategies for
[22:41] example fail safe or fail fast graceful degradation or prevention of Errors different practices for error handling
[22:48] for example catching early not swallowing errors custom error types failing gracefully logging errors and
[22:53] using stack traces we'll look at how Global error handlers work we'll see how to appropriate handle user facing errors
[23:00] like providing friendly error messages and providing actionable feedbacks we'll see the importance of monitoring and
[23:05] logging in error handling and different tools like Sentry or elk stack and
[23:11] different error alerts like email based alerts and slack based alerts after that we have config management what is

## Config management

[23:18] exactly config management and how does it help with flexibility and decouples environment specific settings from
[23:25] application logic and what are the use cases for example example different environments using config management
[23:31] safely managing sensitive data such as API Keys database passwords and private certificates dynamically enabling and
[23:38] disabling features without changing codebase what are the best practices of config management different types of
[23:44] configs for example static configs like DB credentials and API end points
[23:49] Dynamic configs like feature Flags rate limits and sensitive configs like credentials tokens secrets and different
[23:56] sources of configs for example it could be EnV file or Json or yaml and what are
[24:01] the differences between using environment variables versus command line Flags versus static files after

## Logging, monitoring and observability

[24:07] that we have logging monitoring and observability a very important topic we'll see what are the differences between logging tracing monitoring and
[24:15] observability the different types of logging like system logging application access security logs the different
[24:20] levels of logs like debug info one error fatal and we'll see the difference
[24:26] between structured logging and un structure logging and the best practices for logging like centralized logging log
[24:33] rotation and retention contextual and meaningful logs and avoiding sensitive data like passwords and API Keys then we
[24:39] will look at monitoring different types of monitoring like infrastructure monitoring application performance monitoring uptime monitoring the
[24:46] different tools that are used in monitoring like Prometheus grafana and how to manage alerts and notifications
[24:52] by defining thresholds creating alerts and avoiding alert fatigue by only creating action alerts and ensuring that
[24:59] alerts are meaningful and necessary then we'll take a look at observability the three pillars of observability which are
[25:06] logs metrics and traces the best practices around it the security and compliance of log management after that
[25:12] we'll move on to graceful shutdown why do we need graceful shutdown and how does it work behind the scenes what are

## Graceful shutdown

[25:18] the different use cases for example you might need it when server restarts or or scaling in Cloud environments or
[25:25] microservices or long running jobs how it works like signal handling sigor signant and sill signals what are the
[25:32] different steps of graceful shutdown for example it starts with capturing a signal and then it stops accepting
[25:38] requests then it completes an inflight requests and then it closes external resources like database connections or
[25:45] any open files Etc and at last it terminates the app after that we'll move on to security the different aspects of

## Security

[25:52] security in a backend code base avoiding different security attacks like SQL injection no SQL injection xss csrf
[25:59] broken authentication insecure deserialization and principles of a secure software design for example least
[26:06] privilege defense in depth fail secure defaults separation of Duties security by Design then we'll look at the
[26:13] importance of input validation and sanitization and rate limits and content security policy course and same side
[26:20] cookie and the importance of monitoring events after that we have scaling and performance the different metrics of

## Scaling and performance

[26:26] performance like response time resource utilization identifying bottlenecks caching and database optimization for
[26:33] example avoiding n plus1 query problems and ensuring proper use of joints and
[26:38] using lazy loading where appropriate then we have using database indexes to speed of read operations on frequent VAR
[26:45] Fields like indexing foreign keys or search Fields how to process data in batches to minimize database load and
[26:51] improve performance for large data sets how to avoid memory leaks like closing file handles database connections or
[26:57] cleaning of after a long process minimizing Network overhead by reducing payload size and using compression we'll
[27:03] look at how to do performance testing and profiling we look at some of the best practices for writing performant
[27:08] code like focusing on writing clear and maintainable code first without premature optimization and writing
[27:15] modular code to make it easier to optimize individual components without affecting the entire system ensuring
[27:21] that if a particular resources under load are unavailable the system degrades gracefully without crashing and how to
[27:27] offload non critical tasks like sending emails or logging to background processes or task use to free of
[27:33] resources for more critical operations then we have concurrency and parallelism what are the difference between

## Concurrency and parallelism

[27:39] concurrency and parallelism and how concurrency helps in IO bound task and how parallelism helps in CPU bound tasks
[27:46] then we have object storage and large files we'll look at some of the common use cases when we use object storage

## Object storage and large files

[27:51] like awss 3 and how to manage large files with chunking and streaming and
[27:57] we'll look at multiart file uploads then we have realtime backend systems where we take a look at web sockets or servers

## Real-time backend systems

[28:03] and events and pubs of architecture to that we have testing and code quality

## Testing and code quality

[28:09] here we take a look at different types of testing unit testing integration testing end to end testing functional
[28:14] testing regression testing performance testing load and stress testing user acceptance testing security testing
[28:21] we'll take a look at what is test driven development how to automate test in cicd environments how to manage code quality
[28:27] with external linting and formatting tools and what are the measures of code quality and coverage like quality
[28:33] metrics like cyclomatic complexity which measures complexity of a function by counting the number of possible paths
[28:39] through the code and we have maintainability index which basically quantifies how easy it is to maintain a
[28:45] code based on the complexity lines of code and other factors then we'll take a look at a very interesting set of

## 12 factor app

[28:51] principles which is called 12 Factor app after that we'll move on to open API standards what is the need of this

## OpenAPI standards

[28:58] standards and why should we stick to it what are the benefits of it what are the use cases like documentation Automation
[29:04] and the ecosystem surrounding it like Swagger Corden postmen and what is the history the Swagger to open API
[29:12] transition and what are the different versions that are currently active and what are the key concepts of open API
[31:17] documents for example there is API pass the request and response definition there is parameters there is schemas and
[29:25] what is the structure of an OPN API document there is metadata there is paths there is components there is
[29:31] security definitions and there is responses we'll see what are the new features of open API 3.0 and 3.1 what
[29:37] are the tools surrounding open API for example Swagger UI Cen Postman what are the best practices like avoiding
[29:44] duplication and sticking to standards we'll look at a very interesting development method which is API First
[29:51] Development where you define your open API standard or write your open API spec first and then you start creating the
[29:57] apis after that we'll move on to web hooks what are the use cases of web hooks by like sending notification third

## Webhooks

[30:03] party Integrations what are the differences between API versus web hook for the same use case for example for
[30:08] API we might have to use polling which is client side initiated compared to web hooks which is pushing is server
[30:14] initiated what are the key components of web hooks for example the web hook URL event triggers payload HTTP method the
[30:21] response handling what are the best practices surrounding web hooks like web hook signature verification like using
[30:27] http PS and quick response retry logic logging how to test web hooks with enro
[30:32] real world use cases like STP Payment Processing GitHub web hook slack Discord TWU Etc and at last we'll take a look at

## DevOps for backend engineers

[30:40] what are some devops Concepts and backend engineer should be familiar with for example some of the Core Concepts
[30:46] like continuous integration continuous delivery continuous deployment the
[30:51] devops practices like infrastructure is code config management Version Control the different tools surrounding devops
[30:58] for example creating containers with Docker or orchestrating container with kubernetes and cicd pipelines and how to
[31:05] scale your service horizontal scaling versus vertical scaling and different
[31:10] deployment strategies like red green deployment rolling deployment Etc and that's about it this is all the concepts
[31:17] that we are going to cover in the next 30 or 40 videos so stay tuned