# Welcome to Todo List Application

# Installation and setting up ----------------------------------------------

    1: Clone the Repository: Copy and paste the following command into your terminal and press Enter to clone the repository to your local machine:
        git clone https://github.com/PrinceM13/nextjs-todo-list.git

    2: Navigate to Repository Folder: Change your current directory to the repository folder by running this command in your terminal:
        cd nextjs-todo-list

    3. Create .env file in /nextjs-todo-list with following items:

        # for frontend -----------
        NEXT_PUBLIC_API_URL="http://localhost:3030/api" # or change to you domain if you want to deploy on sever (ex. https://www.todo-list.com/api)
        NEXT_PUBLIC_WEB_URL_URL="http://localhost:3030" # or change to you domain if you want to deploy on sever (ex. https://www.todo-list.com)

        # for backend ------------
        # database
        DB_URL={'please fill with url for connection to you mongodb'}
        # jwt
        JWT_EXPIRES_IN={'please fill with expiration date'}
        JWT_SECRET_KEY={'please fill with your own secret key'}
        # email
        # -- nodemailer
        EMAIL={'please fill with your own gmail'}
        EMAIL_PASSWORD={'please fill with your app password from google account'}
        # -- resend (https://resend.com/)
        RESEND_EMAIL_API_KEY={'please fill with api-key from resend'}

    4: Install Dependencies: Install the necessary project dependencies by running the following command:
        npm install

    4: Start the Application: Launch the Todo List Application on your local server with this command:
        npm run dev

# --------------------------------------------------------------------------

# Go live with Vercel ------------------------------------------------------

    please check live version of application with following link:
        https://nextjs-todo-list-theta.vercel.app/todo-list

    note: sending email with nodemailer is not working with vercel so can not play with following features:
        1. verify email
        2. forgot password

    # but you can still play with offline version, just update .env file

# --------------------------------------------------------------------------
