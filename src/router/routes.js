import TaskList from '../components/TaskList.vue'
import CreateTask from '../components/CreateTask.vue'

const routes = [
  {
    path: '/task/list',
    name: 'TaskList',
    component: TaskList,
  },
  {
    path: '/task/create',
    name: 'CreateTask',
    component: CreateTask,
  },
  {
    path: '*',
    component: TaskList,
  }
]

export default routes