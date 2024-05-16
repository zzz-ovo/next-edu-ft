export default function ValidationLayout({ children }) {
  return (
    <>
      <img src="/certificate-validation/ecnu-back.png" alt=""
        className="fixed z-10 w-[60vw] opacity-[0.03] 
        left-[50vw] top-[50vh] transform-x-y-center"
        style={{ filter: "grayscale(100%)" }}
      />

      <div className="max-w-2xl relative transform-x-center left-1/2 height-[103%]">
        <div className="flex items-center m-2.5">
          <img className="mr-2.5 h-[60px] w-[60px]" src="/certificate-validation/dase.png" />
          <h1>链上信息</h1>
        </div>
        <div className="pl-2.5 pr-2.5 relative">
          {children}
          <div className="pb-[1em]"><p className="text-center text-gray-400">© StarChain 2023</p></div>
        </div>
      </div>
    </>
  )
}