type LoadingProps = {
    children: string
}
function Loading({children}:LoadingProps) {
  return (
    <div className="max-w-[800px] mx-auto p-5 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
      <p className="mt-4">{children}</p>
    </div>
  )
}

export default Loading