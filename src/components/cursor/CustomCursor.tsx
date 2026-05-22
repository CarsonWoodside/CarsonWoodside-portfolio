import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)
    const springX = useSpring(cursorX, { stiffness: 500, damping: 40 })
    const springY = useSpring(cursorY, { stiffness: 500, damping: 40 })

    useEffect(() => {
        const move = (e: MouseEvent) => {
            cursorX.set(e.clientX - 6)
            cursorY.set(e.clientY - 6)
        }
        window.addEventListener('mousemove', move)
        return () => window.removeEventListener('mousemove', move)
    }, [])

    return (
        <motion.div
            className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
            style={{ x: springX, y: springY }}
        />
    )
}