export interface Recipe{
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