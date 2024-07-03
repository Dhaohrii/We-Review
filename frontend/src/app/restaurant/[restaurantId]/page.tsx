export default function restaurantDetails(
    {params,}:{params:{restaurantId:string}}
){
    return <h2>hello from restaurant details with id {params.restaurantId}</h2>
}