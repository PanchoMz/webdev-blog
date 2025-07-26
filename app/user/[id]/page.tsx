const User = async({params}: {params: Promise<{id: string}>}) => {

    const {id} = await params;

    //could fetch data using id from params

    return(<>User Profile: {id}</>)
}
export default User;