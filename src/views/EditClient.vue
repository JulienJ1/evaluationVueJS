<template>
  <b-container id="app">
    <b-row>
      <b-col>
        <h3><i class="fas fa-angle-down text-muted mr-2"/>Ajouter un client </h3>
        <hr/>
      </b-col>
    </b-row>

    <b-card class="shadow p-3">
      <h3 class="mb-5">Contact</h3>
      <b-row>
        <b-col lg="4">

          <b-form-group
              id="fieldset-clientprenom"
              label="Prénom"
              label-cols-lg="4"
              content-cols-lg="8"
              label-for="clientprenom"
          >
            <b-form-input id="clientprenom" v-model="form.firstname"/>
          </b-form-group>

          <b-form-group
              id="fieldset-clientfonction"
              label="Fonction"
              label-cols-lg="4"
              content-cols-lg="8"
              label-for="clientfonction"
          >
            <b-form-input id="clientfonction" v-model="form.fonction"/>
          </b-form-group>
        </b-col>
        <b-col lg="4">
          <b-form-group
              id="fieldset-clientnom"
              label="Nom"
              label-cols-lg="4"
              content-cols-lg="8"
              label-for="clientnom"
          >
            <b-form-input id="clientnom" v-model="form.lastname"/>
          </b-form-group>

          <b-form-group
              id="fieldset-clientphone"
              label="Téléphone"
              label-cols-lg="4"
              content-cols-lg="8"
              label-for="clientphone"
          >
            <b-form-input id="clientphone" v-model="form.phone"/>
          </b-form-group>

        </b-col>
        <b-col lg="4">
          <b-form-group
              id="fieldset-createdAt"
              label="Date de création:"
              label-cols-lg="4"
              content-cols-lg="8"
              label-for="createdAt"
          >
            <b-form-datepicker
                disabled
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                id="createdAt"
                v-model="form.createdAt" />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col lg="8">
          <b-form-group
              id="fieldset-clientemail"
              label="Email"
              label-cols-lg="2"
              content-cols-lg="10"
              label-for="clientemail"
          >
            <b-form-input id="clientemail" v-model="form.email"/>
          </b-form-group>
        </b-col>

      </b-row>
      <b-row>
        <b-col lg="8">
          <b-form-group
              id="fieldset-cliententreprise"
              label="Entreprise"
              label-cols-lg="2"
              content-cols-lg="10"
              label-for="cliententreprise"
          >
            <b-form-input id="cliententreprise" v-model="form.entreprise"/>
          </b-form-group>
        </b-col>

      </b-row>

      <h3 class="my-5">Coordonnées</h3>

      <b-row>
        <b-col lg="8">
          <b-form-group
              id="fieldset-clientadresse1"
              label="Adresse 1"
              label-cols-lg="2"
              content-cols-lg="10"
              label-for="clientadresse1"
          >
            <b-form-input id="clientadresse1" v-model="form.address1"/>
          </b-form-group>
        </b-col>

      </b-row>
      <b-row>
        <b-col lg="8">
          <b-form-group
              id="fieldset-clientadresse2"
              label="Adresse 2"
              label-cols-lg="2"
              content-cols-lg="10"
              label-for="clientadresse2"
          >
            <b-form-input id="clientadresse2" v-model="form.address2"/>
          </b-form-group>
        </b-col>

      </b-row>

      <b-row>
        <b-col lg="4">
          <b-form-group
              id="fieldset-clientposte"
              label="Code Postal"
              label-cols-lg="4"
              content-cols-lg="8"
              label-for="clientposte"
          >
            <b-form-input id="clientposte" v-model="form.postalCode"/>
          </b-form-group>
        </b-col>
        <b-col lg="4">
          <b-form-group
              id="fieldset-clientcity"
              label="Ville"
              label-cols-lg="4"
              content-cols-lg="8"
              label-for="clientcity"
          >
            <b-form-input id="clientcity" v-model="form.city"/>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col lg="4">
          <b-form-group
              id="fieldset-clientcountry"
              label="Pays"
              label-cols-lg="4"
              content-cols-lg="8"
              label-for="clientcountry"
          >
            <b-form-input id="clientcountry" v-model="form.country"/>
          </b-form-group>
        </b-col>
      </b-row>

      <hr>

      <b-row>
        <b-col>
          <b-button variant="danger" @click="onDeleteClient()">{{ !this.id || this.id == 0 || this.id == -1 ? 'Annuler' : 'Supprimer' }}</b-button>
        </b-col>
        <b-col class="text-right">
          <b-button variant="primary" @click="onSaveClient()">Enregister</b-button>
        </b-col>
      </b-row>

    </b-card>

    <b-form-checkbox class="my-4" v-model="debug" name="debug" switch>Debug</b-form-checkbox>

    <pre v-if="debug && form.id" class="debug card border-primary bg-dark text-light p-4">
      Form: {{ form }}
      Client (du store): {{ client }}
      </pre>

  </b-container>
</template>

<script>

import {mapActions, mapState} from 'vuex';

const newClient = {
  createdAt: new Date(),
  firstname: '',
  lastname: '',
  fonction: '',
  phone: '',
  email: '',
  entreprise: '',
  address1: '',
  address2: '',
  postalCode: '',
  city: '',
  country: '',
  text: '',
}

export default {
  name: "EditClient",
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      debug: true,
      form: {}
    }
  },
  computed: {
    ...mapState({
      client: state => state.client.client
    })
  },
  methods: {
    ...mapActions('client', ['getClient', 'saveClient', 'deleteClient']),
    initData() {
      this.form.createdAt = new Date(Date.now());
    },

    onDeleteClient() {
      this.deleteClient(this.form._id)
      this.$router.push({ name: 'clients' })
    },

    onSaveClient() {
      this.form.text = `${this.form.firstname} ${this.form.lastname}`
      this.saveClient(this.form).then(() => this.$router.push({name: 'clients'}))
    }
  },
  created() {
    //se déclenche à l'instantiation du composant
    //en fait dès qu'on arrive sur la route editclient
    if(!this.id || this.id == 0 || this.id == -1) {
      this.form = { ...newClient }
    } else {
      this.getClient(this.id).then(()=>{
        this.form = this.client
      })
    }
  }
}
</script>

<style scoped>

</style>
