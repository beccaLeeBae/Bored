# Bored

![landing](https://user-images.githubusercontent.com/24556028/33004684-3619abe0-cd90-11e7-83ae-75b661db608d.png)

Bored is a web app that helps you find something to do when you have nothing to do.

Users can choose to find something to watch at home or at a movie theatre.
* Choosing to stay at home populates trending TV shows including when it airs (day(s) of the week and time) and the network. Users are given the option to visit Seamless after their choice is made.
* Choosing to leave the house takes the user's location (using their zip code) and checks if the current temperature is too extreme to go outside. 
   * If the current temperature falls into one of the two extremes (below 32&deg;F or above 90&deg;F), Bored will warn the user and give them an option to go back to TV show choices or to brave the weather.
   * If the current temperature is optimal, users will be directed to a page with current movies playing in nearby theatres. Each movie includes multiple showtimes for a handful of theatres, links to purchase their ticket through Fandango (if available), as well as food options based on time of day of the search (breakfast, lunch, dinner, or a late-night snack).

## User Stories
- My plans fell through for the weekend and now I have nothing to do. I'm going to be sitting at home and need something to watch.
- My in-laws are visiting and I need to leave the house. Preferably somewhere without cell reception and an overwhelming smell of buttered popcorn.
- My girlfriend wants to stay in tonight and can't make a decision to save her life. What do we watch?

## Approach
I began planning Bored by creating several wireframes, which ended up being a process of creating 5 sets of wireframes. This included looking at appealing font combinations (_Sans-serifs only? A san-serif and a complementary serif?_), color schemes (_analyzing those of Netflix, Fandango, etc._), and keeping major UX design principles in mind. I then began building out the front end skeleton in React with the help of Zeplin. 

Once this was completed, I moved on to building out the back end in Rails. This included:

* Token authentication
* A route to get movies currently in theatres (_with the current date and user's zip code_)
* A route to get all trending TV shows
* A route to get the current weather (_with the user's zip code_)
* A route to get nearby restaurants (_with the user's zip code and meal type generated from the time of day of the search_)
* A route to save a TV show or movie that the user is choosing to watch to that user's account (_with the type of entertainment medium_)
* A route to retrieve all saved entries and sort them by type of entertainment medium

My final touches included adding corresponding axios requests on the front end, proper display of selected data, and CSS (hey, it's mobile responsive!).

## Tech
- GraceNote OnConnect Data Delivery API
- Open Weather API
- The Movie DB API
- Foursquare API
- ReactJS (_front end_)
- Ruby on Rails (_back end_)
- Date-Format-Lite
- CSS
- PostgreSQL
- Surge & Heroku

## Dependencies
#### React
`date-format-lite`
`axios`
`react-router-dom`

### Rails
`HTTParty`

## Wireframes

### Log In Page
![log in](https://user-images.githubusercontent.com/24556028/33004685-36286ee6-cd90-11e7-9328-4d97bc838b3a.png)

### Search Page
![search param](https://user-images.githubusercontent.com/24556028/33004689-36576b92-cd90-11e7-9193-5bfff1e10202.png)

### Search Page (Open Menu)
![menu](https://user-images.githubusercontent.com/24556028/33004686-36352b4a-cd90-11e7-98cd-196813f97bb6.png)

### Search Page - Leaving The House
![out search](https://user-images.githubusercontent.com/24556028/33004688-364e9d96-cd90-11e7-81bd-d0ec0677d373.png)

### Search Results
![out results](https://user-images.githubusercontent.com/24556028/33004687-36429974-cd90-11e7-8034-29fa583ad30b.png)

### User Home Page
![bored history](https://user-images.githubusercontent.com/24556028/33004683-360a7706-cd90-11e7-8608-3375ccce54cc.png)

## Future Goals
* Find another API with current movie images
* Move front end to React Native

## More
Check out the [Rails back end](https://github.com/beccaLeeBae/Bored-Rails) for Bored.