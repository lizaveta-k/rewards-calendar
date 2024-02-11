<template>
  <div class="draggable" @mousedown="startDragging" @mouseup="stopDragging">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  payload: unknown;
}>();

let draggingElement: HTMLElement;

function startDragging(event: MouseEvent): void {
  const element = cloneElement(event.target! as HTMLElement);
  draggingElement = element;
  document.addEventListener('mousemove', drag);
}

function stopDragging(event: MouseEvent) {
  if (!draggingElement) return;
  const style = draggingElement.style;
  style.position = '';
  style.top = '';
  style.left = '';
  draggingElement.remove();
  document.removeEventListener('mousemove', drag);

  const elementBelow = document.elementFromPoint(event.clientX, event.clientY);

  const dropEvent = new CustomEvent('dnd:drop', {
    bubbles: true,
    detail: { payload: props.payload },
  });

  elementBelow?.dispatchEvent(dropEvent);
}

function cloneElement(target: HTMLElement): HTMLElement {
  target.insertAdjacentHTML('afterend', target.outerHTML);
  const cloned = target.nextSibling! as HTMLElement;
  cloned.style.display = 'none';
  return cloned;
}

function drag(event: MouseEvent): void {
  if (!draggingElement) return;

  const style = draggingElement.style;
  style.display = 'inherit';
  style.position = 'absolute';
  style.zIndex = '3';
  style.width = '60px';
  style.cursor = 'grabbing';

  style.top = event.pageY - draggingElement.offsetHeight / 2 + 'px';
  style.left = event.pageX - draggingElement.offsetWidth / 2 + 'px';
}
</script>
