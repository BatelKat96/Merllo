import { useEffect } from 'react'

export function useClickOutside(ref, callback) {
	function handleClick(e) {
		if (ref.current && !ref.current.contains(e.target)) {
			callback()
		}
	}
	useEffect(() => {
		document.onmousedown = (ev) => {
			handleClick(ev)
		}
		return () => {
			document.onmousedown = null
		}
	}, [])
}