<script setup>

  import ThreeCanvas from './components/ThreeCanvas.vue';
  import PortfolioContent from './components/PortfolioContent.vue';
  import SocialBar from './components/SocialBar.vue';
  import PortfolioLogo from './components/PortfolioLogo.vue';
  import { ref } from 'vue';

  const content = ref( { isEnabled: true, buttonText: 'Start space tour' } );
  const experience = ref( { isEnabled: true, buttonText: 'Disable experience' } );

  const toggleContent = () => {
    content.value.isEnabled = !content.value.isEnabled;

    ( content.value.isEnabled )
      ? content.value.buttonText = 'Star space tour'
      : content.value.buttonText = 'Return to portfolio';
  };

  const toggleExperience = () => {
    experience.value.isEnabled = !experience.value.isEnabled;

    ( experience.value.isEnabled )
      ? experience.value.buttonText = 'Disable experience'
      : experience.value.buttonText = 'Enable experience';
  }

</script>

<template >

  <SocialBar />

  <ThreeCanvas v-if=' experience.isEnabled '
    id='scene' 
  />

  <template v-if=' content.isEnabled '>
    <PortfolioLogo  />
    <PortfolioContent  
      :toggleContent=' toggleContent '
      :toggleExperience=' toggleExperience '
      :contentButtonText=' content.buttonText '
      :experienceButtonText=' experience.buttonText '
    />
  </template>

</template>
