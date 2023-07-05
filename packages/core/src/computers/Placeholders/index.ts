import { deriveFrom } from '../../deriveFrom';
import { Request } from '../Request';

export const Todos = deriveFrom(Request, {
  name: 'Todos',
  params: {
    url: 'https://jsonplaceholder.typicode.com/todos',
  },
  tags: ['JSON', 'Placeholder'],
  category: 'API',
})

export const Users = deriveFrom(Request, {
  name: 'Users',
  params: {
    url: 'https://jsonplaceholder.typicode.com/users',
  },
  tags: ['JSON', 'Placeholder'], 
  category: 'API',  
})

export const Posts = deriveFrom(Request, {
  name: 'Posts',
  params: {
    url: 'https://jsonplaceholder.typicode.com/posts',
  },
  tags: ['JSON', 'Placeholder'],
  category: 'API',  
})  