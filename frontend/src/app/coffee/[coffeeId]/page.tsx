export default function coffeeDetails({params,}:{params:{coffeeId:string}}){
    return  <h2>hello from coffee details with id {params.coffeeId}</h2>
}