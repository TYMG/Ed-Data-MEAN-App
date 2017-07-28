# Running MongoDB

<ol>
<li> Need to download and install Mongo CLI</li>
<li> 2. Open two terminals
<ul>Terminal One: type mongod y hit 'enter'</br>
    THe default port should be 27017
</ul>
<ul>Terminal Two: type mongo y hit 'enter'
</li>
</ol>

# Creating a Database and Collection in Mongo
In Terminal 2, the terminal that mongo was ran in, perform the following
<ol>
<li>use {{ dbname }} In this case dbname = edma 
You can switch to non-existing databases. When you first store data in the database, such as by creating a collection, MongoDB creates the database. 
</li>
<li>
To create the database and the collection, enter the following in the console:
<code>
    db.subjectCollection.insertOne( 
        { SubjectID: 1,
        PlotsAndConsequences:{
        LocPlotState1: "MD"
        } 
        } 
    );
    </code>
</li>
</ol>

# Connecting to MongoDB 

The .env file looks like it contains the connection information to MongoDB
Again note "edma" is the name database
------
    NODE_ENV=development
    PORT=4040
    JWT_SECRET=0a6b944d-d2fb-46fc-a85e-0295c986cd9f
    MONGO_HOST=mongodb://localhost/edma
    MONGO_PORT=27017
------

# Ref Data

Search for the numbers with:

`(\d+),(\d*)`

Then replace with \1\2

Search for the State with:

`(\w+\s*,")`
