import { useEffect, useState } from 'react'
export const useDarkMode = (): [string, () => void, boolean] => {
  const [theme, setTheme] = useState('dark')
  const [mountedComponent, setMountedComponent] = useState(false)

  const setMode = (mode: string): void => {
    window.localStorage.setItem('theme', mode)
    setTheme(mode)
  }

  const toggleTheme = (forceTheme: string = ''): void => {
    if (forceTheme !== '') {
      setMode(forceTheme)
    } else {
      theme === 'light' ? setMode('dark') : setMode('light')
    }
  }

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme')
    localTheme && setTheme(localTheme)
    setMountedComponent(true)
  }, [])
  return [theme, toggleTheme, mountedComponent]
}
