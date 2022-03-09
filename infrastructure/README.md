//////////// USER /////////////////
1. Create new users:
  -> make a POST request with postman using URL: http://localhost:8000/users/
  -> write the body with password etc
  -> we will get _id, token etc in response
  
2. Read a user:
  -> make a GET request with URL: http://localhost:8000/users/me
  -> right the specific token that was used to create the user in the authorization tab ... choose 'bearer token' as type
  -> no need to write the body  
  -> response will be the user's details

3. user login:
  -> make a POST request with URL: http://localhost:8000/users/login
  -> write the body with password etc
  -> no need for extra authorization
  -> response will be the user's detail along with the token

4. user logout:
  -> make a POST request with URL: http://localhost:8000/users/logout
  -> write the specific token
  -> no need to write body
  -> response will be blank

5. user delete:
  -> make a DELETE request with URL: http://localhost:8000/users/ME
  -> write the specific token
  -> no need to write body
  -> response will be blank


//////////// TASKS /////////////////
1. Create new:
  -> make a POST request with postman using URL: http://localhost:8000/tasks
  -> write the Task in body
  -> write the logged in token in bearer token authorization
  -> we will get _id, owner etc in response
  -> owner will be the same every time (deduced from the given token) ... _id will change with every new task
  
2. Read a task:
  -> make a GET request with URL: http://localhost:8000/tasks/:_id
  -> use the specific token in authorization
  -> no need to write the body  
  -> response will be the task's details

3. read all tasks:
  -> make a GET request with URL: http://localhost:8000/tasks/
  -> use the specific token in authorization
  -> no need to write the body  
  -> response will be all the tasks of logged in user

4. delete a task:
  -> make a DELETE request with URL: http://localhost:8000/tasks/:_id
  -> use the specific token in authorization
  -> no need to write the body  
  -> response will be the deleted task

