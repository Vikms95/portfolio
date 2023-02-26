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
  };

  console.log( 'reload' );

</script>

<template >

  <PortfolioLogo 
    :content=' content '
    :toggle=' toggleContent '
  />

  <SocialBar />

  <ThreeCanvas v-if=' experience.isEnabled '
    :content=' content '
  />

  <PortfolioContent  v-if=' content.isEnabled '
    :experience=' experience '
    :toggleContent=' toggleContent '
    :toggleExperience=' toggleExperience '
    :contentButtonText=' content.buttonText '
    :experienceButtonText=' experience.buttonText '
  />

</template>
