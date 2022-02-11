const CustomerStatics={
     profilePituresPath:(customerId,imageName)=>{
          return `/images/customers/${customerId}/photos/${imageName}`
     }
}
export default CustomerStatics;

