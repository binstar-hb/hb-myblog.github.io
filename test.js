import { onBeforeUnmounted, onMounted, ref } from 'vue'
export default function () {
  const x = ref(-1); // x绑定为响应式数据
  const y = ref(-1);
  const clickHandler = (event: MouseEvent) => {
    x.value = event.pageX
    y.value = event.pageY
  }
  onMounted(() => {
    window.addEventListener('click', clickHandler)
  })
  onBeforeUnmounted(() => {
    window.removeEventListener('click', clickHandler)
  })
  return {
    x, y
  }
}