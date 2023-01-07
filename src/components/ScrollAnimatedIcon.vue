<style scoped>
  .outer {
    margin-bottom: 5em;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-self: center;
    height: 40px;
    width: 25px;
    position: relative;
    border: 3px solid rgb(57, 72, 209);
    background-color: rgba(0, 0, 0, 0%);
    overflow: hidden;
    border-radius: 1rem;
  }

  .dot {
    width: 7px;
    height: 7px;
    background-color: rgb(57, 72, 209);
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: 8.5px;
    transform: translateY(0);
    opacity: 1;
    animation: drop 1.5s infinite forwards;
  }

  @keyframes drop {

    /* define the animation */
    from {
      transform: translateY(0);
      opacity: 1;
    }

    to {
      transform: translateY(15px);
      opacity: 0;
    }
  }


</style>

<template>
  <div class='outer'>
    <span class='dot' />
  </div>
</template>