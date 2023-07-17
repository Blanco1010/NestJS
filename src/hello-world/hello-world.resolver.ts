import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
    @Query( () => String, {description: 'Es una descripcion'} )
    helloWorld(): string {
        return 'Hello World';
    }

    @Query(() => Float, {name: 'randomNumber'} )
    getRandomNumber(): number {
        return Math.random() * 100
    }
    
    
    @Query(() => Int )
    getRandomFromZeroto( @Args('to', { nullable: true ,type:  () => Int}) max:number = 5): number {
        return ( Math.floor(Math.random() * max) + 1 )
    }
}
