
# PIZZA DELIVERY APPLICATION

## Task Overview :-

In my web development and Designing internship I completed the level 3 task. The information of the task is given below.

1. Crafting the Pizza Delivery App: The journey began with a deep dive into the MERN stack — MongoDB, Express.js, React, and Node.js. Leveraging these technologies, I contributed to the creation of a dynamic and responsive app that allows users to customize their pizzas and place orders with ease.

2. Pizza Customization Flow: The app’s highlight was its intuitive pizza customization flow. Users could choose from a variety of pizza bases, sauces, cheeses, and different (veg or non-veg) toppings, creating a personalized pizza experience.

3. Payment Integration with Razorpay: To ensure secure transactions, I seamlessly integrated Razorpay test mode for payment processing.

4. Inventory Management and Product Stock Updates: For the admin side, i implemented a mini inventory management system. It tracked the availability of ingredients, updating stock levels after each order. This ensured a smooth and efficient process for both users and admin.And admin will be able to see notifications if any product’s quantity falls below a threshold, ensuring timely replenishment and preventing any disruption in service.

⏺️ Prerequisites                                                                                                                                                                                                   
                                                                                                                                                                                                                  
  Install these first (if not already):                                                                                                                                                                           
  - https://nodejs.org — download the LTS version, run the installer                                                                                                                                              
  - https://git-scm.com/download/win — run the installer with default options                                                                                                                                     
                                                                                                                                                                                                                  
  ---                                                                                                                                                                                                             
  Setup (open Command Prompt or PowerShell)                                                                                                                                                                       
                                                                                                                                                                                                                  
  1. Clone the repo                                                                                                                                                                                               
  git clone https://github.com/IamsooAlive/Pizzza-Shop.git                                                                                                                                                        
  cd Pizzza-Shop\Pizza-Delivery_web                                                                                                                                                                               
                                                                                                                                                                                                                  
  2. Install dependencies                                                                                                                                                                                         
  npm install                                                                                                                                                                                                     
  cd Client                                                                                                                                                                                                       
  npm install                                                                                                                                                                                                     
  cd ..\Server                                                                                                                                                                                                    
  npm install                                                                                                                                                                                                     
  cd ..                                                                                                                                                                                                           
                                                                                                                                                                                                                  
  3. Create Server\.env                                                                                                                                                                                        
                                                                                                                                                                                                                  
  Open Notepad, paste this, save as Server\.env (make sure it's not saved as .env.txt):                                                                                                                           
  PORT=8080                                                                                                                                                                                                       
  MONGO_URI=mongodb+srv://mervinsequeira485_db_user:TrQwLuSZ3dssebN8@cluster0.ydxcfgu.mongodb.net/pizzaland?retryWrites=true&w=majority&appName=Cluster0                                                          
  JWT_SECRET=92a2942ba05ebcfb50df725fe31ea2c1955e8ffc1ba1ab2e14f3aba3a33c8cd4                                                                                                                                     
  KEY_ID=                                                                                                                                                                                                         
  KEY_SECRET=                                                                                                                                                                                                     
  CLIENT_URL=http://localhost:5173                                                                                                                                                                                
  RESEND_API_KEY=                                                                                                                                                                                                 
  FROM_EMAIL=                                                                                                                                                                                                     
                                                                                                                                                                                                               
  4. Create Client\.env
                                                                                                                                                                                                                  
  Same way, save as Client\.env:                                                                                                                                                                                  
  VITE_API_BASE_URL=http://localhost:8080                                                                                                                                                                         
                                                                                                                                                                                                                  
  5. Seed the database (first time only)                                                                                                                                                                          
  cd Server                                                                                                                                                                                                       
  node seed.js                                                                                                                                                                                                    
  cd ..                                                                                                                                                                                                           
                                                                                                                                                                                                                  
  6. Run the app                                                                                                                                                                                               
  npm start

  Then open http://localhost:5173 in the browser.
                                                                                                                                                                                                                  
  Admin login: admin@pizzaland.com / Admin@1234
