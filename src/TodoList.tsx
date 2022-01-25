import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const TodoList = () => {
    const { register, watch } = useForm();
    console.log(watch());

    return (
        <div>
            <form>
                <input {...register('Email')} placeholder="Write a Todo"/>
                <input {...register('FirstName')} placeholder="Write a Todo"/>
                <input {...register('LastName')} placeholder="Write a Todo"/>
                <input {...register('UserName')} placeholder="Write a Todo"/>
                <input {...register('Password')} placeholder="Write a Todo"/>
                <input {...register('Password1')} placeholder="Write a Todo"/>
                <button>Add</button>
            </form>
        </div>
    )
}

export default TodoList;