/*There are 4 controller functions
    Two controllers send an HTML response (either raw HTML or an HTML file)
    Two controllers send a data response
    One of the controllers uses query parameters in some way (req.query.parameterName)

There are 4 GET endpoints
    Endpoints that provided data start with /api (ex: /api/name returns a name)
    Endpoints that provide HTML start with / (ex: /about returns the about HTML page)
*/
const express = require('express'); //creating an instance of the Express app
const path = require('path'); //allows us to construct a path to our frontend/public folder
const app = express() //invoking Express to create an app obj that can "listen" for HTTP requests at a defined endpoint and "route" the request to the appropriate controllers (based on that specific endpoint)- allows us to access the express methods (.get(), .use(), etc.)
const port = process.env.PORT || 8080; //can use any non-conflicting port #, port 3000 is typical for Node.js server apps while port 8080 is typical for broad web apps
const host = process.env.HOST || '127.0.0.1'; //where 127.0.0.1 is the same as localhost (its alias)

//middleware
app.use(express.json()); //parses request body as JSON 

//controllers
const serveIndex = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'app', 'index.html'));
}
const serveContact = (req, res) => {
  res.send(`
  <link rel="stylesheet"
    href="https://cdn.prod.website-files.com/6703342836970e604cf8be0e/css/leens-dog-site.webflow.63f357830.css">
  <header role="banner" class="navbar w-nav">
    <a href="/" class="brand w-nav-brand w--current" aria-label="home">Doggos of NY</a>
    <nav role="navigation" class="nav-menu w-nav-menu">
      <a href="/" class="link-nav w-nav-link w--current">Home</a>
      <a href="/contact" class="link-nav w-nav-link">Contact</a>
    </nav>
  </header>
  <div class="wrapper center form">
    <div class="wrapper-info contact">
      <h2>Feedback Welcomed!</h2>
      <div class="wrap-content">
        <form method="post" name="email-form" id="email-form" aria-label="Email Form" class="w-form">
          <label for="name" class="sr-only">Your Name</label>
          <input type="text" class="field w-input" name="name" id="name" placeholder="Your Name" maxlength="256"
            required>
          <label for="email" class="sr-only">Your Email</label>
          <input type="email" class="field w-input" name="email" id="email" placeholder="Your Email" maxlength="256"
            required>
          <label for="message" class="sr-only">Message</label>
          <textarea class="field w-input" name="message" id="message" placeholder="Message" maxlength="5000"
            required></textarea>
          <input type="submit" class="button w-button" value="Submit">
        </form>
      </div>
    </div>
  </div>`);
}
const serveForm = (req, res) => {
  /** FEEDBACK: This route is not sending back any data! */
  const form = 9;
  res.send(form);
}
const serveFriends = (req, res) => {
  /** FEEDBACK: Here you are abstracting the name from the query however you are also getting it by doing req.query.name. 
   * This is conflicting with the code.  */
  const { name } = req.query.name;
  if (dogs[name]) res.send(dogs);
}

app.get('/', serveIndex); //html file
app.get('/contact', serveContact); //raw html
/** FEEDBACK: These two routes are currently not working! */
app.get('/api/contact/:query', serveForm); //data
app.get('/api/dogs/:name/friends', serveFriends); //data + query

//wildcard route endpoint + controller for undefined paths
app.get('*', (req, res) => {
  res.status(404).send(`
  <link rel="stylesheet"
    href="https://cdn.prod.website-files.com/6703342836970e604cf8be0e/css/leens-dog-site.webflow.63f357830.css">
  <h1>Page not found</h1>`);
});

//listen- any route defined in your the Express app can be accessed through the base URL http://localhost:8080 followed by the specific endpoint
app.listen(port, () => console.log(`listening at http://${host}:${port}`)); //"starts" the server, app, accessible at host ip address:chosen port #

/*
- [x] There are 4 controller functions
  - [ ] Two controllers send an HTML response (either raw HTML or an HTML file)
  - [ ] Two controllers send a data response
  - [ ] One of the controllers uses query parameters in some way (`req.query.parameterName`)
- [ ] There are 4 GET endpoints
  - [ ] Endpoints that provided data start with `/api` (ex: `/api/name` returns a name)
  - [ ] Endpoints that provide HTML start with `/` (ex: `/about` returns the about HTML page)
*/