<style scoped>
  .social {
    position: fixed;
    bottom: 40px;
    left: 40px;
    z-index: 2;
  }

  .social-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 2em;
    padding: 0;
    margin: 0;
  }

  .social::after {
    content: "";
    display: block;
    width: 3px;
    height: 140px;
    margin: 20px auto;
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

<script setup>
  import githubIcon from "../../public/social-icons/github-icon.png";
  import linkedinIcon from "../../public/social-icons/linkedin-icon.png";
  import mailIcon from "../../public/social-icons/resume-icon.png";
  import cvIcon from "../../public/social-icons/email-icon.png";

  import { ref } from 'vue';

  const links = ref( [
    {
      link: "https://github.com/Vikms95",
      iconSrc: githubIcon,
      alt: "github"
    },
    {
      link: "https://www.linkedin.com/in/v%C3%ADctor-mart%C3%ADn-serra-b4003487/",
      iconSrc: linkedinIcon,
      alt: "linkedin"
    },
    {
      link: "https://github.com/Vikms95",
      iconSrc: cvIcon,
      alt: "cv"
    },
    {
      link: "https://github.com/Vikms95",
      iconSrc: mailIcon,
      alt: "emails"
    }
  ] );

</script>

<template>
  <nav class='social'>
    <ul class='social-list'>

      <li v-for='(  item  ) in links'>
        <a target='_blank' class='link' :href=' item.link '>
          <img class='social-icon' :src=' item.iconSrc ' :alt=' item.alt '>
        </a>
      </li>

    </ul>
  </nav>

</template>
