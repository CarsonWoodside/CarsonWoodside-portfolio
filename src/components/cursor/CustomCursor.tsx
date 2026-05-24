import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

type CursorMode = "default" | "hover" | "project" | "link";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 });

  const [mode, setMode] = useState<CursorMode>("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };
    
    const checkTarget = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const closest = target.closest("a, button, [data-cursor]");

      if (!closest) {
        setMode("default");
        return;
      }

      const cursorType = closest.getAttribute("data-cursor");

      if (cursorType === "project") {
        setMode("project");
      } else if (closest.tagName === "A" || cursorType === "link") {
        setMode("link");
      } else if (closest.tagName === "BUTTON" || cursorType === "hover") {
        setMode("hover");
      } else {
        setMode("default");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", checkTarget);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkTarget);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  const sizeMap: Record<CursorMode, number> = {
    default: 12,
    hover: 40,
    project: 80,
    link: 20,
  };

  const colorMap: Record<CursorMode, string> = {
    default: "#F5F5F5",
    hover: "transparent",
    project: "#00E0FF",
    link: "#00E0FF",
  };

  const size = sizeMap[mode];
  const color = colorMap[mode];

  return (
    <>
      {/* Main cursor dot*/}
      <motion.div
        animate={{
          width: size,
          height: size,
          backgroundColor: color,
          borderWidth: mode === "hover" ? 1 : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          width: { type: "spring", stiffness: 300, damping: 28 },
          height: { type: "spring", stiffness: 300, damping: 28 },
          backgroundColor: { duration: 0.12 },
          borderWidth: { duration: 0.12 },
          opacity: { duration: 0.2 },
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: "50%",
          borderStyle: "solid",
          borderColor: "#F5F5F5",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: mode === "project" ? "normal" : "difference",
        }}
      />

      {/* OPEN label shown over project cards */}
      <AnimatePresence>
        {mode === "project" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              x: springX,
              y: springY,
              translateX: "-50%",
              translateY: "-50%",
              width: 80,
              height: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              zIndex: 10000,
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                color: "#050505",
                fontFamily: "Inter, sans-serif",
              }}
            >
              OPEN
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow behind cursor in link mode */}
      <AnimatePresence>
        {mode === "link" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.25, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              x: springX,
              y: springY,
              translateX: "-50%",
              translateY: "-50%",
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: "#00E0FF",
              filter: "blur(10px)",
              pointerEvents: "none",
              zIndex: 9998,
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}