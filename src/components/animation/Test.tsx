import { useSpring, animated } from "react-spring";
import { useEffect } from "react";
export const Test = ({
  newX,
  newY,
  time,
  proccessID,
  isInQueue,
}: {
  newX: number;
  newY: number;
  time: number;
  proccessID: number;
  isInQueue: boolean;
}) => {
  useEffect(() => {
    console.log("Component Test mounted with props:", {
      newX,
      newY,
      time,
      proccessID,
      isInQueue,
    });

    // Cleanup function (componentWillUnmount equivalent)
    return () => {
      console.log("Component Test unmounted");
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const [props] = useSpring(() => ({
    from: { x: 0, y: 50, backgroundColor: "blue", rotate: 0 },
    to: async (next) => {
      await next({ x: 136, y: 50, backgroundColor: "orange" });
      await next({
        x: 136,
        y: 400 - newY,
        backgroundColor: "orange",
        config: { duration: 3000 },
      });
      await next({
        x: 136,
        y: 400 - newY,
        backgroundColor: "pink",
        config: { duration: 3000 + time },
      });

      for (let t = 136; t <= 500; t++) {
        const x = t;
        const y = -0.00242 * Math.pow(t - 278.1875, 2) + 448.8211;
        await next({
          x,
          y,
          backgroundColor: "green",
          config: { duration: 1 }, // Duración del bucle
        });
      }
      await next({
        x: 500,
        y: 220.2058,
        backgroundColor: "pink",
        config: { duration: 500 },
        rotate: 90,
      });
      await next({
        x: 500,
        y: 220.2058,
        backgroundColor: "pink",
        config: { duration: 500 },
        rotate: 180,
      });
      await next({
        x: 500,
        y: 220.2058,
        backgroundColor: "pink",
        config: { duration: 500 },
        rotate: 270,
      });
      await next({
        x: 500,
        y: 220.2058,
        backgroundColor: "pink",
        config: { duration: 500 },
        rotate: 360,
      });
      if (isInQueue) {
        //a la izquierda
        for (let t = 500; t >= 136; t--) {
          const x = t;
          const y = 0.00407 * Math.pow(t - 267.396, 2);

          await next({
            x,
            y,
            backgroundColor: "orange",
            config: { duration: 2 }, // Duración del bucle
          });
        }
      } else {
        //a la derecha proceso terminado
        
        

        await next({
          x: 950,
          y: 100 + newY,
          backgroundColor: "bg-green-900",
          config: { duration: 500 },
          rotate: 360,
        });

        // await next({
        //   x: 136,
        //   y: 400 - newY,
        //   backgroundColor: "orange",
        //   config: { duration: 3000 },
        // });
        /**codigooo */
      }

      // await next({
      //   x: 136,
      //   y: 300 - newY,
      //   backgroundColor: "orange",
      // });
    },
    config: { duration: 2000},
    
  }));

  

  return (
    <div>
      <animated.div
        style={props}
        className="absolute text-center flex items-center justify-center"
      >
        <p className="text-center items-center justify-center w-12 h-8 border-[1px] border-black">
          {proccessID}
        </p>
      </animated.div>
    </div>
  );
};
