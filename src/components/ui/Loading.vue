<script setup lang="ts"></script>

<template>
  <div class="loading-container">
    <span class="loader"><span class="loader-inner"></span></span>
  </div>
</template>

<style scoped>
.loading-container {
  height: 100%;
  width: 100%;
  text-align: center;
  position: absolute;
  backdrop-filter: blur(10px);
  z-index: 9999999;
  background-color: rgba(0, 0, 0, 0.176);
}

.loader {
  display: inline-block;
  width: 30px;
  height: 30px;
  position: relative;
  border: 4px solid #fff;
  top: 50%;
  animation: loader 2s infinite ease;
}

.loader-inner {
  vertical-align: top;
  display: inline-block;
  width: 100%;
  background-color: #fff;
  animation: loader-inner 2s infinite ease-in;
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(180deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes loader-inner {
  0% {
    height: 0%;
  }

  25% {
    height: 0%;
  }

  50% {
    height: 100%;
  }

  75% {
    height: 100%;
  }

  100% {
    height: 0%;
  }
}
</style>
