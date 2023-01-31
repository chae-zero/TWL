```js
<motion.button animate={{scale: 1.5}}>
  <span>button</span>
</motion.button>
```

`animate={{ rotateZ: 180, opacity: 0.2, marginTop: 200 }}`
`animate={{ fontSize: 50, color: '#ff2994', x: 100, y: -100 }}`
`animate={{ scale: 1.5 }}`

```js
<motion.div initial={{opacity: 0}} animate={{opacity: 1}}></motion.div>
```

```js
<motion.div
  className="home container"
  initial={{opacity: 0}}
  animate={{opacity: 1}}
  transition={{delay: 1.5, duration: 1.5}}
></motion.div>
```

```js
<motion.div
  className="title"
  initial={{y: -250}}
  animate={{y: -10}}
  transition={{delay: 0.2, type: "spring", stiffness: 120}}
></motion.div>
```

- stiffness - 스프링의 강도

```js
<motion.li
  key={base}
  onClick={() => addBase(base)}
  whileHover={{scale: 1.3, originX: 0, color: "#f8e112"}}
  transition={{type: "spring", stiffness: 300}}
></motion.li>
```

# Variants

```js
const containerVariants = {
  hidden: {
    opacity: 0,
    x: "100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {type: "spring", delay: 0.5},
  },
};

<motion.div
  className="base container"
  variants={containerVariants}
  initial="hidden"
  animate="visible"
  transition={{type: "spring", delay: 0.5}}
></motion.div>;
```

### Orchestration

- 부모 태그의 initial, animate 의 문자열이 자식 태그의 문자열과 일치하면 굳이 안적어줘도 적용이 된다.
- when - children tag 의 애니메이션의 순서를 다르게 적용해준다. ("beforeChildren", "afterChildren")
- mass - 작으면 움직임이 빨라지고, 크면 느려진다.
- damping - 커질수록 스프링이 멈추는 속도가 빨라진다.
- staggerChildren - 자식 태그들의 나오는 순서의 시간 간격을 준다.

```js
const containerVariants = {
  hidden: {
    opacity: 0,
    x: "100vw",
    transition: {
      staggerChildren: 0.5,
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      mass: 0.4,
      damping: 8,
      staggerChildren: 0.4,
      when: "beforeChildren",
    },
  },
};
```

### keyframes

```js
const buttonVariants = {
  // visible: {
  //   x: [0, -20, 20, -20, 20, 0],
  //   transition: { delay: 2 }
  // },
  hover: {
    scale: [1, 1.1, 1, 1.1, 1, 1.1], // 배열을 주어서 원하는 만큼 반복
    // borderRadius: ["20%", "20%", "50%", "50%", "20%"],
    textShadow: "0px 0px 8px rgb(255,255,255)",
    boxShadow: "0px 0px 8px rgb(255,255,255)",
    transition: {
      duration: 1.5,
    },
  },
};
```

### keyframes transition yoyo (number, Infinity... )

```js
const buttonVariants = {
  hover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255,255,255)",
    boxShadow: "0px 0px 8px rgb(255,255,255)",
    transition: {
      duration: 0.3,
      yoyo: 5,
    },
  },
};
```

### AnimatePresence

- AnimatePresence 태그로 감싸야만 exit prop을 쓸 수 있다! (조건문 처리도 AnimatePresence 안에 해야 인식이 된다)

```js
// 4초 뒤 액션
const [showTitle, setShowTitle] = useState(true);
setTimeout(() => {
  setShowTitle(false);
}, 4000);

<AnimatePresence exitBeforeEnter>
  {showTitle && (
    <motion.h2 exit={{y: -1000}}>Thank you for your order :</motion.h2>
  )}
</AnimatePresence>;
```

### modal

- onExitComplete에 콜백함수로 showModal 상태를 변경해주어서 뒤로가기 버튼이 실행되도 exit 이 되도록 한다.

```js
const modal = {
  hidden: {y: "-100vh", opacity: 0},
  visible: {
    y: "200px",
    opacity: 1,
    transition: {delay: 0.5},
  },
};

const Modal = ({showModal}) => {
  return (
    <AnimatePresence exitBeforeEnter onExitComplete={() => setShowModal(false)}>
      {showModal && (
        <motion.div
          className="backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div className="modal" variants={modal}>
            <p>Want to make another Pizza?</p>
            <Link to="/">
              <button>Start Again</button>
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
```

### Animating SVG's (pathLength)

```js
const svgVariants = {
  hidden: {rotate: -180},
  visible: {
    rotate: 0,
    transition: {duration: 1},
  },
};

const pathVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};

<div className="logo">
  <motion.svg
    className="pizza-svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    variants={svgVariants}
    initial="hidden"
    animate="visible"
  >
    <motion.path
      fill="none"
      d="M40 40 L80 40 C80 40 80 80 40 80 C40 80 0 80 0 40 C0 40 0 0 40 0Z"
      variants={pathVariants}
    />
    <motion.path
      fill="none"
      d="M50 30 L50 -10 C50 -10 90 -10 90 30 Z"
      variants={pathVariants}
    />
  </motion.svg>
</div>;
```

### Loader transition x and y seperate

```js
const loaderVariants = {
  animationOne: {
    x: [-20, 20],
    y: [0, -30],
    transition: {
      x: {
        yoyo: Infinity,
        duration: 0.5,
      },
      y: {
        yoyo: Infinity,
        duration: 0.25,
        ease: "easeOut",
      },
    },
  },
};

const Loader = () => {
  return (
    <>
      <motion.div
        className="loader"
        variants={loaderVariants}
        animate="animationOne"
      ></motion.div>
    </>
  );
};
```

### useCycle Hook

```js
const loaderVariants = {
  animationOne: {
    x: [-20, 20],
    y: [0, -30],
    transition: {
      x: {
        yoyo: Infinity,
        duration: 0.5,
      },
      y: {
        yoyo: Infinity,
        duration: 0.25,
        ease: "easeOut",
      },
    },
  },
  animationTwo: {
    y: [0, -40],
    x: 0,
    transition: {
      y: {
        yoyo: Infinity,
        duration: 0.25,
        ease: "easeOut",
      },
    },
  },
};

const Loader = () => {
  const [animation, cycleAnimation] = useCycle("animationOne", "animationTwo");

  return (
    <>
      <motion.div
        className="loader"
        variants={loaderVariants}
        animate={animation}
      ></motion.div>
      <div onClick={() => cycleAnimation()}>Change Loader</div>
    </>
  );
};
```

### Dragging object

```js
<motion.div
  className="logo"
  drag
  dragConstraints={{left: 0, top: 0, right: 0, bottom: 0}} // drag
  dragElastic={0.7}
></motion.div>
```
