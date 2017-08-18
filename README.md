# React Nanodegree Project - MyReads: A Book Lending App

Web application using React to manage your books in shelves (read, currently reading and want to read).

## How to run the web application

* Install npm
* Clone the code from https://github.com/carlosrp/reactnd-myreads.git
* Run npm Install
* Start with npm Start
* Browse to http://localhost:3000

## Application Functionality

### Main Shelves view

* 3 Shelves to manage your books:
** Currently Reading
** Want To Reading
** Read

* Books are stored in a backend, accessed by an API (https://reactnd-books-api.udacity.com").

* The books in each shelf have a button that allows to be moved between shelves or removed ('None'): this is updated without refreshing the screen using React, and also in the backend using the api

* The shelf selector shows the current book shelf

* There is a button at the bottom right to search books: when clicked, it takes you to a different screen where you can find books (possible search terms restricted to list in SEARCH_TERMS.md)

### Search view

* Search field to type in search terms (results shown dynamically as you type)

* The search shows the books returned from the backend THAT ARE NOT already in any of my shelves

* Books in the search view have a shelf selector, with 'None' value (since they are not in any shelf)

* When selecting selecting one of our shelves in a book found from a search, it will add it immediately disappearing from the list of found books (since it is now in one if my shelves)

* When clicking the back link (on the top left or browser), it takes you to the main view with the new added books shown (also updated in backend via API)

## Possible Deviations from Specification, Possible issues and Future Improvements (?)

* The Search view only shows found books that ARE NOT already in any of my shelves; the specification may require to show also books in my shelves in the search results with the shelf selected (?). I still think that it is useful that the search (which should be to find other books you don't have) shows only other books...

* Search API call: the maxResults parameters seems not to work very well?

* Dynamic number of shelves: it would be nice to be able to add/remove shelves... similar to Goodreads.


Carlos Rodriguez, 2017
