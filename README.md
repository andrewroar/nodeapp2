## Note Taker Homework

# User Story

The homework is not hard, but I spent alot of hours trying to solve the issue where the html won't connect to the index.js/css. I tried using helmet to overcome the problem but it did not work. Eventually, I created a direct path to the files and the rest is pretty easy.

# Explanation

Code 15 to 27 is responsible to read and re-write the data from the database (db.json). The main bit to beware is the html can only read/store string so we need so we need to stringify the object before storing it in the db.

Code 30 to 49 handle all the get request

Code 52 to 61 handle the post request. newNote is the new data the user enter. noteTable run the function which read the data from DB and a new DB will be created with the new data. UUID is also used to create an unique ID for all the note. This ID will be used for deleting the note from the DB as well.

Code 64 to 76 handle the delete. the note that will be deleted will be filtered by its ID.
