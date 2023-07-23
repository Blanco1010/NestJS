import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { StatusArgs } from './dto/args/status.args';
import { AggregationsType } from './types/aggregations.type';


@Resolver( () => Todo )
export class TodoResolver {

    constructor(
        private readonly todoService: TodoService
    ){}
    
    @Query( () => [Todo], {name: 'todos'} )
    findAll(
        @Args() statusArgs: StatusArgs
    ): Todo[] {
        return this.todoService.findAll(statusArgs);
    }
    
    @Query( () => [Todo], {name: 'todo'} )
    findOne( @Args('id', { type: () => Int }) id: number ){
        return this.todoService.findOne(id);
    }

    @Mutation( () => Todo, { name: 'createTodo' })
    createTodo( @Args('createTodoInput') createTodo: CreateTodoInput ){
        return this.todoService.create(createTodo);
    }
    
    @Mutation( () => Todo, { name: 'updateTodo' })
    updateTodo( @Args('updateTodoInput') updateTodoInput: UpdateTodoInput ){
        return this.todoService.update(updateTodoInput.id,updateTodoInput);
    }

    @Mutation( () => Boolean )
    removeTodo(
        @Args('id', { type: () => Int }) id: number
    ){
        return this.todoService.delete(id);
    }

    @Query( () => Int, { name: 'completedTodos' } )
    TotalTodos() : number {
        return this.todoService.totalTodos;
    }

    @Query( () => Int, { name: 'completedTodos' } )
    pendingTodos() : number {
        return this.todoService.totalPendingTodos;
    }

    @Query( () => Int, { name: 'completedTodos' } )
    completedTodos() : number {
        return this.todoService.totalCompletedTodos;
    }

    @Query( () => AggregationsType )
    aggregations(): AggregationsType {
        return {
            completed: this.todoService.totalCompletedTodos,
            pending: this.todoService.totalPendingTodos,
            total: this.todoService.totalTodos,
            totalTodosCompleted: this.todoService.totalTodos,
        }
    }
}
