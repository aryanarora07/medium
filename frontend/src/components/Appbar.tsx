import { Avatar } from "./BlogCard"

 export const Appbar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4">
        <div className="flex flex-col  ">
            Medium
        </div>
        <div>
            <Avatar size="small" name="Aryan" />
        </div>
    </div>
  )
}
