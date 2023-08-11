## Overview

Lego is Lightweight React State Management Library that help you build your React applications with modular and scalable state management using Lego, just like assembling Lego blocks.

![enter image description here](https://img.icons8.com/?size=200&id=38643&format=png)

### Features

- **Lego Primtive:** Lego is the minimal unit of state that can be created and accessed independently. Legos are composable, allowing you to build complex state structures while keeping them separate and manageable.
- **No Providers:** Legos can be created and accessed within the component tree without relying on a traditional context provider setup.
- **Reactivity:** Lego leverages React's reactivity model to automatically re-render components that depend on legos when their state changes. This helps keep your UI in sync with the underlying state.
- **Asynchronous Updates:** Lego supports asynchronous state updates, making it suitable for scenarios where state changes involve data fetching, API calls, or other async operations.
- **Efficient Re-Renders:** Only the components that directly use a specific lego are re-rendered when that lego's state changes.
- **Derived State:** Lego allows you to create derived legos, which are calculated based on the values of other legos. This is useful for avoiding unnecessary recomputation and keeping your state logic organized.

### Examples

#### Simple Lego State

    import { lego, useLego } from  "./lego";

    const  legoCounter = lego(0);

    function  Counter() {
        const [count, setCount] = useLego(legoCounter);
        return (
    		<div>
    			<button  onClick={() => setCount(count + 1)}>count</button>
    			<p>Count: {count}</p>
    		</div>
    	)
    }

#### Derived Lego State

    import { lego, useLego, useLegoValue } from  "./lego";

    const  legoCounter = lego(0);
    const  legoDouble  = lego((get) =>  get(legoCounter) *  2);

    function  Counter() {
        const [count, setCount] = useLego(legoCounter);
        const  double = useLegoValue(legoDouble);
        return (
    		<div>
    			<button  onClick={() => setCount(count + 1)}>count</button>
    			<p>count: { count }</p>
    			<p>double: { double }</p>
    		</div>
    	)
    }

#### Async Legos

    import { lego, useLego } from  "./lego";

    const  legoData  =  lego(() =>
    	fetch("https://jsonplaceholder.typicode.com/todos/1").then((res) =>
    		res.json()
    	)
    )

    function  Counter() {
        const data  =  useLegoValue(legoData);
        return (
    		<div>
    			<p>Count: {JSON.stringify(data)}</p>
    		</div>
    	)
    }
