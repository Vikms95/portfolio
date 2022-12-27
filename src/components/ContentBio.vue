<style>
    .bio
    {
      column-gap: 2em;
      display: flex;
      justify-content: space-between;
      align-items: center;
      /* flex-wrap: wrap; */
      color: white;

    }

    .bio-content
    {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      max-width: 100%;
    }

    img.profile
    {
      justify-self: flex-start;
      height: 240px;
      width: auto;
      border-radius: 50%;
    }

    .bio-social
    {
      width: 100%;
      color: black;
      display: flex;
      align-content: center;
      justify-content: space-between;
      column-gap: 0.5em;
    }

    .bio-link
    {
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 5px;
    }

    .bio-social-icon
    {
      height: 40px;
    }

    .bio-text
    {
      font-size: medium;
    }

    #typewritter-text
    {
      max-width: 100%;
    }
  </style>

<script setup>
  import TypeWriter from 'typewriter-effect/dist/core';
  import { onMounted } from 'vue';
  onMounted( () =>
  {
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

    <div class='bio-content'>

      <div class='bio-social'>
        <a target='_blank' class='bio-link' href="https://github.com/Vikms95">
          <img class='bio-social-icon' src="../../public/resume-icon.png"
               alt="github icon">
          <span> Download resume </span>
        </a>

        <a target='_blank' class='bio-link' href="https://github.com/Vikms95">
          <img class='bio-social-icon' src="../../public/github-icon.png"
               alt="github icon">
          <span> Check me </span>
        </a>


        <a target='_blank' class='bio-link'
           href="https://www.linkedin.com/in/v%C3%ADctor-mart%C3%ADn-serra-b4003487/">
          <img class='bio-social-icon' src="../../public/linkedin-icon.png"
               alt="linkedin icon">
          <span> Hire me </span>
        </a>

        <a target='_blank' class='bio-link'
           href="https://www.linkedin.com/in/v%C3%ADctor-mart%C3%ADn-serra-b4003487/">
          <img class='bio-social-icon' src="../../public/email-icon.png"
               alt="email icon">
          <span> Contact me </span>
        </a>


      </div>
      <div class='bio-text'>
        <h1 class='typewriter-text' />
        <h2>
          I build impactful websites that work.
        </h2>

      </div>
    </div>

  </header>
</template>