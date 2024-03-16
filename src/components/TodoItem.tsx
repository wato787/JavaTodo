'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import type { Todo } from '@/types/Todo';

const TodoItem = (props: Todo) => {
  return (
    <li className='flex items-center space-x-2.5'>
      <Checkbox
        onClick={() => updateTodo(props.id, props)}
        checked={props.completed}
        className='h-4 w-4'
      />
      <div className='grid gap-0.5'>
        <p className='text-sm font-medium leading-none'>{props.title}</p>
      </div>
      <div className='ml-auto flex space-x-2'>
        <Button
          onClick={() => deleteTodo(props.id)}
          size='sm'
          variant='outline'
        >
          削除
        </Button>
      </div>
    </li>
  );
};

export { TodoItem };

const deleteTodo = async (id: number): Promise<void> => {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const updateTodo = async (id: number, data: Todo): Promise<void> => {
  const req = {
    ...data,
    completed: !data.completed,
  };
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  });
};
