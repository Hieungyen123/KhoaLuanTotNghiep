import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useAnimation } from "framer-motion"

const FramerScale = ({ children, width = 'fit-content' }) => {
    const ref = useRef(null)
    const isInView = useInView(ref)

    const mainControl = useAnimation();

    useEffect(() => {
        // console.log(isInView)

        if (isInView) {
            mainControl.start("Do")
        }
    }, [isInView])

    return (
        <div ref={ref} style={{ position: 'relative', width, overflow: 'hidden' }}>
            <motion.div
                variants={{
                    rest: { opacity: 0, scale: 0.5 },
                    Do: { opacity: 1, scale: 1 }
                }}
                initial="rest"
                // whileHover="hover"
                // whileTap="pressed"
                animate={mainControl}
                transition={{
                    duration: 1,
                    ease: [0, 0.71, 0.2, 1.01],
                    scale: {
                        type: "spring",
                        damping: 5,
                        stiffness: 100,
                        restDelta: 0.001
                    }
                    , delay: 1
                }}

            >
                {children}
            </motion.div>
        </div >
    )
}

export default FramerScale
