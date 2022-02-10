const CustomerStatics={
     profilePituresPath:(customerId,imageName)=>process.env.PUBLIC_URL + "/customer/"+customerId+"/photos/"+imageName
}
export default CustomerStatics;

