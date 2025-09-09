export type Task = {
  id: number
  title: string
  description: string
  due_date: string
  posted_by: {
    id: number
  }
  priority: number
  state: number
  home_tag: boolean
  work_tag: boolean
  university_tag: boolean
  social_tag: boolean
}

export const TaskPriorityMap : { [key: number]: string } = {
  1: "Baja",
  2: "Media",
  3: "Alta",
}

export const TaskStateMap : { [key: number]: string } = {
  1: "To Do",
  2: "In Progress",
  3: "Done",
}
