import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useAnimation } from "framer-motion"

const FramerY = ({ children, width = 'fit-content' }) => {
    const ref = useRef(null)
    const isInView = useInView(ref)

    const mainControl = useAnimation();

    useEffect(() => {
        // console.log(isInView)

        if (isInView) {
            mainControl.start("visible")
        }
    }, [isInView])

    return (
        <div ref={ref} style={{ position: 'relative', width, overflow: 'hidden' }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 750, scale: 0.5 },
                    visible: { opacity: 1, y: 0, scale: 1 }
                }}
                initial="hidden"
                animate={mainControl}
                transition={{
                    duration: 1, delay: 1, ease: [0, 0.71, 0.2, 1.01],
                    scale: {
                        type: "spring",
                        damping: 5,
                        stiffness: 100,
                        restDelta: 0.001
                    }
                }}

            >
                {children}
            </motion.div>
        </div>
    )
}

export default FramerY
