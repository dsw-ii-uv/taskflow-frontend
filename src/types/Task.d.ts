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