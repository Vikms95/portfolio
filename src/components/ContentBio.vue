<style>
  .bio {
    column-gap: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    /* flex-wrap: wrap; */
    color: white;
    
  }

  .bio-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  img.profile {
    height: 240px;
    width: auto;
    border-radius: 50%;
  }

  .bio-social {
    width:100%;
    color: black;
    display: flex;
    align-content: center;
    justify-content: space-between;
    column-gap: 0.5em;
  }

  .bio-link {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 5px;
  }

  .bio-social-icon {
    height: 40px;
  }

  .bio-text {
    font-size: medium;
  }

</style>

<template>
  <header class='bio'>
    <img 
      class='profile' 
      src="../assets/profile.jfif" 
      alt="vikms looking at the camera"
    >

    <div class='bio-content'>

      <div class='bio-social'>
        <a 
          target='_blank'
          class='bio-link' 
          href="https://github.com/Vikms95"
        >
          <img 
            class='bio-social-icon' 
            src="../../public/github-icon.png" 
            alt="github icon"
          >
          <span> View my code </span>
        </a>

        <a  
          target='_blank'
          class='bio-link' 
          href="https://www.linkedin.com/in/v%C3%ADctor-mart%C3%ADn-serra-b4003487/"
        >
          <img 
            class='bio-social-icon' 
            src="../../public/email-icon.png" 
            alt="email icon"
          >
          <span> Contact me </span>
        </a>

        <a
          target='_blank'  
          class='bio-link' 
          href="https://www.linkedin.com/in/v%C3%ADctor-mart%C3%ADn-serra-b4003487/"
        >
          <img 
            class='bio-social-icon' 
            src="../../public/linkedin-icon.png" 
            alt="linkedin icon"
          >
          <span> Hire me </span>
        </a>
      </div>
      <div class='bio-text'>
        <h1>
          Web developer. 
        </h1>

        <h2>
          I build impactful websites that work.
        </h2>
      </div>
    </div>

  </header>
</template>