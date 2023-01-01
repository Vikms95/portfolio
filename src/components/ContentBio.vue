<style scoped>
    .bio {
      column-gap: 1em;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      color: white;

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

    #typewritter-text {
      max-width: 100%;
      padding: 0 2em;
    }
  </style>

<script setup>
  import TypeWriter from 'typewriter-effect/dist/core';
  import { onMounted } from 'vue';

  onMounted( () => {
    const node = document.querySelector( '.typewriter-text' );
    const typewriter = new TypeWriter( node, {
      autoStart: true,
      loop: true
    } );

    typewriter
      .pauseFor( 200 )
      .typeString( 'Web developer.' )
      .pauseFor( 200 )
      .deleteAll()
      .typeString( 'Science enthusiast.' )
      .pauseFor( 200 )
      .deleteAll()
      .typeString( 'Gamer.' )
      .pauseFor( 200 )
      .deleteAll()
      .start();
  } );

</script>


<template>
  <header class='bio'>
    <img class='profile' src="../assets/profile.jfif"
         alt="vikms looking at the camera">

    <div class='bio-text'>
      <h2 class='typewriter-text' />

      <h3>
        I build impactful websites that work.
      </h3>

    </div>

  </header>
</template>