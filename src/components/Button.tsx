import React, { FC, ReactNode, useState, useRef, useEffect } from "react";

// export const Button: FC = ({ children }) => (
//     <button type="button">{children}</button>
//   )
interface ButtonProp {
  children: ReactNode | string;
  // TODO: 这里如何加事件？？
  // onClick?:() => {}
}
// export const Button:FC<ButtonProp> = ({children}) => <button type="button">{children}</button>

export const Button: FC<ButtonProp> = ({ children }) => (
  <button type="button">{children}</button>
);

enum PizzaType {
  TMT = "tomato sauce",
  BBQ = "bbq sauce",
  GAL = "garlic sauce",
  DIC = "dick sauce",
}

export const Pizza: FC = () => {
  const sauces: string[] = [PizzaType.TMT, PizzaType.BBQ, PizzaType.GAL];

  const [curSauce, setCurSauce] = useState("none");

  return (
    <>
      <p>Choose a pizza topping:</p>
      {sauces.map((sauce) => (
        <button type="button" key={sauce} onClick={() => setCurSauce(sauce)}>
          {sauce}
        </button>
      ))}
      <p>Chosen topping: {curSauce}</p>
    </>
  );
};

export const Counter: FC = () => {
  const [num, setNum] = useState(0);
  return (
    <>
      <button
        onClick={() => {
          setNum(num - 1);
        }}
      >
        -
      </button>
      <div id="clockbutton">{num}</div>
      <button
        onClick={() => {
          setNum(num + 1);
        }}
      >
        +
      </button>
    </>
  );
};

export const PlayPause: FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pp = async () => {
    const video = videoRef.current as HTMLVideoElement;
    if (video?.paused) {
      await video.play();
    } else {
      video?.pause();
    }
  };
  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        loop
        src="https://media.tenor.com/videos/632c96bbc411d8baa3f7f43692474808/webm"
        aria-label="video"
      />{" "}
      <br />
      <button type="button" onClick={pp}>
        play/pause
      </button>
      <br />
    </>
  );
};

export const SelfDestory: FC = () => {
  const [destroyed, setDestoryed] = useState(false);
  const timerRef = useRef<number>();
  const start = () => {
    if (!timerRef.current) {
      timerRef.current = setTimeout(() => {
        setDestoryed(true);
      }, 3000);
    }
  };
  const cancel = () => {
    setDestoryed(false);
    clearTimeout(timerRef.current);
    timerRef.current = undefined;
  };
  return destroyed ? null : (
    <>
      <button type="button" onClick={start}>
        Start to destroy
      </button>
      <button type="button" onClick={cancel}>
        Cancel to destroy
      </button>
      <p>this msg will destroy itself in 3000ms</p>
    </>
  );
};

// 这个不行，因为组件一直在渲染，而且先渲染默认的en-GB，再渲染泰文的。但是 1s过去了，又重置
// export const ShowClock:FC<{locale?:string}> = ({locale = 'en-GB'}) => {
//     const [time, setTime] = useState<string>()
//     setInterval(() => {
//         setTime(new Date().toLocaleTimeString(locale))
//     }, 1000)
//     return <>
//         <p>{time}</p>
//     </>
// }

// TODO: 看看 是如何运作的 。应该是先执行，然后发现依赖改动了，就执行返回的函数，然后再执行一遍。如此往复
export const ShowClock: FC<{ locale?: string }> = ({ locale = "en-GB" }) => {
  const [time, setTime] = useState<string>();
  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString(locale));
    };
    update();
    console.log("手动Update");
    const interval = setInterval(update, 1000);
    return () => {
      clearInterval(interval);
      console.log("you are fucked");
    };
  }, [locale]);
  return (
    <>
      <p>{time}</p>
    </>
  );
};

export const ChangeLocale: FC = () => {
  const [locale, setLocale] = useState("en-GB");
  const changeLocale = () => {
    setLocale(locale === "en-GB" ? "th-TH-u-nu-thai" : "en-GB");
  };
  return (
    <>
      <button type="button" onClick={changeLocale}>
        change locale
      </button>
      <ShowClock locale={locale} />
    </>
  );
};
