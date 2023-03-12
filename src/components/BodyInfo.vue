<style scoped>
  .info-container {
    display: block;
    position: absolute;
    top: 50px;
    left: 1100px;
    background-color: rgba(0, 0, 0, 0.5);
    /* opacity: v-bind( opacity );
                                                                                                                                                    transition: opacity 0.5s, visibility 0.5s ease-in-out; */
    min-width: 20em;
    min-height: 35em;
    padding: 1.5em;
    border-radius: 5px;
  }

  .body-details {
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 2em;
    margin-bottom: 4em;
  }

  .name {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5em;
    font-size: 30px;
  }

  .detail {
    display: flex;
    flex-direction: column;
  }

  .title {
    font-weight: 900;
    font-size: 15px;
    text-decoration: underline;
  }

  .value {
    justify-self: flex-start;
    font-style: italic;
  }

  .body-facts {
    display: flex;
    flex-direction: column;
    text-align: start;
    row-gap: 2em;
  }

  .body-facts > li {
    list-style-type: circle;
  }
</style>

<script setup>
  import { getSelectedBodyName, getSelectedBodyDetails, getSelectedBodyFacts } from '../utils-3D';
  import { ref, computed, watch, defineProps, onMounted, onUnmounted, onUpdated } from 'vue';

  const props = defineProps( [ 'selectedBody', 'selectedBodyRef', 'updateBodyName' ] );

  // const name = getSelectedBodyName( selectedBody );
  const name = ref( getSelectedBodyName( props.selectedBody ) );
  const facts = getSelectedBodyFacts( props.selectedBody );
  const details = getSelectedBodyDetails( props.selectedBody );

  const fn = ( props ) => {
    name.value = props.updateBodyName( props );
  };

  watch( props, () => fn( props ) );

</script>

<template>
  <aside class='info-container'>
    <h1 class='name'>{{ name }}</h1>
    <article class='body-details'>
      <div class='detail' v-for='                                                                                                                     detail                                                                                                                      in details'>
        <div class='title'>
          {{ detail.title }}
        </div>
        <div class='value'>
          {{ detail.value }}
        </div>
      </div>
    </article>
    <ul class='body-facts'>
      <li v-for='                                                                                                   fact                                                                                                    in facts'>
        {{ fact }}
      </li>
    </ul>
  </aside>
</template>