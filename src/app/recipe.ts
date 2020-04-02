export interface Recipe{
    id:number,
    name: string,
    ingredients:{
        quantity:string,
        name:string,
        type:string
    }[],
    steps: string[],
    timers:number[],
    imageURL:string,
    originalURL:string
}