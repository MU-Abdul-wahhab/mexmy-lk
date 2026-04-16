import { applyDecorators } from '@nestjs/common';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { GenderEnum } from '../enums/gender.enum';

export function BaseStringValidator(label : string){
 return applyDecorators(
   IsNotEmpty({message : `${label} is required`}),
   IsString({message : `${label} should be a string`}),
 )
}

export function BaseStringAndLengthValidator
(label : string , min : number, max : number){
 return applyDecorators(
   BaseStringValidator(label),
   Length(min , max, {message : `${label} should be between ${min} and ${max} characters`}),
 )
}

export function EmailValidator(label : string , min : number, max : number){
 return applyDecorators(
   BaseStringAndLengthValidator(label , min , max),
   IsEmail({} ,{message : `${label} is should be a valid email address`})
 )
}

export function MobileValidator(label : string) {
 return applyDecorators(
   BaseStringValidator(label),
   Matches(/^(0)(7)([01245678])([0-9]{7})$/, {
    message: 'Invalid Mobile Number',
   })
 );
}

export function GenderValidator(label : string) {
 return applyDecorators(
   BaseStringValidator(label),
   IsEnum(GenderEnum)
 )
}