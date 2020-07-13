import {useState, useEffect, useCallback} from 'react'

export const useFetch = fn => {
  const [result, setResult] = useState()
  const fetch = useCallback(() => {
    fn().then(setResult)
  }, [fn])
  useEffect(() => {
    fetch()
  }, [fetch])
  return [result, fetch]
}
