# Starter Repository for Assignment
First of all, be sur eto change the database name and password in .env file to make sure the datas will go to your desire database.

Then run this code -> npm run init_tables 
to create tables in your prefer database

then install the dependicies which can be installed by running this line -> npm install express mysql2 nodemon dotenv jsonwebtoken bcrypt

Then run this line -> npm run dev
to start the website, frontend and backend

Now you can start using the website

The very first part of the website is registering a user
so go to -> http://localhost:3000/register.html and register ypurself as a user by giving information like Username, Email and Password.

After successful rgisteration, you will get directed to the profile page -> http://localhost:3000/index.html

        - where you can see you statistics
        - where you can update your personal informations such as username, email and password.
        - It also has a fucntion to level up yourself but it will cost 70 diamonds
        - It also has a function to equip item that you belong with just item_id
        - And it has a taskprogress table where all of you task records will be held 

Then we have a User page -> http://localhost:3000/user.html

        - where you can see all of the users that are using this website
        - you can also see their details like yours -> http://localhost:3000/singleUserInfo.html

Then we have a Tasks page -> http://localhost:3000/tasks.html

        - where you can see the tasks and details of them -> http://localhost:3000/singleTaskInfo.html
        - you can created new tasks by giving title, description and points
        - you can do tasks by giving task_id, completion date in (YYYY_MM_DD) and Notes

Then we have a Paid Tasks page -> http://localhost:3000/paidTasks.html

        - where you can see the details of the tasks -> http://localhost:3000/singlePaidTaskInfo.html
        - where you can complete by clickign the button after seeing details
        - you will get diamonds as rewards where you can se to buy items
        - you will also get rewarded with creatures which will help you to raise your achievement rate

Then we have a Creatures page -> http://localhost:3000/creatures.html

        - where you can see the creatures and their details and the creatures can be collected by doing the paid tasks -> http://localhost:3000/singleCreatureInfo.html
        - the more the creatures, the higher your achievements will be

Then we have a Shop page -> http://localhost:3000/shop.html

        - where you can buy your items and view their details -> http://localhost:3000/singleItemInfo.html
        - the items will deduct your diamonds

Then we have Message page -> http://localhost:3000/message.html

        - where you can chat with all the user in the websites
        - you can view others and send
        - you can also edit your own messages and delete them

And finally you can log out after your session and you can log in at anytime with -> http://localhost:3000/login.html