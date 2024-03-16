import { TodoItem } from '@/components/TodoItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Todo } from '@/types/Todo';

export default async function Home() {
  const data = await getTodos();
  // 未完了のタスクを取得
  const unComletedTodos = data.filter((todo) => !todo.completed);
  // 完了のタスクを取得
  const comletedTodos = data.filter((todo) => todo.completed);
  return (
    <div className='w-full max-w-3xl  grid gap-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
      <div className='space-y-3'>
        <div className='space-y-1.5'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
            タスク
          </h1>
          <form action={addTodo} className='flex items-start space-x-2'>
            <Input
              className='max-w-xs flex-1'
              placeholder='新しいタスクを入力'
              type='text'
              name='title'
            />
            <Button type='submit'>追加</Button>
          </form>
          <div className='flex items-center space-x-2'>
            <h2 className='text-lg font-medium text-gray-700 dark:text-gray-300'>
              未完了
            </h2>
            <span className='text-sm font-medium opacity-60'>
              {unComletedTodos.length}件
            </span>
          </div>
        </div>
        <div className='border-t border-gray-200 dark:border-gray-700' />
        <ul className='grid gap-2.5'>
          {unComletedTodos.map((todo) => (
            <div key={todo.id}>
              <TodoItem {...todo} />
            </div>
          ))}
        </ul>
      </div>
      <div className='border border-gray-200 dark:border-gray-700' />
      <div className='space-y-3'>
        <ul className='grid gap-2.5'>
          {comletedTodos.map((todo) => (
            <div key={todo.id}>
              <TodoItem {...todo} />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

const addTodo = async (data: FormData): Promise<void> => {
  'use server';
  const req = data.get('title');
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: req,
  });
  if (!res.ok) {
    throw new Error('Failed to add data');
  }
};
