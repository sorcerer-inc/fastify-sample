import {reactive} from 'vue';

export default function Counter() {
    const counterState = reactive<{
        count: number;
    }>({
        count: 0
    })

    const add = () =>{
        counterState.count++
    }
    const sub = () => {
        counterState.count--
    }

    return {
        counterState,
        add,
        sub
    }
}
