import { Field, ArgsType } from "@nestjs/graphql";
import { IsBoolean, IsOptional } from 'class-validator';


@ArgsType()
export class StatusArgs {
    @Field( () => String, { nullable: true })
    @IsOptional()
    @IsBoolean()
    status : boolean;
}