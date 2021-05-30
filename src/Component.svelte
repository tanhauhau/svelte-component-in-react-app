<script>
  import { getContext, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let a = 3;
  export let b = 4;

  // export let onAChange;
  // export let onBChange;

  export let sum;

  const context = getContext('context');

  $: sum = a + b;
  $: dispatch('sum', sum);

  // $: dispatch('change', { type: 'a', value: a })
  // $: dispatch('change', { type: 'b', value: b })
  // $: typeof onAChange === 'function' && onAChange(a);
  // $: typeof onBChange === 'function' && onBChange(b);

  export function mReset() {
    a = 0;
    b = 0;
  }
  export function mRandom() {
    a = Math.floor(Math.random() * 10);
    b = Math.floor(Math.random() * 10);
  }
</script>

<div>
  <input type="number" bind:value={a} /> + <input type="number" bind:value={b} /> = {sum}
</div>

<button on:click={() => a--}> a-- </button>
<button on:click={() => a++}> a++ </button>
<button on:click={() => b--}> b-- </button>
<button on:click={() => b++}> b++ </button>

<div>{$context}</div>
