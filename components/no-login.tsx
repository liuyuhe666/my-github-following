export default function NoLogin() {
  return (
    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <span className="font-medium">未登录!</span>
      {' '}
      请点击
      <code className="font-bold">Signin with GitHub</code>
      {' '}
      进行登录
    </div>
  )
}
