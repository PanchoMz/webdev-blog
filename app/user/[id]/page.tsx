const User = async({params}: {params: Promise<{id: string}>}) => {

    const {id} = await params;

    /*
    //email is a string but using | it could be a string or a number - any is not a good practice
    
    //interface is a way to define a type
    interface User {
        name: string;
        email: string; 
    }

    //type is a way to define a type
    type User = {
        name: string;
        email: string;
    }

    const user: User = {
        name: "John Doe",
        email: "john.doe@example.com"
    }
    */
    return(<>User Profile: {id}</>)
}
export default User;