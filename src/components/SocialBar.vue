<style scoped>
    .social {
      position: fixed;
      bottom: 40px;
      left: 40px;
      display: flex;
      flex-direction: column;
      row-gap: 2em;
      z-index: 2;
    }

    .social::after {
      content: "";
      display: block;
      width: 3px;
      height: 140px;
      margin: 0px auto;
      background-color: rgb(57, 72, 209);
      border-radius: 15px;
    }

    .link {
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 5px;
    }

    .social-icon {
      height: 30px;
    }
  </style>

<script setup> </script>

<template>
  <nav class='social'>

    <a target='_blank' class='link' href="https://github.com/Vikms95">
      <img class='social-icon' src="../../public/github-icon.png"
           alt="github icon">
      <!-- <span> Check me </span> -->
    </a>

    <a target='_blank' class='link'
       href="https://www.linkedin.com/in/v%C3%ADctor-mart%C3%ADn-serra-b4003487/">
      <img class='social-icon' src="../../public/linkedin-icon.png"
           alt="linkedin icon">
      <!-- <span> Hire me </span> -->
    </a>

    <a target='_blank' class='link' href="https://github.com/Vikms95">
      <img class='social-icon' src="../../public/resume-icon.png"
           alt="github icon">
      <!-- <span> Download resume </span> -->
    </a>

    <a target='_blank' class='link'
       href="https://www.linkedin.com/in/v%C3%ADctor-mart%C3%ADn-serra-b4003487/">
      <img class='social-icon' src="../../public/email-icon.png"
           alt="email icon">
      <!-- <span> Contact me </span> -->
    </a>
  </nav>

</template>
