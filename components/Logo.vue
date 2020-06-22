<template>
  <img class="Logo" alt="Logo" src="/sakubun_hansei.png" />
</template>

<style>
.Logo {
  height: 270px;
  width: 270px;
  transform: rotateY(560deg);
  animation: turn 3.5s ease-out forwards 1s;
}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
