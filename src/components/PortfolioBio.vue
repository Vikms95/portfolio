<style scoped>
  .bio {
    backdrop-filter: blur(2px);
    color: white;
    display: flex;
    flex: 1 0 auto;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
    column-gap: 2em;
    margin-bottom: 18em;
  }

  .bio-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  img.profile {
    justify-self: flex-start;
    height: 240px;
    width: auto;
    border-radius: 50%;
  }

  .bio-text {
    max-width: 100%;
    font-size: xx-large;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  }

  .bio-hero {
    font-size: 22px;
  }

  .bio-text > h2,
  .bio-text > h3 {
    margin: 1.5em 0;
  }

  #typewritter-text {
    max-width: 100%;
    padding: 0 2em;
  }
</style>

<script setup>
  import TypeWriter from 'typewriter-effect/dist/core';
  import { onMounted } from 'vue';
  import profilePicture from '/social-icons/profile.jfif';

  onMounted( () => {
    const node = document.querySelector( '.typewriter-text' );
    const typewriter = new TypeWriter( node,
      {
        autoStart: true,
        loop: true
      } );

    typewriter
      .pauseFor( 200 )
      .typeString( 'Professional web developer' )
      .pauseFor( 200 )
      .deleteAll()
      .typeString( 'Science enthusiast' )
      .pauseFor( 200 )
      .deleteAll()
      .typeString( 'Book and videogames lover' )
      .pauseFor( 200 )
      .deleteAll()
      .start();



  } );

</script>

<template>
  <header class='bio'>
    <img class='profile' :src=' profilePicture '
         alt="looking at the camera">

    <div class='bio-text'>
      <h2 class='typewriter-text' />

      <h3 class='bio-hero'>
        I build impactful websites that bring success to your business
      </h3>

    </div>

  </header>
</template>