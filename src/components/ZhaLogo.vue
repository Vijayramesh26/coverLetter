<template>
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    v-bind="$attrs"
  >
    <!-- User-provided Tamil 'ழ' (Zha) Text Logo (Bold) -->
    <text 
      x="50%" 
      y="55%" 
      dominant-baseline="middle" 
      text-anchor="middle"
      font-size="12"
      font-weight="bolder"
      font-family="Noto Serif Tamil, Latha, serif"
      fill="#1976D2"
    >
      ழ
    </text>
  </svg>
</template>

<script>
export default {
  name: 'ZhaLogo'
}
</script>
