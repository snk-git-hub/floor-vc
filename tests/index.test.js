const { default: axios } = require("axios");

const BACKEND_URL="http://localhost:3000";
describe("Authentication", ()=>{

/////////////////////////TEST 1////////////////////////////////
test('User is able to sign up only once',async() =>{
   const usernme="snk"+Math.random();
   const password = "123456";
   const response= await axios.post(`${BACKEND_URL}/api/v1/signup`,{
    username,
    password,
    type:"admin"
   });

   expect(response.statusCode).toBe(200)

 const updatedResponse= await axios.post(`${BACKEND_URL}/api/v1/signup`,{
    username,
    password,
    type:"admin"
   });
   expect(updatedResponse.statusCode).toBe(400);
});
//////////////////////////////TEST 2///////////////////////////////
   test('Signup request fails if the username is empty',async()=>{
   //  const username = `snk-${Math.random()}`
    const password = "123456"

    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
       username:"",
       password,
       type:"admin"
    });
    expect(error.response.status).toBe(400);
});
///////////////////////////////TEST 3///////////////////////////////
test(`Signin fails if the username and password are incorrect`,async()=>{
   const username = `snk-${Math.random()}`
   const password = "123456"

   axios.post(`${BACKEND_URL}/api/v1/signup`);
   await axios.post(`${BACKEND_URL}/api/v1/signin`);
   const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
      username :"WrongUsername",
      password
   })
   expect(updatedResponse.statusCode).toBe(403);

  })
});

