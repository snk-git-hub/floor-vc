const { default: axios } = require("axios");
const { use } = require("react");

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
test('Signin sucesseds if the username and password are correct',async()=>{
    const username= `snk-${Math.random()}`
    const password = "123456"

    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
      username,
      password,
      type:"admin"
    });
    expect(response.status).toBe(200);
})
///////////////////////////////TEST 4///////////////////////////////////
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
describe("User metadata endpoint",()=>{
   let token = "";
   let avatharId="";
///////////////////MAIN TEST ////////////////////////////////////

   beforeAll(async ()=>{
      const username = `snk-${Math.random()}`
      const password = "123456"
   const response_=await axios.post(`${BACKEND_URL}/api/v1/signup`,{
         username,
         password,
         type:"admin"
      })

   const response =await axios.post(`${BACKEND_URL}/api/v1/signin`,{
         username,
         password,
      })

      token = response.data.token


      const avatharResponse = await axios.post(`${BACKEND_URL}/api/v1/avatar`,{
         "imageUrl":"https://pin.it/3orGVA49C",
         "name":"Timmy"
      })
      avatharId= avatharResponse.avatharId;

   })
/////////////////////////TEST 1////////////////////////////////

  test("User can't update their metadata with a wrong avatar id",async()=>{
   const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`,{
      avatharId:"123123123"
   },{
      headers:{
         "authorization":`Bearer ${token}`
      }
   })
   expect(response.statusCode).toBe(400);
  })
/////////////////////////TEST 2////////////////////////////////

   test("User can update their metadata with the right avathar id",async()=>{
         const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadat`,{
            avatharId
         },{
            headers:{
               "authorization":`Bearer${token}`
            }
         })
         test(response.statusCode).toBe(200)
   })
/////////////////////////TEST 3////////////////////////////////

   test("User is not able to update their metadata if the auth head",async()=>{
      const response= await axios.post(`${BACKEND_URL}/api/v1/user/metadata`,{
         avatharId
      },{
         headers:{
            "authorization":`Bearer ${token}`
         }
      })
      expect(response.statusCode).toBe(403)
   })
})
describe("User avathar information ",()=>{
   let avatharId;
   let token;
   let userId;
///////////////////MAIN TEST ////////////////////////////////////

     beforeAll(async ()=>{
      const username = `snk-${Math.random()}`
      const password = "123456"
   const signupResponse=await axios.post(`${BACKEND_URL}/api/v1/signup`,{
         username,
         password,
         type:"admin"
      })

     userId = signupResponse.data.userId;
   const response =await axios.post(`${BACKEND_URL}/api/v1/signin`,{
         username,
         password,
      })

      token = response.data.token


      const avatharResponse = await axios.post(`${BACKEND_URL}/api/v1/avatar`,{
         "imageUrl":"https://pin.it/3orGVA49C",
         "name":"Timmy"
      })
      avatharId= avatharResponse.avatharId;

   })
/////////////////////////TEST 1////////////////////////////////

   test("Get back avathar information for a user",async()=>{
     const response=await axios.get(`${BACKEND_URL}/api/v1/user/metadata/bulk?ids=[${userId}]`)
    expect( response.data.avathars.length).toBe(1);
    expect( response.data.avathars[0].userId).toBe(userId);

   })
/////////////////////////TEST 2////////////////////////////////

   test("Available avatars lists the recently created avatar",async()=>{
      const response = await axios.post(`${BACKEND_URL}/api/v1/avathars`);
      expect(response.data.avatars.length).not.toBe(0);
      const currentAvathar =  response.data.avatars.find(x=>x.id==avatharId);
      expect(currentAvathar).toBeDefined()
   })

})
