import { useLayoutEffect, useState } from "react"

export function useViewport(threshold: number) {
  const [innerWidth, setInnerWidth] = useState(0)

  useLayoutEffect(() => {
    function handleResize() {
      setInnerWidth(window.innerWidth)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  })

  return { innerWidth, aboveThreshold: innerWidth > threshold }
}
