function sum(a, b) {
    return a+b
}
const BACKEND_URL="http://localhost:3000";
describe("Authentication", ()=>{
test('User is able to sign up',async() =>{
   const usernme="snk"+Math.random();
   const password = "123456";
   const response= await axios.post(`${BACKEND_URL}/api/v1/signup`,{
    username,
    password,
    type:"admin"
   })

   expect(response.statusCode).toBe(200)

 const updatedResponse= await axios.post(`${BACKEND_URL}/api/v1/signup`,{
    username,
    password,
    type:"admin"
   })

expect(updatedResponse.statusCode).toBe(400);

});
})

