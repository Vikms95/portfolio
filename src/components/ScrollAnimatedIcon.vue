<style scoped>
  .outer {
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    justify-self: center;
    align-items: center;
    margin-bottom: 5em;
    height: 40px;
    width: 25px;
    border-radius: 1rem;
    border: 3px solid rgb(57, 72, 209);
    background-color: rgba(0, 0, 0, 0%);
    transition: opacity 1000ms;
  }

  .dot {
    position: absolute;
    top: 10px;
    left: 8.5px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: rgb(57, 72, 209);
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

<script setup>

  window.addEventListener( 'scroll', () => {
    const mouse = document.querySelector( '.outer' );
    if ( window.scrollY >= 200 ) {
      mouse.style.opacity = 0;
    } else if ( window.scrollY < 200 ) {
      mouse.style.opacity = 1;
    }
  } );

</script>

<template>
  <div class='outer'>
    <span class='dot' />
  </div>
</template>